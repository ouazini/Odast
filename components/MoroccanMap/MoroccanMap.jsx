"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_moroccoLow from "@amcharts/amcharts5-geodata/moroccoLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from "./box.module.css";

const regionDetails = {
  "Tanger-Tétouan-Al Hoceïma": {
    title: "Tanger-Tétouan-Al Hoceïma",
    description: "Région située au nord du Maroc, connue pour ses villes côtières, son port de Tanger et la chaîne du Rif.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "L'Oriental": {
    title: "L'Oriental",
    description: "Région frontalière avec l’Algérie, marquée par un climat semi-aride et une richesse culturelle berbère.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Fès- Meknès": {
    title: "Fès- Meknès",
    description: "Région historique du centre-nord du Maroc, connue pour son patrimoine culturel et ses médinas ancestrales.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Rabat-Salé-Kénitra": {
    title: "Rabat-Salé-Kénitra",
    description: "Région de la capitale administrative du Maroc, alliant modernité, patrimoine et activité agricole.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Béni-Mellal-Khénifra": {
    title: "Béni-Mellal-Khénifra",
    description: "Région montagneuse du Moyen Atlas, caractérisée par ses ressources hydriques et agricoles abondantes.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Drâa-Tafilalet": {
    title: "Drâa-Tafilalet",
    description: "Région saharienne riche en oasis, palmeraies et patrimoine architectural du sud-est marocain.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Souss-Massa": {
    title: "Souss-Massa",
    description: "Région située entre montagnes et océan, célèbre pour son agriculture et la ville d’Agadir.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Marrakech-Safi": {
    title: "Marrakech-Safi",
    description: "Région emblématique du tourisme marocain, mêlant patrimoine historique et côte atlantique.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Guelmim-Oued Noun": {
    title: "Guelmim-Oued Noun",
    description: "Porte du désert, cette région est connue pour ses traditions nomades et ses paysages arides.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Laâyoune-Sakia El Hamra": {
    title: "Laâyoune-Sakia El Hamra",
    description: "Région du sud du Maroc, caractérisée par son climat désertique et ses ressources halieutiques.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Dakhla-Oued Ed-Dahab": {
    title: "Dakhla-Oued Ed-Dahab",
    description: "Région côtière saharienne prisée pour les sports nautiques et la richesse de son littoral.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
  "Casablanca-Settat": {
    title: "Casablanca-Settat",
    description: "Région la plus peuplée et dynamique économiquement du Maroc, abritant la métropole de Casablanca.",
    links: ["Precipitaion : N\\A", " DRI : N\\A", "Température : N\\A"],
  },
};


const MoroccoMap = ({ setSelectedRegion, selectedRegion }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    chartRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        wheelX: "zoomX",
        wheelY: "zoomY",
        projection: am5map.geoMercator(),
      })
    );

    const zoomControl = am5map.ZoomControl.new(root, {});
    chart.set("zoomControl", zoomControl);

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_moroccoLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x2b6eeb),
    });

    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const regionName = ev.target.dataItem.dataContext.name;
      setSelectedRegion(regionName); // <-- update selected region in parent
      polygonSeries.zoomToDataItem(ev.target.dataItem);
    });

    return () => {
      root.dispose();
    };
  }, [setSelectedRegion]);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div id="chartdiv" style={{ width: "60%", height: "550px" }} />
      <div className={styles.detailsBox}>
        <h2>
          Region: {regionDetails[selectedRegion]?.title || selectedRegion}
        </h2>
        <p>
          {regionDetails[selectedRegion]?.description ||
            "No details available for this region."}
        </p>

        <div className={styles.linksBox}>
          <h3>Data of the Wedan:</h3>
          {regionDetails[selectedRegion]?.links && (
            <ul>
              {regionDetails[selectedRegion].links.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoroccoMap;
