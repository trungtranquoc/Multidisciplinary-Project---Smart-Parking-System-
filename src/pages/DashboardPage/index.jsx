import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SlotProgress from "../../components/PieChartStatus";
import { Bike, MapPin, Clock, Hourglass } from 'lucide-react';
import ParkingHistoryChart from "../../components/ParkingHistoryChart";
import ParkingLotStatus from "../../components/ParkingLotStatus";
import UserService from "../../API/user";
import { hardParkingStatus, hardCurrentParking } from "../../hardData";
import { formatDateTime, formatHour } from "../../utils/functions";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  const parkingData = [
    { day: '2025-04-07', start: 18, end: 20 },
    { day: '2025-04-08', start: 7, end: 9 },
    { day: '2025-04-09', start: 17, end: 19 },
    { day: '2025-04-10', start: 13, end: 14 },
    { day: '2025-04-11', start: 8, end: 18 },
    { day: '2025-04-12', start: 10, end: 20 },
    { day: '2025-04-13', start: 10, end: 20 },
  ];

  const [parkingStatus, setParkingStatus] = useState(null)
  const [currentParking, setCurrentParking] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      await UserService.getParkingStatus().then((res) => {
        const fetchParkingStatus = res.data;
        console.log(res)
        setParkingStatus(fetchParkingStatus);
      }).catch((err) => {
        setParkingStatus(hardParkingStatus);
        alert("Connect to Backend fail: " + err)
      })

      await UserService.getCurrentParking().then((res) => {
        const fetchCurrentParking = res.data;
        setCurrentParking(fetchCurrentParking);
        console.log(res)
      }).catch((err) => {
        setCurrentParking(hardCurrentParking);
        alert("Connect to Backend fail: " + err)
      }).finally(() => {
        setIsLoading(false);
      })
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
        <div className="status-left-bar py-10 w-full rounded-2xl shadow-md border border-gray-200 bg-white">
          <div className="w-full px-10 mt-2 mb-8 bg-white space-y-2 items-start">
            <h1 className="text-2xl font-bold text-black mb-4">Parking Lot Status</h1>
            <ParkingLotStatus temperature={parkingStatus.temperature} closing={formatHour(parkingStatus.closing)} opening={formatHour(parkingStatus.opening)} />
          </div>
          <div className="w-full px-10 mt-2 mb-2 rounded-2xl space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-black">Parking history</h1>
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-500 inline-block" /> Last week
              </span>
            </div>
            <ParkingHistoryChart data={parkingData} />
          </div>
        </div>

        <div className="status-right-bar w-full">
          <div className="w-full p-10 mb-8 rounded-2xl space-y-6 shadow-md border border-gray-200 bg-white">
            <h1 className="text-2xl font-bold text-black mb-4">Available slots</h1>

            <div className="flex items-center justify-center mb-6">
              <SlotProgress total={parkingStatus.maximum_slot} available={parkingStatus.available_slot} />
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


          <div className="w-full p-10 mt-2 mb-2 rounded-2xl space-y-6 shadow-md border border-gray-200 bg-white">
            <h2 className="text-2xl font-bold text-black">Parking status</h2>

            <div className="flex flex-col items-center">
              <Bike className="w-16 h-16 text-green-500" />
              <p className={`mt-2 text-lg font-semibold ${currentParking.is_parking ? 'text-green-600' : 'text-gray-700'}`}>{currentParking.is_parking ? "Currently Parking" : "Not Parking"}</p>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex items-center space-x-2">
                <Bike className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">License:</span>
                <span>{currentParking.is_parking ? currentParking.bike : ''}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <p className="text-sm">
                  <span className="font-semibold">Parking:</span>{' '}
                  <span className="font-normal">{currentParking.is_parking ? currentParking.parking_lot : ''}</span>
                </p>
              </div>


              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">Enter:</span>
                <span>{currentParking.is_parking ? formatDateTime(currentParking.enter) : ''}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Hourglass className="w-5 h-5 text-gray-600" />
                <span className="font-semibold">Closing at:</span>
                <span>{currentParking.is_parking ? formatHour(parkingStatus.closing) : ''}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;