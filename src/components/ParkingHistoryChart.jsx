import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/en';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded text-xs shadow">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((item, index) => (
          <p key={`tooltip-${index}`}>
            {item.payload.startTime}:00 - {item.payload.endTime}:00
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ParkingHistoryChart({data}) {
  const dataStartDate = dayjs('2025-03-31');
  const today = dayjs();

  const getWeekStart = (date) => {
    const day = date.day();
    const diff = day === 0 ? 6 : day - 1;
    return date.subtract(diff, 'day').startOf('day');
  };

  const lastWeekStartToday = getWeekStart(today).subtract(1, 'week');
  const initialWeekOffset = lastWeekStartToday.diff(getWeekStart(dataStartDate), 'week');
  const [weekOffset, setWeekOffset] = useState(initialWeekOffset);

  const getWeekRange = () => {
    const start = getWeekStart(dataStartDate).add(weekOffset, 'week');
    return { start, end: start.add(6, 'day').endOf('day') };
  };

  const { start, end } = getWeekRange();

  const displayedDays = daysOfWeek.map((_, index) => start.add(index, 'day').format('YYYY-MM-DD'));

  const barChartData = displayedDays.flatMap((date, index) => {
    const entriesForDay = data.filter((d) => d.day === date);
    return entriesForDay.map((entry) => ({
      day: daysOfWeek[index],
      startTime: entry.start,
      endTime: entry.end,
      duration: entry.end - entry.start,
      startValue: entry.start,
    }));
  });
  

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          layout="horizontal" 
          data={barChartData}
          margin={{ top: 10, right: 30, bottom: 30, left: 20 }}
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
            domain={[6, 22]}
            ticks={[6, 8, 10, 12, 14, 16, 18, 20, 22]}
            tickFormatter={(tick) =>
                tick < 12 ? `${tick} AM` : tick === 12 ? '12 PM' : `${tick - 12} PM`
            }
            tick={{ fontSize: 12 }}
            interval={1}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="duration"
            barSize={10}
            radius={[5, 5, 5, 5]}
            fill="#555"
            isAnimationActive={false}
            shape={({ x, width, payload, yAxis }) => {
              const scaleY = yAxis?.scale;
              const yStart = scaleY(payload.startTime);
              const yEnd = scaleY(payload.endTime);
            
              const barHeight = yEnd - yStart;
            
              return (
                <rect
                  x={x}
                  y={yStart}
                  width={width}
                  height={barHeight}
                  rx={4}
                  ry={4}
                  fill="#555"
                />
              );
            }}            
          />


        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <button
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="px-2 py-1 hover:bg-gray-100 rounded"
          disabled={start.isBefore(getWeekStart(dataStartDate))}
        >
          &lt;
        </button>
        <span className="font-medium">
          Week {start.format('DD/MM/YYYY')} - {end.format('DD/MM/YYYY')}
        </span>
        <button
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="px-2 py-1 hover:bg-gray-100 rounded"
        >
          &gt;
        </button>
      </div>
    </>
  );
}