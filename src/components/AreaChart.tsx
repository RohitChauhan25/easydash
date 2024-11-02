import { AreaChart, Area } from "recharts";

export default function AreaChartComponent({ data }: any) {
  return (
    <AreaChart
      width={150}
      height={40}
      data={data}
      margin={{
        top: 0,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="-10.68%" stopColor="#0E73BB" stopOpacity={1} />
          <stop
            offset="98.33%"
            stopColor="rgba(49, 54, 57, 0)"
            stopOpacity={1}
          />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#0E73BB"
        fill="url(#gradient1)"
      />
    </AreaChart>
  );
}
