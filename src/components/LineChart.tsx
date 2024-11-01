import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Monday", uv: 10000, pv: 15000 },
  { name: "Tuesday", uv: 25000, pv: 50000 },
  { name: "Wednesday", uv: 60000, pv: 45000 },
  { name: "Thursday", uv: 40289, pv: 22990 },
  { name: "Friday", uv: 55000, pv: 65000 },
  { name: "Saturday", uv: 20000, pv: 90000 },
  { name: "Sunday", uv: 70000, pv: 75000 },
];

const formatTick = (value: number) => {
  return ` $ ${value / 1000}k`; // Convert to thousands
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="m-0 p-1">{payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            style={{ display: "flex", alignItems: "center" }}
            className="p-1"
          >
            {/* Colored square indicator */}
            <span
              style={{
                width: 20,
                height: 20,
                backgroundColor: entry.color, // Matches the line color
                display: "inline-block",
                marginRight: 5,
              }}
            />
            {/* Custom label */}
            <span>
              {entry.name === "uv" ? "Revenue" : "Shipping Cost"}: $
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
// const chartHeight = window.innerWidth < 426 ? 300 : 380;
const Chart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="1 0"
          vertical={false}
          stroke="#BEBEBE26"
        />
        <XAxis
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          // fontSize={"10px"}
          interval={0} // Show all X-axis labels
          fontSize={10}
        />
        <YAxis
          fontSize={"10px"}
          domain={[0, 100000]} // Set the domain from 0 to 1,000,000
          ticks={[
            0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
            100000,
          ]}
          tickFormatter={formatTick}
          interval={0}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: "#ffffff",
            strokeDasharray: "3 3",
            strokeWidth: 1,
          }}
        />

        <Line type="monotone" dataKey="pv" stroke="#FF83FF" dot={false} />
        <Line type="monotone" dataKey="uv" stroke="#C5E7FF" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
