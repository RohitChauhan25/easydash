import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { TargetCountries } from "../constants/data";

const MapChart = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const markers = [
    { name: "Germany", coordinates: [10.4515, 51.1657] },
    { name: "United Kingdom", coordinates: [-3.435973, 55.3781] },
    { name: "France", coordinates: [2.2137, 46.6034] },
    { name: "Italy", coordinates: [12.5674, 41.8719] },
    { name: "Spain", coordinates: [-3.7038, 40.4168] },
    { name: "Poland", coordinates: [19.1451, 51.9194] },
    { name: "Ukraine", coordinates: [31.1656, 48.3794] },
  ];

  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [0.0, -45.0, 0],
        center: [5, 10],
        scale: 850,
      }}
      style={{ backgroundColor: "transparent" }}
    >
      <defs>
        <linearGradient id="markerGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9D9D9" />
          <stop offset="50%" stopColor="#88CDFF" />
          <stop offset="100%" stopColor="rgba(2, 239, 255, 0.764706)" />
        </linearGradient>
      </defs>
      <Geographies
        geography="/features.json" // Check if this path is correct
        fill="#D6D6DA"
        stroke="none"
        strokeWidth={1}
      >
        {({ geographies }: any) => {
          // Check if geographies are loading correctly
          if (!geographies) {
            console.log("Geographies not loaded");
            return null;
          }

          return geographies
            ?.filter(
              (geo: any) =>
                TargetCountries.includes(geo.properties.NAME) ||
                TargetCountries.includes(geo.properties.name)
            ) // Filter by country name
            .map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                // onClick={() => setSelectedCountry(geo.rsmKey)}
                style={{
                  default: { fill: "#51555C", outline: "none" },
                  hover: {
                    fill: "#51555C",
                    outline: "#3d45db",
                    stroke: "#3d45db",
                    strokeWidth: 2.5,
                  },
                  pressed: { fill: "#51555C", outline: "none" },
                }}
                stroke={selectedCountry === geo.rsmKey ? "#FF5733" : "#2a2b2b"}
                strokeWidth={selectedCountry === geo.rsmKey ? 2 : 1}
              />
            ));
        }}
      </Geographies>
      {markers?.map(({ name, coordinates }: any) => (
        <Marker key={name} coordinates={coordinates} id={name}>
          <circle
            r={8}
            fill="url(#markerGradient)"
            filter="url(#blurFilter)"
            strokeWidth={6}
          />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
