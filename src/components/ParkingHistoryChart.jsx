import React, { useRef, useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from 'recharts';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded text-xs shadow">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((item) => (
          <p key={`${item.payload.day}-${item.payload.startTime}`}>
            {item.payload.startTime}:00 - {item.payload.endTime}:00
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ParkingHistoryChart = ({data}) => {
  const chartHeight = 500;

  // Convert data
  const barChartData = data.map((entry) => {
    const date = new Date(entry.day);
    const dayName = daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Adjust Sunday (0) to be last
    return {
      day: dayName,
      startTime: entry.start,
      endTime: entry.end,
      duration: entry.end - entry.start,
      startValue: entry.start,
    };
  });

  // Adjust bar height and bar top dynamically
  const chartRef = useRef(null);
  const [yAxisInfo, setYAxisInfo] = useState({ top: 0, height: 0 });

  useEffect(() => {
    requestAnimationFrame(() => {
      if (chartRef.current) {
        const yAxisLine = chartRef.current.querySelector('.recharts-cartesian-axis-line');
        if (yAxisLine) {
          const y1 = parseFloat(yAxisLine.getAttribute('y1'));
          const y2 = parseFloat(yAxisLine.getAttribute('y2'));
          const height = y2 - y1;
          setYAxisInfo({ top: y1, height });
        }
      }
    });
  }, []);
  

  return (
    <div ref={chartRef} style={{ width: '100%', height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="horizontal" 
          data={barChartData}
          margin={{ top: 10, right: 30, bottom: 10, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} /> 
          <XAxis
            type="category" 
            dataKey="day"
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <YAxis
            type="number" 
            domain={[22, 6]}
            ticks={[22, 20, 18, 16, 14, 12, 10, 8, 6]}  // Reverse the domain for upward grow bar
            tickFormatter={(tick) =>
                tick < 12 ? `${tick} AM` : tick === 12 ? '12 PM' : `${tick - 12} PM`
            }
            tick={{ fontSize: 12 }}
            interval={0}
            className='recharts-cartesian-axis'
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey= {(entry) => entry.end - entry.start} 
            barSize={10}
            radius={[5, 5, 5, 5]}
            fill="#555"
            isAnimationActive={false}
            shape={({ x, width, payload }) => {
              const minHour = 6;
              const maxHour = 22;
              const unitHeight = yAxisInfo.height / (maxHour - minHour);
            
              const y = yAxisInfo.top + (maxHour - payload.endTime) * unitHeight;
            
              const height = payload.duration * unitHeight;
            
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx={4}
                  ry={4}
                  fill="#555"
                />
              );
            }}
          />


        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center items-center text-sm text-gray-600">
        <span className="font-medium">
          Week 14/04/2025 - 20/04/2025
        </span>
      </div>
    </div>
  );
}

export default ParkingHistoryChart;