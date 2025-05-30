"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_moroccoLow from "@amcharts/amcharts5-geodata/moroccoLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from "./box.module.css";

const regionDetails = {
  "Casablanca-Settat": {
    title: "Casablanca-Settat",
    description: "Casablanca-Settat is a major economic hub in Morocco.",
    links: ["Elweed 1", "Elweed 2", "Elweed 3", "Elweed 4"],
  },
  "Rabat-Salé-Kénitra": {
    title: "Rabat-Salé-Kénitra",
    description: "The capital region of Morocco.",
    links: ["https://example.com/rabat"],
  },
  "Marrakech-Safi": {
    title: "Marrakech-Safi",
    description: "A famous tourist region.",
    links: ["https://example.com/marrakech"],
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
