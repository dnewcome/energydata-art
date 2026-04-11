import marimo

__generated_with = "0.23.1"
app = marimo.App(width="medium")


@app.cell
def _():
    import sys
    import io
    import marimo as mo
    import polars as pl
    from pathlib import Path

    IN_WASM = sys.platform == "emscripten"
    return IN_WASM, io, mo, pl, Path


@app.cell
def _(IN_WASM, io, pl):
    # In WASM (Pyodide), fetch CSVs over HTTP from the same origin.
    # Locally, read directly from disk.
    DATA_LOCAL = "../data/raw"
    DATA_WEB = "data"  # relative to the exported HTML file

    def load_csv(filename):
        opts = dict(infer_schema_length=0, truncate_ragged_lines=True)
        if IN_WASM:
            import js
            from pyodide.http import open_url
            origin = js.window.location.origin
            url = f"{origin}/notebooks/energy/data/{filename}"
            return pl.read_csv(io.StringIO(open_url(url).read()), **opts)
        else:
            return pl.read_csv(f"{DATA_LOCAL}/{filename}", **opts)

    energy = load_csv("owid_energy.csv")
    co2 = load_csv("owid_co2.csv")
    power_plants = load_csv("global_power_plant_database.csv")

    f"energy: {energy.shape}, co2: {co2.shape}, power_plants: {power_plants.shape}"
    return energy, co2, power_plants, load_csv


@app.cell
def _(mo):
    mo.md("# Energy Data Exploration")
    return


@app.cell
def _(mo):
    mo.md("## OWID Energy — shape & columns")
    return


@app.cell
def _(energy, pl):
    energy_typed = (
        energy
        .with_columns([
            pl.col("year").cast(pl.Int32, strict=False),
            pl.col("population").cast(pl.Float64, strict=False),
        ])
        .filter(pl.col("iso_code").is_not_null() & (pl.col("iso_code").str.len_chars() == 3))
    )
    energy_typed.head(5)
    return (energy_typed,)


@app.cell
def _(mo):
    mo.md("## CO2 — top emitters (most recent year)")
    return


@app.cell
def _(co2, pl):
    co2_typed = (
        co2
        .with_columns([
            pl.col("year").cast(pl.Int32, strict=False),
            pl.col("co2").cast(pl.Float64, strict=False),
        ])
        .filter(pl.col("iso_code").is_not_null() & (pl.col("iso_code").str.len_chars() == 3))
    )

    latest_year = co2_typed.filter(pl.col("co2").is_not_null())["year"].max()

    top_emitters = (
        co2_typed
        .filter(pl.col("year") == latest_year)
        .select(["country", "iso_code", "year", "co2", "co2_per_capita"])
        .sort("co2", descending=True)
        .head(15)
    )
    top_emitters
    return co2_typed, top_emitters, latest_year


@app.cell
def _(mo):
    mo.md("## Power Plants — fuel type breakdown")
    return


@app.cell
def _(pl, power_plants):
    fuel_summary = (
        power_plants
        .with_columns(pl.col("capacity_mw").cast(pl.Float64, strict=False))
        .group_by("primary_fuel")
        .agg([
            pl.len().alias("count"),
            pl.col("capacity_mw").sum().alias("total_capacity_mw"),
        ])
        .sort("total_capacity_mw", descending=True)
    )
    fuel_summary
    return (fuel_summary,)


@app.cell
def _(mo):
    mo.md("## Interactive: country energy mix over time")
    return


@app.cell
def _(energy_typed, mo, pl):
    countries = (
        energy_typed
        .filter(pl.col("country").is_not_null())
        ["country"]
        .unique()
        .sort()
        .to_list()
    )

    country_picker = mo.ui.dropdown(
        options=countries,
        value="United States",
        label="Country",
    )
    country_picker
    return countries, country_picker


@app.cell
def _(country_picker, energy_typed, pl):
    mix_cols = [
        "year", "country",
        "coal_electricity", "gas_electricity", "oil_electricity",
        "nuclear_electricity", "solar_electricity", "wind_electricity",
        "hydro_electricity", "biofuel_electricity",
    ]

    country_mix = (
        energy_typed
        .filter(pl.col("country") == country_picker.value)
        .select([c for c in mix_cols if c in energy_typed.columns])
        .with_columns([
            pl.col(c).cast(pl.Float64, strict=False)
            for c in mix_cols[2:]
            if c in energy_typed.columns
        ])
        .sort("year")
    )
    country_mix
    return (country_mix,)


if __name__ == "__main__":
    app.run()
