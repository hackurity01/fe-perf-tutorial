// TODO: 최적화 전
import React, { useState, useEffect } from "react";
import { chartsData } from "@/data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const periods = [
  { label: "최근 7일", days: 7 },
  { label: "최근 30일", days: 30 },
  { label: "최근 90일", days: 90 },
  { label: "전체", days: 365 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState(periods[3].days);
  const [filtered, setFiltered] = useState(chartsData);

  // 비효율: useEffect에서 동기 filter+reduce, render 블로킹
  useEffect(() => {
    const now = new Date("2025-12-31");
    const from = new Date(now);
    from.setDate(now.getDate() - period + 1);
    setFiltered(
      chartsData.filter((d) => {
        const date = new Date(d.date);
        return date >= from && date <= now;
      })
    );
  }, [period]);

  // Pie 데이터: value 0~249, 250~499, 500~749, 750~999
  const pieData = [
    { name: "0-249", value: filtered.filter((d) => d.value < 250).length },
    {
      name: "250-499",
      value: filtered.filter((d) => d.value >= 250 && d.value < 500).length,
    },
    {
      name: "500-749",
      value: filtered.filter((d) => d.value >= 500 && d.value < 750).length,
    },
    { name: "750-999", value: filtered.filter((d) => d.value >= 750).length },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">애널리틱스</h1>
      <div className="flex gap-4 mb-6">
        {periods.map((p) => (
          <button
            key={p.days}
            className={`px-4 py-2 rounded border ${
              period === p.days
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setPeriod(p.days)}>
            {p.label}
          </button>
        ))}
        <span className="text-gray-500 self-center">
          데이터 {filtered.length}건
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Line Chart */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Line Chart</h2>
          <LineChart width={320} height={200} data={filtered.slice(0, 90)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </div>
        {/* Bar Chart */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Bar Chart</h2>
          <BarChart width={320} height={200} data={filtered.slice(0, 30)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
        {/* Pie Chart */}
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <h2 className="font-semibold mb-2">Pie Chart</h2>
          <PieChart width={220} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label>
              {pieData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        ※ Recharts 전체 import, 코드 분할 미적용, 10,000건 동기 연산
      </p>
    </div>
  );
};

export default Analytics;
