"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@/lib/useTheme";

const PALETTE = [
  "#6366f1",
  "#a855f7",
  "#e879f9",
  "#38bdf8",
  "#34d399",
  "#f472b6",
  "#fbbf24",
  "#f87171",
  "#22d3ee",
  "#fb923c",
];

export default function GenrePieChart({
  data,
}) {
  const theme = useTheme();

  const isDark = theme === "dark";

  const tooltipBg = isDark ? "#131c36" : "#ffffff";
  const tooltipBorder = isDark ? "#242f52" : "#e8e2d6";
  const tooltipText = isDark ? "#eef2ff" : "#0f172a";
  const legendColor = isDark ? "#8f9db8" : "#65718a";

  return (
    <div className="card p-4 sm:p-6">
      <h2 className="mb-5 text-lg font-bold text-ink sm:text-xl">
        Ebooks By Genre
      </h2>

      <div className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            {/* Radius is a % of the smaller chart dimension, so the pie
                scales with the card instead of overflowing a 320px
                viewport (previously a hardcoded 110px radius). */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="genre"
              outerRadius="78%"
              innerRadius="42%"
              label={false}
              labelLine={false}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={PALETTE[index % PALETTE.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                color: tooltipText,
                boxShadow: "0 12px 32px -16px rgba(2,6,23,0.5)",
              }}
            />

            <Legend
              iconType="circle"
              iconSize={8}
              layout="horizontal"
              wrapperStyle={{
                color: legendColor,
                fontSize: 11,
                paddingTop: 8,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}