"use client";

import React, { useState } from "react";
import { HeaderDashboard, MoroccoMap } from "@/components/index";
import styles from "./tab.module.css";
import { RegionChart } from "./components/RegionChart";

const Page = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <>
      <HeaderDashboard />
      <section className={styles.grid}>
        <div className={styles.map}>
          <MoroccoMap
            setSelectedRegion={setSelectedRegion}
            selectedRegion={selectedRegion}
          />
        </div>
      </section>

      <div className={styles.charts}>
        <h1>* Browse analytics</h1>

        <div className={styles.first_chart}>
          <h1>Region Analytics for {selectedRegion}</h1>
          <RegionChart selectedRegion={selectedRegion} />
        </div>
      </div>
    </>
  );
};

export default Page;
