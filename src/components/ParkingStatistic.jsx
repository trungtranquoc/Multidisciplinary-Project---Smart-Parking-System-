import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function ParkingStatistic({data, width}) {
  return (
    <div>
      <LineChart width={width} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#000" strokeWidth={2} />
      </LineChart>

      <p className="text-center text-sm mt-2">Number of bike in the parking lot by time</p>
    </div>
  );
}

export default ParkingStatistic