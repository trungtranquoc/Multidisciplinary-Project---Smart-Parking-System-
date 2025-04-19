import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import ParkingStatistic from "../../../components/ParkingStatistic";
import ReportingStatistic from "../../../components/ReportingStatistic";

const Statistic = () => {
  const [isLoading, setIsLoading] = useState(true);

  const parkingData = [
    { time: '6 AM', count: 0 },
    { time: '7 AM', count: 300 },
    { time: '8 AM', count: 1100 },
    { time: '9 AM', count: 1300 },
    { time: '10 AM', count: 1450 },
    { time: '11 AM', count: 1500 },
    { time: '12 PM', count: 1100 },
    { time: '1 PM', count: 800 },
    { time: '2 PM', count: 1450 },
    { time: '3 PM', count: 1300 },
    { time: '4 PM', count: 1100 },
    { time: '5 PM', count: 900 },
    { time: '6 PM', count: 600 },
    { time: '7 PM', count: 300 },
    { time: '8 PM', count: 400 },
    { time: '9 PM', count: 200 },
    { time: '10 PM', count: 100 },
  ];

  const reportData = [
    { date: 'Sat 05/04', resolved: 12, notResolved: 4 },
    { date: 'Sat 05/04', resolved: 14, notResolved: 6 },
    { date: 'Sat 05/04', resolved: 10, notResolved: 4 },
    { date: 'Sat 05/04', resolved: 14, notResolved: 8 },
    { date: 'Sat 05/04', resolved: 13, notResolved: 7 },
    { date: 'Sat 05/04', resolved: 11, notResolved: 7 },
    { date: 'Sat 05/04', resolved: 6, notResolved: 6 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Dashboard Page" description="View your parking statistic here." />
      <div className="w-full bg-white shadow-md p-4 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Reporting statistic</h2>
          <button className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 px-4 h-10 rounded-[8px] shadow underline"
          onClick={() => (window.location.href = 'dashboard')}>
            &lt; Garage status
          </button>

        </div>

        <div className="flex flex-wrap gap-4">
            <ReportingStatistic data={reportData} width={1000}/>

        </div>
      </div>

      <div className="w-full bg-white shadow-md p-4 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Parking statistic</h2>
          <select name="" id="">
                <option value="" selected>Monday 07/04/2025</option>
          </select>
        </div>

        <div className="flex justify-center mt-10 flex-wrap gap-4">
            <ParkingStatistic data={parkingData} width={1000}/>
        </div>
      </div>
  </div>
  );
};

export default Statistic;
