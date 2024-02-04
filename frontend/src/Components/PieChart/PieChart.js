import React, { PureComponent, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const colorMap = {
  correct: "#00900e",
  incorrect: "#ff3f3f",
  unattempted: "#d9d9d9",
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000000"
      fontFamily="Inira sans"
      fontSize={"36px"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 10).toFixed(0)}`}
    </text>
  );
};

export default class Example extends PureComponent {
  render() {
    let specificAnswers = {
      correct: 0,
      incorrect: 0,
      unattempted: 0,
    };

    let v = JSON.parse(localStorage.getItem("specific_answers"));
    if (v) specificAnswers = v;

    let data = [];
    let COLORS = [];
    for (let key in specificAnswers) {
      if (specificAnswers[key] !== 0) {
        data.push({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: specificAnswers[key],
        });
        COLORS.push(colorMap[key]);
      }
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            animationDuration={800}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={170}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
