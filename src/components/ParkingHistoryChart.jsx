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

const fullData = [
  { day: '2025-04-07', start: 18, end: 20 }, // Mon (6PM–8PM)
  { day: '2025-04-08', start: 7, end: 9 },
  { day: '2025-04-09', start: 17, end: 19 },
  { day: '2025-04-10', start: 13, end: 14 },
  { day: '2025-04-11', start: 8, end: 18 },
  { day: '2025-04-12', start: 10, end: 20 },
  { day: '2025-04-13', start: 10, end: 20 },
];

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

export default function ParkingHistoryChart() {
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

  const formattedData = displayedDays.map((date, index) => {
    const entriesForDay = fullData.filter((d) => d.day === date);
    return {
      day: daysOfWeek[index],
      entries: entriesForDay.map((entry) => ({
        startTime: entry.start,
        endTime: entry.end,
        duration: entry.end - entry.start,
      })),
    };
  });

  const barChartData = formattedData.reduce((acc, curr) => {
    curr.entries.forEach((entry) => {
      acc.push({
        day: curr.day,
        startTime: entry.startTime,
        endTime: entry.endTime,
        duration: entry.duration,
        startValue: entry.startTime,
      });
    });
    return acc;
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          layout="horizontal" 
          data={barChartData}
          margin={{ top: 10, right: 30, bottom: 30, left: 20 }} // Adjust margins for horizontal layout
        >
        <CartesianGrid strokeDasharray="3 3" vertical={false} /> {/* Changed horizontal to vertical */}
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
        layout="horizontal" 
        yAxisId={0}
        xAxisId={0}
        entryShape={({ x, y, width, height, payload }) => {
            const startHour = payload.startTime; // Use startTime directly
            const scaledY = ((startHour - 6) / (22 - 6)) * height;
            return <rect x={x} y={scaledY} width={width} height={10} rx={4} ry={4} fill="#555" />;
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