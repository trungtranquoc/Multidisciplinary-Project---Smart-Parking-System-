import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const LogChart = ({data, range}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={range} />
        <Tooltip />
        <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={3}
        dot={{ r: 3 }}
        activeDot={{ r: 6 }}
        />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default LogChart;
