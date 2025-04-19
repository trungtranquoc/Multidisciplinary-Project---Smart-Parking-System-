import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import SlotProgress from "../../../components/PieChartStatus";
import WorkTimeProgess from "../../../components/WorkingTimeProgress";

const dummyData = [
  { entry: 123, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 101, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 98, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 97, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 95, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 90, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 86, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 80, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 79, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
  { entry: 75, motorbike: "SA - 59B.10125", studentId: "2252859", time: "16:05 PM", lot: "Entrance 3 - To Hien Thanh Parking Lot" },
];

const PAGE_SIZE = 4;

const ParkingData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / PAGE_SIZE);
  const currentData = dummyData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
      <div className="dashboard flex flex-col w-full gap-10">
        <div className="status-upper-bar w-full">
          <div className="flex flex-wrap justify-start m-0 gap-4 w-full">
            <div className="flex-1 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
              <h1 className="text-2xl font-bold text-black mb-4">Working time remain</h1>
              <div className="flex items-center justify-center mb-6">
                <WorkTimeProgess total={17 * 60 * 60} work={11 * 60 * 60 + 58 * 60 + 15}/>
              </div>
              <div className="flex justify-around text-sm">
                <div className="flex items-center space-x-2">
                  <span>Monday, April 7 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Closing 22:00 pm</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
              <h1 className="text-2xl font-bold text-black mb-4">Available slots</h1>
              <div className="flex items-center justify-center mb-6">
                <SlotProgress total={1000} available={700}/>
              </div>
              <div className="flex justify-around text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="text-xl">&#9679;</span>
                  <span>Available slots</span>
                </div>
                <div className="flex items-center space-x-2 text-red-600">
                  <span className="text-xl">&#9679;</span>
                  <span>Unavailable slots</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="status-lower-bar w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Real-time Parking Registry</h2>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Entry No.</th>
                  <th className="text-left p-2">Motorbike</th>
                  <th className="text-left p-2">Student Id</th>
                  <th className="text-left p-2">Enter time</th>
                  <th className="text-left p-2">Parking Lot</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{item.entry}</td>
                    <td className="p-2">{item.motorbike}</td>
                    <td className="p-2">{item.studentId}</td>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.lot}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2 text-sm">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`px-2 py-1 rounded-full ${page === currentPage ? 'bg-gray-300' : ''}`}
                  onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingData;
