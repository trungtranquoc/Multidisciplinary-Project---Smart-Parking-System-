import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Or your preferred locale

const ParkingLotStatus = ({ temperature, closing, opening }) => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [status, setStatus] = useState('Open');

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = dayjs();
      const hour = now.hour();

      // Determine time of day
      if (hour >= 6 && hour < 12) {
        setTimeOfDay('Morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('Afternoon');
      } else if (hour >= 18 && hour < 21) {
        setTimeOfDay('Evening');
      } else {
        setTimeOfDay('Night');
      }

      // Format the date
      setFormattedDate(now.format('dddd, MMMM D YYYY')); // Added YYYY for the year

      // Determine parking lot status
      if (hour >= 21 || hour < 6) {
        setStatus('Closed');
      } else {
        setStatus('Open');
      }
    };

    // Update time and status immediately
    updateTimeAndStatus();

    // Update time and status every minute
    const intervalId = setInterval(updateTimeAndStatus, 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex space-x-4">
      {/* Time and Day Card (Mimicking Weather Card Structure) */}
      <div className="bg-lime-100 rounded-lg shadow-md p-6 w-64">
        <h2 className="text-xl font-semibold mb-2">{timeOfDay}</h2>
        <div className="flex items-center mb-3">
          <div className="relative w-12 h-12">
            <div className="absolute bottom-0 left-0 bg-white rounded-full w-8 h-8"></div>
            <div className="absolute top-0 right-0 bg-yellow-400 rounded-full w-8 h-8"></div>
          </div>
          <div className="ml-3">
            <span className="text-2xl font-bold">{temperature}°</span> {/* Static Temperature */}
            <p className="text-sm text-gray-600">Sunny</p> {/* Static Weather */}
          </div>
        </div>
        <p className="text-sm text-gray-700">{formattedDate}</p>
      </div>

      {/* Status Card */}
      <div className="bg-green-50 rounded-lg shadow-md p-6 w-64 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <div className="bg-gray-200 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 transform rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold ml-2">Status</h2>
          </div>
          <p className={`text-2xl font-bold ${status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </p>
        </div>
        <p className="text-sm text-gray-700">{status === 'Closed' ? "Opening: " + opening : "Closing: " + closing}</p>
      </div>
    </div>
  );
};

export default ParkingLotStatus;