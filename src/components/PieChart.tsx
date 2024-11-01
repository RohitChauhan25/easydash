import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data02 = [
  { name: "Others", value: 10 },
  { name: "Mac OS", value: 15 },
  { name: "Android", value: 20 },
  { name: "Windows", value: 25 },
  { name: "IOS", value: 30 },
];

const totalValue = data02.reduce((sum, entry) => sum + entry.value, 0);
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const percentage = ((payload[0].value / totalValue) * 100).toFixed(); // Calculate percentage with 2 decimal places

    return (
      <div className="custome-tootip">
        <span className="m-0 p-1">{payload[0].payload.name} </span>
        {payload.map((entry: any, index: number) => (
          <span key={index}>{percentage}% </span>
        ))}
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({
  name,
  value,
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10; // Position outside the pie segment
  const x = cx + radius * Math.cos(-midAngle * RADIAN); // x position of label
  const y = cy + radius * Math.sin(-midAngle * RADIAN); // y position of label
  const percentage = ((value / totalValue) * 100).toFixed(0);

  // Adjust position based on the midAngle
  const isLeftSide = midAngle > 90 && midAngle < 270;
  return (
    <foreignObject
      x={isLeftSide ? x - 100 : x - 20}
      y={y - 25}
      width={200}
      height={40}
    >
      <div className="custome-label">{`${name}: ${percentage}%`}</div>
    </foreignObject>
  );
};

export default function PieChartComponent() {
  return (
    <PieChart className="recharts-wrapper" height={340} width={400}>
      <defs>
        {/* Define a linear gradient */}
        <linearGradient id="gradient1" x1="0%" y1="83.48%%" x2="100%" y2="75%">
          <stop offset="38%" stopColor="#4FCBF2" stopOpacity={1} />
          <stop offset="66%" stopColor="#044AFC" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="47%" stopColor="#19CBF4" stopOpacity={1} />
          <stop offset="64%" stopColor="#A4CAFB" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%" stopColor="#236BDC" stopOpacity={1} />
          <stop offset="100%" stopColor="#8AF5F7" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3f51b5" stopOpacity={1} />
          <stop offset="100%" stopColor="#2196f3" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="40%" stopColor="#016268" stopOpacity={1} />
          <stop offset="80%" stopColor="#19CBF4" stopOpacity={1} />
          <stop offset="100%" stopColor="#A4CAFB" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Pie
        data={data02}
        dataKey="value"
        cx={200}
        cy={120}
        innerRadius={60}
        outerRadius={90}
        paddingAngle={5}
        fill="url(#gradientColor)"
        labelLine={false}
        label={renderCustomLabel}
        cornerRadius={4}
      >
        {data02.map((entry, index) => (
          <Cell
            key={entry.name}
            fill={`url(#gradient${index + 1})`}
            stroke="none"
          />
        ))}
      </Pie>
      {/* <Tooltip content={<CustomTooltip />} /> */}
      <Legend />
    </PieChart>
  );
}
