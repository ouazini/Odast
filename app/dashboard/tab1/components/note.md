<!-- "use client";

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

// ✅ Static data per region
const regionData = {
  Morocco: [
    { date: "2024-06", desktop: 300, mobile: 500 },
    { date: "2024-07", desktop: 350, mobile: 480 },
    { date: "2024-08", desktop: 400, mobile: 470 },
    { date: "2024-09", desktop: 420, mobile: 600 },
    { date: "2024-10", desktop: 450, mobile: 650 },
    { date: "2024-11", desktop: 480, mobile: 680 },
    { date: "2024-12", desktop: 500, mobile: 700 },
    { date: "2025-01", desktop: 520, mobile: 720 },
  ],
  Spain: [
    { date: "2024-06", desktop: 200, mobile: 300 },
    { date: "2024-07", desktop: 250, mobile: 320 },
    { date: "2024-08", desktop: 280, mobile: 350 },
    { date: "2024-09", desktop: 300, mobile: 400 },
    { date: "2024-10", desktop: 320, mobile: 420 },
    { date: "2024-11", desktop: 340, mobile: 450 },
    { date: "2024-12", desktop: 360, mobile: 470 },
    { date: "2025-01", desktop: 380, mobile: 490 },
  ],
};

// Chart color config
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
    const allData = regionData[selectedRegion] || [];
    const monthsToShow = parseInt(timeRange.replace("y", "")) * 12;
    return allData.slice(0, monthsToShow);
  }, [timeRange, selectedRegion]);

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle className={styles.cardTitle}>
            Visitors - {selectedRegion || "No Region Selected"}
          </CardTitle>
          <CardDescription>
            Desktop vs Mobile visits in this region
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1y">Next 1 Year</SelectItem>
              <SelectItem value="2y">Next 2 Years</SelectItem>
              <SelectItem value="3y">Next 3 Years</SelectItem>
              <SelectItem value="4y">Next 4 Years</SelectItem>
              <SelectItem value="5y">Next 5 Years</SelectItem>
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
          <p className="text-muted-foreground text-sm">
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
} -->
