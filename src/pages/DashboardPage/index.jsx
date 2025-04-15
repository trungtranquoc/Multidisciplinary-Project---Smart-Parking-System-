import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./index.css"
import SlotProgress from "../../components/PieChartStatus";
import { Bike, MapPin, Clock, Hourglass } from 'lucide-react';
import ParkingHistoryChart from "../../components/ParkingHistoryChart";
import ParkingLotStatus from "../../components/ParkingLotStatus";
const DashooardPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      setIsLoading(false);
    }

    fetchData();
  }, [])

  // Loading page
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="font-bold text-4xl text-blue">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-5 bg-gray-100 p-6 w-full overflow-y-auto max-h-screen h-screen">
      <Header pageName="Dashboard Page" description="View your parking statistic here."/>
      <div className="dashboard flex w-full gap-10">
        <div className="status-left-bar w-full">
          <div className="max-w-md mx-auto mt-2 mb-2 p-6 bg-white space-y-2">
            <h1 className="text-2xl font-bold text-black mb-4">Parking Lot Status</h1>
            <ParkingLotStatus />
          </div>
          <div className="max-w-md mx-auto mt-2 mb-2 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-black">Parking history</h1>
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-500 inline-block" /> Last week
              </span>
            </div>
            <ParkingHistoryChart />
          </div>
        </div>

        <div className="status-right-bar w-full">
          <div className="max-w-md mx-auto mt-2 mb-2 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
            <h1 className="text-2xl font-bold text-black mb-4">Available slots</h1>

            <div className="flex items-center justify-center mb-6">
              <SlotProgress total={1000} available={700} />
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


          <div className="max-w-md mx-auto mt-2 mb-2 p-6 rounded-2xl shadow-md border border-gray-200 bg-white space-y-6">
            <h2 className="text-2xl font-bold text-black">Parking status</h2>

            <div className="flex flex-col items-center">
              <Bike className="w-16 h-16 text-green-500" />
              <p className="mt-2 text-lg font-semibold text-green-600">Currently Parking</p>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex items-center space-x-2">
                <Bike className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">License:</span>
                <span>SA - 59B.10125</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <p className="text-sm">
                  <span className="font-semibold">Parking:</span>{' '}
                  <span className="font-normal">Entrance 3 - To Hien Thanh Parking Lot</span>
                </p>
              </div>


              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">Enter:</span>
                <span>07:11:36 AM - 07/04/2025</span>
              </div>

              <div className="flex items-center space-x-2">
                <Hourglass className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">Closing at:</span>
                <span>21:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashooardPage;