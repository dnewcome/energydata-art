# Open Data Sources: Energy, Climate & Tech Impact
## For Art Visualization Projects

> **Verification note:** URLs were confirmed active as of March 2026 via live web search. API
> endpoint paths (especially versioned paths like `/v2/`) should be re-verified before use, as
> agencies occasionally update routing without redirect. Free vs. paywalled status is noted where
> known — always check terms of service before publishing derived works.

---

## Table of Contents

1. [U.S. Government — Energy Data](#1-us-government--energy-data)
2. [U.S. Government — Climate & Environment](#2-us-government--climate--environment)
3. [International Organizations](#3-international-organizations)
4. [Real-Time Grid & Carbon Intensity](#4-real-time-grid--carbon-intensity)
5. [Climate Science & Temperature Records](#5-climate-science--temperature-records)
6. [Carbon Markets & Offsets](#6-carbon-markets--offsets)
7. [AI & Data Center Energy Consumption](#7-ai--data-center-energy-consumption)
8. [Aggregated & Community Datasets](#8-aggregated--community-datasets)
9. [SpaceX Public Data](#9-spacex-public-data)
10. [Topic Cross-Reference Index](#10-topic-cross-reference-index)

---

## 1. U.S. Government — Energy Data

### EIA (U.S. Energy Information Administration)

**Primary portal:** https://www.eia.gov/opendata/
**API browser/explorer:** https://www.eia.gov/opendata/browser/
**Technical docs:** https://www.eia.gov/opendata/documentation.php
**Developer page:** https://www.eia.gov/developer/
**Access:** Free, requires a free API key (register at the portal)
**Format:** JSON, CSV, XLSX
**Update frequency:** Varies by dataset — near-real-time (hourly) through annual
**License:** Public domain (U.S. government work)

EIA's API v2 is the single most comprehensive source for U.S. energy data. All requests use
the `/v2/` path prefix. Key data categories available through the API:

| Category | What it covers |
|---|---|
| **Electricity** | Generation by source, consumption, retail sales, prices, capacity |
| **Hourly Grid Monitor** | Near-real-time hourly demand, generation by fuel type, interchange — 65 balancing authorities in the Lower 48 |
| **CO2 Emissions** | U.S. energy-related CO2 by fuel, sector, state |
| **Petroleum** | Supply, production, imports, prices |
| **Natural Gas** | Production, storage, prices |
| **Nuclear Outages** | Planned/unplanned outages |
| **Coal** | Production, consumption, prices |
| **Renewables** | Capacity and generation for solar, wind, hydro, geothermal |
| **State Energy Data System (SEDS)** | All energy by state going back decades |
| **Short-Term Energy Outlook (STEO)** | Monthly forecasts 12–18 months out |
| **Annual Energy Outlook (AEO)** | Long-term projections to 2050 |
| **International** | Energy data for 200+ countries |

**EIA Hourly Electric Grid Monitor** (real-time dashboard + API):
https://www.eia.gov/electricity/gridmonitor/
Data is available ~1 hour after the hour for demand; 1–2 day lag for generation by source.
This is one of the best free real-time feeds for U.S. grid visualization.

**Bulk downloads** (no API key needed):
https://www.eia.gov/opendata/ → "Bulk Download Facility"
Pre-packaged ZIP files of entire categories, updated regularly.

---

### NREL (National Renewable Energy Laboratory)

**Developer portal:** https://developer.nrel.gov/ (redirecting to https://developer.nlr.gov/ by April 2026)
**Access:** Free, requires a free API key
**License:** Varies by dataset; most are open

> Note: As of 2025, NREL rebranded to "National Laboratory of the Rockies" (NLR). Update any
> `developer.nrel.gov` references to `developer.nlr.gov` by April 30, 2026.

Key APIs:

| API | What it covers | Endpoint |
|---|---|---|
| **PVWatts v8** | Photovoltaic energy production estimates for any U.S. location | `/api/pvwatts/v8` |
| **Solar Resource Data** | Average DNI, GHI, tilt-at-latitude for U.S. locations | `/api/solar/solar_resource/v1` |
| **Wind Toolkit** | Wind resource potential, speed/direction at height | See developer portal |
| **Utility Rate API** | Retail electricity rate structures for ~3,500 U.S. utilities | `/api/utility_rates/v3` |
| **NSRDB** (National Solar Radiation Database) | 30+ years of hourly solar radiation, full download | https://nsrdb.nrel.gov/ |

**Global Solar Atlas (ESMAP / World Bank):**
https://globalsolaratlas.info/
High-resolution global solar resource maps (GeoTIFF downloads) covering GHI, DNI, PVOUT.
Built on satellite data from Solargis. Downloadable GeoTIFF layers for any country or region —
excellent for geospatial art visualizations. Free.

**Global Wind Atlas (DTU / World Bank):**
https://globalwindatlas.info/
Global wind resource mapping at multiple hub heights. GeoTIFF and shapefile downloads, plus
a REST API for querying wind speed and power density at any coordinate. Free.

**Open Energy Data Initiative (OEDI):**
https://data.openei.org/
A DOE-funded data lake hosted on AWS. Contains hundreds of datasets on buildings, grid
infrastructure, geospatial solar and wind resources, EV charging, and more. Downloads and
S3 bucket access.

**OpenEI (Open Energy Information):**
https://openei.org/
Community wiki + structured dataset repository. SPARQL query interface, JSON/CSV exports.
Covers geothermal, solar, wind, biomass, hydrogen, smart grid.

**Geothermal Data Repository (GDR):**
https://gdr.openei.org/
National collection of geothermal data including well logs, heat flow, temperature gradients,
seismic data. Bulk download.

---

### USGS (U.S. Geological Survey)

**Energy resources data:** https://www.usgs.gov/programs/energy-resources-program/energy-resources-data
**Geothermal resources science center:** https://www.usgs.gov/centers/gmeg/data
**Access:** Free, no API key required for most datasets
**Format:** Shapefiles, CSV, NetCDF, GeoTIFF

USGS focuses on the resource potential side: where are the geothermal, oil, gas, coal, and
critical mineral resources, and how large are they?

| Dataset | Notes |
|---|---|
| **Enhanced Geothermal Systems (EGS) Assessment (2025)** | New provisional assessment of the Great Basin; estimates 135 GWe potential |
| **National Geothermal Data System** | Well data, heat flow, seismicity from university and state surveys |
| **Mineral Resources Data System (MRDS)** | Critical minerals needed for batteries and clean energy hardware |
| **Earthquake Hazards** | Relevant for siting geothermal and CCS projects |

USGS ScienceBase (data catalog): https://www.sciencebase.gov/catalog/

---

### EPA (U.S. Environmental Protection Agency)

**Envirofacts API:** https://www.epa.gov/enviro/envirofacts-data-service-api
**GHG RESTful Data Service:** https://www.epa.gov/enviro/greenhouse-gas-restful-data-service
**eGRID database:** https://www.epa.gov/egrid
**GHG Emission Factors Hub:** https://www.epa.gov/climateleadership/ghg-emission-factors-hub
**Access:** Free, no API key required
**Format:** JSON, XML, CSV
**Update frequency:** Annual (eGRID, emission factors); continuous (Envirofacts)
**License:** Public domain

The **Envirofacts Data Service API** allows URL-based queries against EPA's environmental
databases (table → rows → filters in the URL itself). Greenhouse gas data is one of the
integrated databases. Useful for facility-level emissions data.

The **eGRID** (Emissions & Generation Resource Integrated Database) is the gold standard for
U.S. power plant-level environmental data: emissions, emission rates, generation, heat input,
fuel mix — for virtually every U.S. generator. Updated annually. Available as Excel download
and via the GHG RESTful API.

**Toxics Release Inventory (TRI):** https://www.epa.gov/toxics-release-inventory-tri-program/tri-data-and-tools
Facility-level industrial emissions data. Downloadable CSV + API.

---

### FERC (Federal Energy Regulatory Commission)

**Open data:** https://www.ferc.gov/open-data-library
**Access:** Free
**Format:** CSV, shapefile

Electric market data, transmission constraints, interconnection queues. Useful for regulatory
and infrastructure data.

---

### DOE / IRS — Clean Energy Tax Credits & IRA

There is no single machine-readable API for IRA tax credit data. The primary resources are:

| Resource | URL | Notes |
|---|---|---|
| **cleanenergy.gov** | https://www.cleanenergy.gov | DOE interactive guide to IRA incentives |
| **IRS: Credits & Deductions under IRA** | https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022 | Official IRS credit descriptions |
| **DSIRE** (Database of State Incentives for Renewables & Efficiency) | https://www.dsireusa.org/ | Comprehensive database of federal + state incentives. Browsable and has a data feed. Maintained by NC Clean Energy Technology Center. |
| **Clean Air Task Force — IRA Investment Tracker** | https://www.catf.us/ | Quarterly analysis of IRA clean energy investment flows |
| **PUDL + DSIRE integration** | https://catalyst.coop/pudl/ | PUDL now integrates DSIRE clean energy standards data |

> Note: The One Big Beautiful Bill Act (enacted July 2025) repealed or narrowed several IRA
> clean energy tax credits. Any dataset on IRA incentives compiled before mid-2025 may be outdated.

---

## 2. U.S. Government — Climate & Environment

### NOAA (National Oceanic and Atmospheric Administration)

**Climate Data Online (CDO) portal:** https://www.ncei.noaa.gov/cdo-web/
**CDO API v2 base URL:** `https://www.ncei.noaa.gov/cdo-web/api/v2/`
**API token request:** https://www.ncdc.noaa.gov/cdo-web/token
**Access:** Free, requires a free token (email-based)
**Rate limit:** 5 requests/second, 10,000 requests/day
**Format:** JSON
**License:** Public domain

CDO API endpoints include: `datasets`, `datacategories`, `datatypes`, `locationcategories`,
`locations`, `stations`, `data`. All responses are JSON with paging metadata.

Key NOAA datasets:

| Dataset | Coverage | Notes |
|---|---|---|
| **Global Historical Climatology Network (GHCN)** | Daily/monthly summaries, 100,000+ stations worldwide | Temperature, precipitation, snow depth |
| **Global Surface Summary of Day (GSOD)** | Daily summaries for ~29,000 stations | Global coverage, NOAA-curated |
| **Global Hourly (ISD)** | Hourly observations, 20,000+ stations | Integrated Surface Dataset |
| **Climate Normals** | 30-year averages (1991–2020) | Baselines for anomaly detection |
| **Sea Surface Temperature (OISST)** | Daily, 0.25° grid, global | Useful for ocean warming visualization |
| **ENSO / El Niño indices** | Monthly | Key climate cycle data |

**NOAA CoastWatch / OceanWatch** (satellite data):
https://coastwatch.noaa.gov/
Sea surface temperature, chlorophyll, ocean color — all with OPeNDAP and ERDDAP APIs.

**NOAA Physical Sciences Laboratory:**
https://psl.noaa.gov/data/
Long climate time series, reanalyses (20CRv3, ERA5 mirror), teleconnection indices. Data
server at https://downloads.psl.noaa.gov/

**NOAA Global Monitoring Laboratory** (greenhouse gases):
https://gml.noaa.gov/
CO2 (Mauna Loa and global), methane, nitrous oxide, CFCs — continuous measurements.
Direct FTP + web download. The Mauna Loa CO2 record is one of the most iconic climate datasets.

---

### NASA Earthdata & POWER

**NASA Earthdata portal:** https://www.earthdata.nasa.gov/
**NASA Open Data Portal:** https://data.nasa.gov/
**General NASA APIs:** https://api.nasa.gov/
**Access:** Free, requires free Earthdata login account
**Format:** NetCDF, HDF5, GeoTIFF, JSON (varies by dataset)
**License:** Open (NASA Open Data Policy)

**NASA POWER (Prediction of Worldwide Energy Resources):**
https://power.larc.nasa.gov/
Data Access Viewer: https://power.larc.nasa.gov/data-access-viewer/
AWS Open Data Registry: https://registry.opendata.aws/nasa-power/

POWER is specifically designed for renewable energy resource assessment. It delivers
NASA-derived satellite meteorology and solar irradiance data through a RESTful API —
380+ parameters, 4 temporal levels (hourly, daily, monthly, climatology), global coverage
from 1981 to near-present. No authentication required for API use.

Key NASA climate/energy datasets:

| Dataset | What | Access |
|---|---|---|
| **MODIS** | Land surface temperature, vegetation, albedo | Earthdata API |
| **GLDAS** | Global land data assimilation: soil moisture, evapotranspiration | Earthdata |
| **OCO-2/OCO-3** | Atmospheric CO2 column concentrations from orbit | Earthdata |
| **GRACE-FO** | Groundwater and ice sheet mass changes | Earthdata |
| **Landsat (Collection 2)** | 50+ year land surface record | Earthdata, also AWS |
| **SMAP** | Soil moisture, freeze/thaw | Earthdata |
| **GISS Surface Temperature (GISTEMP)** | Global temperature anomalies since 1880 | https://data.giss.nasa.gov/gistemp/ |

**NASA GISTEMP** (standalone, no login needed):
https://data.giss.nasa.gov/gistemp/
Direct CSV download of global temperature anomaly records. Updated monthly.

---

## 3. International Organizations

### World Bank

**Open Data main portal:** https://data.worldbank.org/
**Indicators API base:** `https://api.worldbank.org/v2/`
**Data Catalog:** https://datacatalog.worldbank.org/
**Climate Change Knowledge Portal:** https://climateknowledgeportal.worldbank.org/
**Access:** Fully free, no API key required
**Format:** JSON, XML, CSV, Excel
**Update frequency:** Annual (WDI); quarterly for some indicators
**License:** CC BY 4.0

The Indicators API has a standard structure: `https://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json`

Key energy and climate indicator codes for the API:

| Indicator Code | Description |
|---|---|
| `EG.USE.PCAP.KG.OE` | Energy use per capita (kg of oil equivalent) |
| `EG.ELC.ACCS.ZS` | Access to electricity (% of population) |
| `EG.FEC.RNEW.ZS` | Renewable energy share of total final energy |
| `EN.ATM.CO2E.PC` | CO2 emissions (metric tons per capita) |
| `EN.ATM.CO2E.KT` | CO2 emissions total (kt) |
| `EG.ELC.FOSL.ZS` | Fossil fuel electricity production (% of total) |
| `EG.ELC.RNEW.ZS` | Renewable electricity output (% of total) |
| `EN.ATM.METH.KT.CE` | Methane emissions (kt of CO2 equivalent) |
| `EN.ATM.NOXE.KT.CE` | Nitrous oxide emissions |

**Climate Change Knowledge Portal** also has a download API for observed and projected
climate data (temperature, precipitation) at country and grid scale.

---

### IRENA (International Renewable Energy Agency)

**Data portal:** https://www.irena.org/Data
**IRENASTAT online query tool:** https://pxweb.irena.org/pxweb/en/IRENASTAT/
**Data downloads:** https://www.irena.org/Data/Downloads/IRENASTAT
**Tools:** https://www.irena.org/Data/Downloads/Tools
**Access:** Free for bulk downloads; online query tool is free
**Format:** Excel/CSV, PxWeb API
**Update frequency:** Annual (capacity stats, March; full stats, July)
**License:** IRENA terms (free for non-commercial use with attribution)

IRENA is the definitive global source for renewable energy capacity and generation statistics.
Coverage: 200+ countries/areas, electricity statistics from 2000 onwards, detailed by
technology and sub-technology.

The PxWeb interface has a REST API (standard PxWeb JSON-stat and JSON-PX formats). Example:
`https://pxweb.irena.org/api/v1/en/IRENASTAT/Power%20Capacity%20and%20Generation/{table}.px`

Key datasets:
- Renewable capacity statistics (annual, March release)
- Renewable energy generation statistics
- Off-grid renewable energy statistics
- Renewable energy balances (by country, fuel type)
- IRENA's Renewable Cost Database (LCOE trends)

---

### IEA (International Energy Agency)

**Data & statistics:** https://www.iea.org/data-and-statistics/data-sets
**Data explorers (free, web):** https://www.iea.org/data-and-statistics/data-explorers
**Access:** Mixed — significant paywalls
**Free tier:** Limited; see below

**What is free from IEA:**

| Resource | URL | Notes |
|---|---|---|
| **World Energy Outlook 2025 Free Dataset** | https://www.iea.org/data-and-statistics/data-product/world-energy-outlook-2025-free-dataset | World aggregates + key countries, 3 scenarios to 2050. CC BY-NC-SA 4.0 |
| **SDG7 Database** | https://www.iea.org/data-and-statistics/data-product/sdg7-database | Annual access/clean cooking time series |
| **Real-Time Electricity Tracker** | https://www.iea.org/data-and-statistics/data-tools/real-time-electricity-tracker | Web tool only, no free bulk download |
| **Gas Trade Flows** | Via account (free) | Monthly country-to-country gas trade, European countries |
| **Energy and AI report (2025)** | https://www.iea.org/reports/energy-and-ai | Best public reference for AI energy demand estimates; PDF free, underlying data paywalled |

**What is paywalled:** Full oil, coal, gas, and electricity statistics for all countries
(subscriptions start at ~€1,450/year for a single data product). Research institutions
can apply for discounted access.

---

### UN / UNSD

**UN Stats SDG Data Hub:** https://unstats-undesa.opendata.arcgis.com/
**UN Data portal:** https://data.un.org/
**UNSD Energy Statistics:** https://unstats.un.org/unsd/energystats/
**UN Comtrade (trade data):** https://comtradeplus.un.org/
**Access:** Free; some datasets require registration
**Format:** CSV, Excel, API (varies)

The UN Energy Statistics Database covers energy supply, transformation, and consumption for
all countries, updated annually. Aligns with IRENA and IEA terminology.

**Tracking SDG7 data downloads (ESMAP):**
https://trackingsdg7.esmap.org/downloads
Downloadable datasets on electrification rates, clean cooking access, renewable energy
share, and energy efficiency — compiled jointly by IEA, IRENA, UNSD, World Bank, WHO.

---

### Copernicus Climate Data Store (ECMWF / EU)

**Portal:** https://cds.climate.copernicus.eu/
**API setup:** https://cds.climate.copernicus.eu/how-to-api
**Python client (cdsapi):** https://github.com/ecmwf/cdsapi
**Access:** Free, requires free account + personal access token
**Format:** NetCDF, GRIB
**License:** Free for any use with attribution

The Copernicus Climate Data Store is operated by ECMWF on behalf of the EU. It is one of the
most powerful open climate data resources in the world. The Python `cdsapi` library provides
programmatic access.

Key datasets:

| Dataset | Notes |
|---|---|
| **ERA5** | ECMWF reanalysis, hourly global data from 1940 to present. Temperature, wind, solar radiation, precipitation, 137 pressure levels. 0.25° resolution. This is the benchmark global atmospheric reanalysis. |
| **ERA5-Land** | Higher-resolution (0.1°) land surface version |
| **CMIP6 climate projections** | Multi-model ensemble projections to 2100 under various SSP scenarios |
| **Copernicus Emergency Management Service** | Disaster/wildfire mapping |
| **Satellite-derived solar radiation** | SARAH-3 dataset, European and African coverage |
| **Seasonal forecasts** | ECMWF SEAS5, 6-month range |

---

### ENTSO-E Transparency Platform (Europe)

**Portal:** https://transparency.entsoe.eu/
**RESTful API docs (Postman):** https://documenter.getpostman.com/view/7009892/2s93JtP3F6
**Python client:** https://github.com/EnergieID/entsoe-py
**Access:** Free, requires free registration + security token
**Format:** XML (API), CSV (bulk download)
**Update frequency:** Near-real-time to hourly

ENTSO-E covers the interconnected European grid — 35 countries, all transmission system
operators. The most comprehensive open source of European electricity operational data.

Data categories: load, generation by unit and fuel type, transmission flows, balancing,
capacity, congestion management, outages.

---

## 4. Real-Time Grid & Carbon Intensity

### Electricity Maps (electricitymaps.com)

**Portal:** https://www.electricitymaps.com/
**API docs:** https://app.electricitymaps.com/developer-hub/api/getting-started
**Open-source parsers (GitHub):** https://github.com/electricitymaps/electricitymaps-contrib
**Coverage:** 190+ countries
**Access:** API requires a paid plan for most endpoints; free tier is limited. The underlying
data parsers are fully open-source (MIT license).
**Update frequency:** Real-time (5-minute updates) + 72-hour forecast

Electricity Maps provides carbon intensity (gCO2eq/kWh) and electricity mix data for power
grids worldwide, in real-time, historically, and forecasted. The methodology uses flow-tracing
to account for electricity imports/exports. Used by Google Cloud for carbon reporting.

---

### WattTime

**Portal:** https://watttime.org/
**API docs:** https://docs.watttime.org
**Access:** Free tier gives access to index (percentile) values; PRO tier needed for MOER
(Marginal Operating Emissions Rate in lbs CO2/MWh)
**Coverage:** U.S. primarily, with global expansion
**Update frequency:** Real-time (5-minute updates)

WattTime provides **marginal emissions** data — the emissions rate of the generator responding
to the *next unit of load* on the grid (not average). This is the correct metric for
evaluating the real-world impact of smart devices, EV charging timing, etc.

**Grid Emissions Data Platform** (free bulk historical):
A joint WattTime + REsurety initiative providing free global marginal emissions data.
Hourly data, prior 3 years, CSV download. Available to qualified users.

---

### gridstatus.io

**Open-source library:** https://github.com/gridstatus/gridstatus
**Docs:** https://opensource.gridstatus.io/
**Hosted API:** https://www.gridstatus.io/products/api
**Access:** Open-source library is free (MIT); hosted API has a paid tier
**Format:** Python objects → Pandas DataFrames

The `gridstatus` Python library provides a unified, standardized API to real-time and
historical data from all major U.S. and Canadian ISOs:

| ISO | Region |
|---|---|
| CAISO | California |
| ERCOT | Texas |
| PJM | Mid-Atlantic / Midwest |
| MISO | Upper Midwest / South |
| ISONE | New England |
| NYISO | New York |
| SPP | Great Plains |
| IESO | Ontario, Canada |
| AESO | Alberta, Canada |

Data includes: fuel mix, load, load forecast, LMPs (locational marginal prices), ancillary
services, storage data.

---

### PJM Data Miner 2

**Portal:** https://dataminer2.pjm.com/
**API portal:** https://apiportal.pjm.com/
**Access:** Free (non-member public access); full API access requires pjm.com account
**Format:** JSON, CSV

Direct source for PJM real-time and historical data: marginal emissions (5-minute updates),
dispatch rates, interface flows, reserve margins. Useful for the largest U.S. grid region.

---

## 5. Climate Science & Temperature Records

### NOAA GML — Greenhouse Gas Records

**Portal:** https://gml.noaa.gov/
**CO2 (Mauna Loa):** https://gml.noaa.gov/ccgg/trends/data.html
**Global CO2 mean:** https://gml.noaa.gov/ccgg/trends/gl_data.html
**CH4, N2O, SF6:** https://gml.noaa.gov/hats/
**Access:** Free, direct download, no account needed
**Format:** Plain text / CSV
**Update frequency:** Weekly to monthly

The Mauna Loa CO2 record (Keeling Curve) is the longest continuous atmospheric CO2 record
in the world (1958–present). This is an iconic dataset for any climate visualization.

---

### NASA GISTEMP

**Portal:** https://data.giss.nasa.gov/gistemp/
**Access:** Free, no account needed
**Format:** CSV
**Update frequency:** Monthly

Global surface temperature anomaly records from 1880. Separate land-only and land+ocean
series. Includes station data and gridded files.

---

### Berkeley Earth

**Data portal:** https://berkeleyearth.org/data/
**Access:** Free; CC BY-NC 4.0 (non-commercial)
**Format:** NetCDF, plain text

Independent temperature analysis covering land and ocean from 1750 (land) or 1850 (combined).
Provides gridded (15,984 equal-area cells) and time-series versions.

---

### HadCRUT5 (UK Met Office / Univ. of East Anglia)

**Portal:** https://www.metoffice.gov.uk/hadobs/hadcrut5/
**CRU temperature data:** https://crudata.uea.ac.uk/cru/data/temperature/
**Access:** Free
**Format:** NetCDF, CSV
**Update frequency:** Monthly/annual

HadCRUT5 is the combined CRUTEM5 (land) + HadSST4 (ocean) global temperature record.
Widely used by IPCC. Updated at 1–2 month intervals.

---

### Global Carbon Project

**Main portal:** https://globalcarbonproject.org/
**GCB 2025 data hub:** https://globalcarbonbudget.org/datahub/the-latest-gcb-data-2025/
**ICOS data archive (with DOI):** https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2025
**Zenodo archive:** https://doi.org/10.18160/GCP-2025
**Access:** Free
**Format:** Excel, CSV
**Update frequency:** Annual (November release)

The Global Carbon Budget is the most authoritative annual accounting of global CO2 sources
and sinks: fossil fuel emissions by category (1750–present), land-use change emissions, ocean
sink, land sink, atmospheric growth rate. Separate national fossil CO2 dataset also available.

---

## 6. Carbon Markets & Offsets

### Climate TRACE

**Portal:** https://climatetrace.org/
**Data downloads:** https://climatetrace.org/data
**Beta API:** Available through the portal (registration)
**Access:** Fully free and public
**Format:** CSV (bulk), API (JSON)
**Update frequency:** Monthly releases (~2-month latency)

Climate TRACE uses satellites and AI to track GHG emissions from individual facilities
worldwide. Current database: 2.7M+ emissions sources, 744M+ underlying assets, annual
country-level data from 2015–2024, with monthly estimates. Coverage spans power,
transportation, manufacturing, agriculture, waste, and more.

The beta API supports: search by sector/owner/location, emissions queries, country-level
aggregations.

---

### Berkeley Carbon Trading Project — Voluntary Registry Offsets Database

**Portal:** https://gspp.berkeley.edu/research-and-impact/centers/cepp/projects/berkeley-carbon-trading-project/offsets-database
**Access:** Free download (Excel)
**Update frequency:** Annual (year-end release)

The most comprehensive open database of voluntary carbon market credits. Covers:
American Carbon Registry, Architecture for REDD+ Transactions (ART), Climate Action Reserve,
Gold Standard, and Verra (VCS). Contains 9,000+ projects and 2.1B+ issued credits.

---

### CarbonPlan — OffsetsDB

**Portal:** https://carbonplan.org/research/offsets-db-explainer
**Access:** Free, open-source
**Update frequency:** Daily

OffsetsDB is maintained by CarbonPlan and consolidates + standardizes data from the same five
major registries as the Berkeley database, but is updated daily. API available.

---

### Climate Action Data Trust (CAD Trust)

**Portal:** https://climateactiondata.org/
**Access:** Free (with account)
**Format:** API, data dashboard

Provides harmonized data on Gold Standard projects: 3,362 projects, 335M unit issuances.
Includes cross-registry linkages to detect double-counting.

---

### Verra Registry

**Portal:** https://registry.verra.org/
**Access:** Free browse; bulk data download (Excel)
**Format:** Excel/CSV

The largest voluntary carbon standard. Project-level data on VCS, CCB, SD VISta credits.
Public registry with issuance/retirement history.

---

### Gold Standard Registry

**Portal:** https://marketplace.goldstandard.org/
**Access:** Free browse; API via CAD Trust integration

---

## 7. AI & Data Center Energy Consumption

This is a rapidly evolving area with limited open datasets. There is no comprehensive global
database of data center energy consumption — few governments mandate disclosure.

### Best available open references:

| Source | URL | What it provides |
|---|---|---|
| **IEA — Energy and AI (2025)** | https://www.iea.org/reports/energy-and-ai | Best public synthesis; estimates AI power demand to 2030. PDF free. |
| **EPA eGRID** | https://www.epa.gov/egrid | U.S. data center operators file with EIA (Form EIA-860), which feeds into eGRID |
| **EIA-860 Annual Electric Generator Report** | https://www.eia.gov/electricity/data/eia860/ | Power plant-level data including large on-site generators at data centers |
| **EIA-923 Power Plant Operations Report** | https://www.eia.gov/electricity/data/eia923/ | Monthly fuel consumption and generation by plant |
| **EPRI AI Energy Report (2024)** | https://www.epri.com/research/products/3002028905 | Electric Power Research Institute analysis of AI energy impacts |
| **Lawrence Berkeley National Lab Data Center Study** | https://www.energy.gov/eere/buildings/data-center-research | LBNL's quadrennial U.S. data center energy usage studies (reports, not live data) |
| **MLCommons / ML Energy Leaderboard** | https://ml.energy/leaderboard | Energy consumption benchmarks for ML model inference (open-source project) |
| **CodeCarbon** | https://codecarbon.io/ | Open-source Python library + dataset for measuring AI/ML carbon emissions; community-contributed data |

**Note on tech company sustainability reports:**
Google, Microsoft, Amazon, and Meta all publish annual sustainability reports with data center
energy and carbon figures. These are self-reported PDFs, not machine-readable data feeds.
However, they are the primary source for hyperscaler-specific numbers.

| Company | Report URL |
|---|---|
| Google | https://sustainability.google/reports/ |
| Microsoft | https://www.microsoft.com/en-us/sustainability/reports |
| Amazon | https://sustainability.aboutamazon.com/ |
| Meta | https://sustainability.fb.com/ |

---

## 8. Aggregated & Community Datasets

### Our World in Data (OWID)

**Energy data GitHub:** https://github.com/owid/energy-data
**CO2 + GHG data GitHub:** https://github.com/owid/co2-data
**Main site:** https://ourworldindata.org/
**Access:** Fully free, CC BY 4.0
**Format:** CSV, XLSX, JSON
**Update frequency:** Regular (annually or more often for some series)

OWID is the best single starting point for pre-cleaned, cross-country energy and climate data.
Their datasets aggregate from BP, EIA, IRENA, IEA, GCP, and other sources into consistent
long time series. The GitHub repos include full codebooks.

- **Energy dataset:** Primary energy, electricity mix, per-capita consumption, energy sources —
  for every country, from 1900+.
- **CO2 dataset:** Annual CO2 (production and consumption-based), per capita, cumulative,
  GHGs — every country, from 1750+.

---

### EMBER

**Data portal:** https://ember-energy.org/data/
**API:** https://ember-energy.org/data/api/
**Monthly electricity data:** https://ember-energy.org/data/
**Access:** Fully free, CC BY 4.0
**Format:** CSV, REST API (JSON)
**Update frequency:** Monthly (88 countries); annual (215 countries)

EMBER's electricity dataset is the only open, comprehensive global dataset for monthly
electricity generation. Coverage: 215 countries yearly, 88 countries monthly (93% of
global demand). Data categories: generation by source, demand, power sector CO2 emissions,
carbon intensity.

The REST API is the easiest way to pull updated data programmatically.

---

### PUDL (Public Utility Data Liberation Project)

**Portal:** https://catalyst.coop/pudl/
**GitHub:** https://github.com/catalyst-cooperative/pudl
**Docs:** https://catalystcoop-pudl.readthedocs.io/
**AWS Open Data:** https://registry.opendata.aws/catalyst-cooperative-pudl/
**Zenodo archive:** https://zenodo.org/records/17606427
**Access:** Fully free, open-source (MIT license)
**Format:** SQLite, Apache Parquet, CSV

PUDL takes raw U.S. government energy data (EIA-860, EIA-923, EIA-861, FERC Form 1, EPA CEMS,
EPA eGRID) and transforms it into clean, analysis-ready relational tables. If you want to
work with detailed U.S. power plant data, PUDL saves weeks of data cleaning.

Key integrated sources:
- EIA Forms 860/923 (plant characteristics and operations, monthly generation)
- FERC Form 1 (utility financial and operational data)
- EPA Continuous Emissions Monitoring System (CEMS) — hourly stack emissions from ~1,000 power plants
- EPA eGRID
- DSIRE (clean energy policy standards by state)

---

### Open Power System Data (OPSD)

**Portal:** https://open-power-system-data.org/
**Data platform:** https://data.open-power-system-data.org/
**Access:** Free, open-source (CC BY 4.0)
**Format:** CSV, JSON, SQLite, Excel

OPSD provides cleaned and structured European power system data in five packages:
conventional power plants, national generation capacity, renewable power plants, time series
(generation, load, prices), and weather data. All processing scripts are open-source on GitHub.

---

### Global Energy Monitor (GEM)

**Portal:** https://globalenergymonitor.org/
**Wiki:** https://gem.wiki/
**Access:** Free, CC BY 4.0
**Format:** Excel/CSV (bulk download per tracker)

GEM maintains unit-level global databases of power plants — both fossil fuel and renewable —
tracking planned, under-construction, and operating projects. Key trackers:

| Tracker | What it covers | Last updated |
|---|---|---|
| **Global Integrated Power Tracker** | All power types, unit-level: capacity, status, owner, fuel, geolocation | 2025 |
| **Global Coal Plant Tracker** | Every coal plant unit in the world, with status pipeline | Feb 2025 |
| **Global Solar Power Tracker** | Utility-scale solar ≥1 MW, projects ≥20 MW | Feb 2025 |
| **Global Wind Power Tracker** | Wind farms ≥10 MW | 2025 |
| **Global Gas Plant Tracker** | Gas power plants | 2025 |
| **Global Hydropower Tracker** | Hydropower projects | 2025 |

---

### Copernicus Atmosphere Monitoring Service (CAMS)

**Portal:** https://atmosphere.copernicus.eu/
**Data access (via CDS/ADS):** https://ads.atmosphere.copernicus.eu/
**Access:** Free, requires free account
**Format:** NetCDF, GRIB

CAMS provides global atmospheric composition data: GHG concentrations, aerosols, reactive
gases, UV radiation, fire radiative power. Near-real-time analysis + reanalysis back to 2003.
Particularly useful for wildfire smoke, methane plumes, and CO2 column visualizations.

---

### interconnection.fyi

**Portal:** https://www.interconnection.fyi/
**Access:** Free, public
**Format:** Web dashboard + CSV exports
**Update frequency:** Daily

Tracks all U.S. generator interconnection queue requests (all ISOs/RTOs). Useful for
visualizing the pipeline of new renewable energy projects seeking grid connection — a leading
indicator of the energy transition.

---

## 9. SpaceX Public Data

SpaceX does not publish structured open data feeds covering energy, climate, or environmental
impact. There is no official SpaceX API for energy or emissions data.

**What is publicly available:**

| Resource | URL | Notes |
|---|---|---|
| **Community SpaceX API** (unofficial) | https://github.com/r-spacex/SpaceX-API | Community-maintained REST API for launches, rockets, payloads, Starlink sats, roadster data. JSON. Not official SpaceX output. |
| **Starlink coverage map** | https://www.starlink.com/map | Visual coverage tool; no downloadable data feed. |
| **FCC Starlink filings** | https://fcc.gov | SpaceX files orbital and frequency data with the FCC as public record. Searchable via FCC IBFS. |
| **Launch emissions (third-party)** | See Aerospace Corporation, academic papers | SpaceX publishes no emissions data. Third-party estimates exist for kerosene and methane rocket exhaust; start with DOI searches on Google Scholar. |

For the **broader tech-and-space environmental impact** angle, the most useful open datasets
remain the EPA eGRID (for manufacturing/launch facility power), NOAA atmospheric composition
data (for stratospheric soot from launches), and Climate TRACE (industrial emissions).

---

## 10. Topic Cross-Reference Index

| Topic | Best sources |
|---|---|
| **Clean energy / renewables generation** | EIA API (electricity), IRENA, EMBER, Our World in Data |
| **Solar resource potential** | NASA POWER, NREL NSRDB, NREL Developer API |
| **Wind resource potential** | NREL Wind Toolkit, IRENA |
| **Energy demand** | EIA API (hourly grid monitor, SEDS), ENTSO-E, World Bank |
| **Real-time grid status** | EIA Grid Monitor, gridstatus.io, ENTSO-E, individual ISO portals |
| **AI / data center power consumption** | IEA Energy & AI report, EIA-860/923, EPA eGRID, CodeCarbon, ML Energy Leaderboard |
| **Government regulations / policy** | DSIRE, PUDL (DSIRE integration), FERC open data |
| **Tax credits / IRA incentives** | cleanenergy.gov, DSIRE, IRS website |
| **Carbon offsets / voluntary markets** | Climate TRACE, Berkeley Carbon Trading Project, CarbonPlan OffsetsDB, CAD Trust, Verra Registry |
| **Global warming / temperature** | NASA GISTEMP, HadCRUT5, Berkeley Earth, NOAA GML, Copernicus C3S |
| **Atmospheric CO2** | NOAA GML Mauna Loa, Global Carbon Project, NASA OCO-2/OCO-3 |
| **Carbon budgets / emissions accounting** | Global Carbon Project, Climate TRACE, EPA eGRID, Our World in Data CO2 dataset |
| **Climate projections** | Copernicus CDS (CMIP6), NASA Earthdata, World Bank CCKP |
| **Ocean / sea surface temperature** | NOAA CoastWatch, NASA Earthdata, Copernicus CDS (ERA5) |
| **Energy access / SDG7** | World Bank (EG.ELC.ACCS.ZS), ESMAP SDG7 downloads, IRENA |
| **Energy abundance / supply** | EIA API, IRENA, World Bank WDI, Our World in Data |
| **European grid data** | ENTSO-E, OPSD, Electricity Maps |
| **Satellite / remote sensing** | NASA Earthdata, Copernicus CDS, NOAA CoastWatch |
| **AGI/tech planetary impact** | IEA Energy & AI, company sustainability reports, EPA eGRID (for data center footprints), CodeCarbon |

---

---

### Geospatial / Map-Ready Format Notes

For art visualization work, the format of a dataset matters as much as its content. Here is
a quick reference for which sources offer map-ready geospatial data vs. pure time-series:

| Format | What it's good for | Sources that offer it |
|---|---|---|
| **GeoTIFF** | Raster/heatmap visualizations, global coverage grids | NASA POWER, Copernicus CDS (ERA5), Global Solar Atlas, Global Wind Atlas, NREL NSRDB, Berkeley Earth |
| **Shapefile / GeoJSON** | Vector maps: plant locations, country borders, grid lines | EPA eGRID, Global Energy Monitor (GEM), USGS, FERC |
| **NetCDF / HDF5** | Multi-dimensional data cubes (time × lat × lon) | Copernicus CDS, NASA Earthdata, NOAA PSL — needs xarray or similar to read |
| **CSV with lat/lon columns** | Point data: power plants, weather stations, assets | PUDL, GEM trackers, Climate TRACE, EIA-860 |
| **Time-series only (no geo)** | Charts, line graphs, flow diagrams | EMBER API, EIA API, World Bank Indicators, NOAA GML, GCP, IRENA |

---

*Compiled March 2026 using live web search verification.*
*IEA data access note: Most IEA detailed data requires paid subscription. Use EMBER, Our World in Data, EIA, IRENA, and World Bank as free alternatives for comparable coverage.*
