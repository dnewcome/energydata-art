export default {
  title: "energydata-art",
  root: "src",
  theme: "dark",
  pages: [
    { name: "Overview", path: "/" },
    {
      name: "Notebooks",
      pages: [
        { name: "Keeling Curve", path: "/keeling-curve" },
        { name: "Global Energy Mix", path: "/energy-mix" },
        { name: "Power Plants", path: "/power-plants" },
        { name: "AI Energy & Datacenters", path: "/ai-energy" },
        { name: "Industrial AI & Reshoring", path: "/industrial-ai" },
      ],
    },
  ],
};
