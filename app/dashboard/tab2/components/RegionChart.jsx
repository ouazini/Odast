"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./chart.module.css";

// Utility to generate dummy data per region
const generateRegionData = (region, years) => {
  const data = [];
  const startDate = new Date("2024-06-01");
  const totalMonths = years * 12;

  const seed = region ? region.length * 100 : 100; // different seed per region

  for (let i = 0; i < totalMonths; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    const yearMonth = date.toISOString().slice(0, 7);

    data.push({
      date: yearMonth,
      desktop: Math.floor(seed + Math.random() * 200),
      mobile: Math.floor(seed + Math.random() * 300),
    });
  }

  return data;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "#2B6EEB",
  },
  mobile: {
    label: "Mobile",
    color: "#5FA7F9",
  },
};

export function RegionChart({ selectedRegion }) {
  const [timeRange, setTimeRange] = React.useState("1y");

  const filteredData = React.useMemo(() => {
    const years = parseInt(timeRange.replace("y", ""));
    return generateRegionData(selectedRegion || "Unknown", years);
  }, [timeRange, selectedRegion]);

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle className={styles.cardTitle}>
            Visitors - {selectedRegion || "No Region Selected"}
          </CardTitle>
          <CardDescription className={styles.cardDescription}>
            (x) vs (x) Analytics in this region
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className={`${styles.range} h-10 w-full `}>
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className={styles.item} value="1y">
                Current Year
              </SelectItem>
              <SelectItem className={styles.item} value="2y">
                Next 2 Years
              </SelectItem>
              <SelectItem className={styles.item} value="3y">
                Next 3 Years
              </SelectItem>
              <SelectItem className={styles.item} value="4y">
                Next 4 Years
              </SelectItem>
              <SelectItem className={styles.item} value="5y">
                Next 5 Years
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {selectedRegion ? (
          <ChartContainer className="w-full aspect-[4/1]">
            <AreaChart data={filteredData}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                  const [year, month] = str.split("-");
                  return `${month}/${year}`;
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <ChartTooltip>
                <ChartTooltipContent name="Desktop" />
                <ChartTooltipContent name="Mobile" />
              </ChartTooltip>
              <Area
                type="monotone"
                dataKey="desktop"
                stroke={chartConfig.desktop.color}
                fill={chartConfig.desktop.color}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stroke={chartConfig.mobile.color}
                fill={chartConfig.mobile.color}
                stackId="1"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <p className={`${styles.noRegion} text-muted-foreground text-sm`}>
            Please select a region on the map to view analytics.
          </p>
        )}
        {selectedRegion && (
          <ChartLegend className="mt-4">
            <ChartLegendContent
              name="Desktop"
              color={chartConfig.desktop.color}
            />
            <ChartLegendContent
              name="Mobile"
              color={chartConfig.mobile.color}
            />
          </ChartLegend>
        )}
      </CardContent>
    </Card>
  );
}
