import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



export default function ReportingStatistic({data, width}) {
  return (
    <div>
    <p className="text-center text-sm mt-2">Number of reports by day</p>
    <BarChart width={width} height={300} data={data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="resolved" stackId="a" fill="#00cc66" name="Resolved" />
        <Bar dataKey="notResolved" stackId="a" fill="#c4c4c4" name="Not resolve" />
    </BarChart>
    </div>
  );
}
