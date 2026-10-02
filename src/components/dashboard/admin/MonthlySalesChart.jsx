"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTheme } from "@/lib/useTheme";

export default function MonthlySalesChart({
  data,
}) {
  const theme = useTheme();

  const isDark = theme === "dark";

  const axisColor = isDark ? "#8f9db8" : "#65718a";
  const gridColor = isDark ? "rgba(148,163,184,0.12)" : "rgba(15,23,42,0.08)";
  const tooltipBg = isDark ? "#131c36" : "#ffffff";
  const tooltipBorder = isDark ? "#242f52" : "#e8e2d6";
  const tooltipText = isDark ? "#eef2ff" : "#0f172a";

  return (
    <div className="card p-4 sm:p-6">
      <h2 className="mb-5 text-lg font-bold text-ink sm:text-xl">
        Monthly Revenue
      </h2>

      {/* Tall enough for the axis labels on a phone, capped on desktop. */}
      <div className="h-[280px] sm:h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: axisColor, fontSize: 11 }}
              axisLine={{ stroke: gridColor }}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={4}
            />

            <YAxis
              tick={{ fill: axisColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />

            <Tooltip
              cursor={{ fill: isDark ? "rgba(148,163,184,0.08)" : "rgba(99,102,241,0.06)" }}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                color: tooltipText,
                boxShadow: "0 12px 32px -16px rgba(2,6,23,0.5)",
              }}
              labelStyle={{ color: tooltipText, fontWeight: 600 }}
            />

            <Bar
              dataKey="revenue"
              fill="#818cf8"
              radius={[8, 8, 0, 0]}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}