import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import LogChart from "../../../components/LogChart";
import AdminService from "../../../API/admin";
import { hardTemperatureData, hardHumidityData, hardParkingStatus } from "../../../hardData";
import { formatDayOfWeek, formatHour2 } from "../../../utils/functions";

const processingTemperatureData = (data) => {
  return {
    time: formatHour2(data.record_time),
    value: data.temperature,
  }
}

const procecssingHumidityData = (data) => {
  return {
    time: formatHour2(data.record_time),
    value: Math.round(data.humidity * 100),
  }
}

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lotData, setLotData] = useState(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await AdminService.getParkingCondition().then((res) => {
          console.log("Parking condition: ", res.data);

          setLotData(res.data);
          setTemperatureData(res.data.temperature_log.slice().reverse().map((item) => processingTemperatureData(item)));
          setHumidityData(res.data.humidity_log.slice().reverse().map((item) => procecssingHumidityData(item)));
          // console.log("Temperature data: ", res.data.temperature_log.map((item) => processingTemperatureData(item)));
          // console.log("Humidity data: ", res.data.humidity_log.slice().reverse().map((item) => procecssingHumidityData(item)));
        })
        .catch((err) => {
          console.log("Error: ", err);

          setLotData(hardParkingStatus);
          setTemperatureData(hardTemperatureData);
          setHumidityData(hardHumidityData)
        }).finally(() => {
          setIsLoading(false);
        })
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
          <h2 className="text-xl font-bold">Garage status</h2>
          <button className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 px-4 h-10 rounded-[8px] shadow underline"
          onClick={() => (window.location.href = 'parking_statistic')}>
            Parking Statistic &gt;
          </button>

        </div>

        {/* Status Cards */}
        <div className="flex flex-wrap gap-4">

          {/* Current Shift Card */}
          <div className="flex-1 min-w-[200px] bg-gray-100 rounded-xl shadow p-4 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 mb-1">Current Shift</p>
            <h2 className="text-xl font-semibold">{lotData.current_shift}</h2>
            <div className="w-20 h-20 rounded-full bg-gray-400 mt-2" />
          </div>

          {/* Weather Card */}
          <div className="flex-1 min-w-[200px] bg-lime-200 rounded-xl shadow p-4 flex flex-col justify-between">
            <p className="text-lg font-medium">Morning</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">🌤️</span>
              <div>
                <p className="text-2xl font-bold">{lotData.temperature_log[0].temperature}°</p>
                <p className="text-sm text-gray-600">Sunny</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">{formatDayOfWeek(new Date())}</p>
          </div>

          {/* Humidity Card */}
          <div className="flex-1 min-w-[200px] bg-blue-400 rounded-xl shadow p-4 flex flex-col justify-between text-white">
            <p className="text-lg font-medium">Humidity</p>
            <div className="flex items-center mt-2">
              <span className="text-3xl">🌡️</span>
              <p className="text-2xl font-bold ml-2">{lotData.humidity_log[0].humidity * 100}%</p>
            </div>
            <button className="text-sm underline mt-4 text-white" onClick={() => {window.location.href='monitoring'}}>Turn on / off the ventilation</button>
          </div>

          {/* Light Card */}
          <div className="flex-1 min-w-[200px] bg-yellow-200 rounded-xl shadow p-4 flex flex-col justify-between">
            <p className="text-lg font-medium">Light</p>
            <p className="text-xl font-bold mt-2">OK</p>
            <button className="text-sm text-yellow-800 underline mt-4" onClick={() => {window.location.href='monitoring'}}>Turn on / off the lights</button>
          </div>

        </div>
      </div>





    {/* Logs part */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Temperature Log */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Temperature Log</h2>
        <LogChart data={temperatureData} range={[20,42]} />
        <p className="text-center text-sm mt-2 text-gray-500">
          Temperature log recorded (Unit: °C)
        </p>
      </div>

      {/* Humidity Log */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Humidity Log</h2>
        <LogChart data={humidityData} range={[20, 80]}/> 
        <p className="text-center text-sm mt-2 text-gray-500">
          Humidity log recorded (Unit: %)
        </p>
      </div>
    </div>

  </div>
  );
};

export default DashboardPage;
