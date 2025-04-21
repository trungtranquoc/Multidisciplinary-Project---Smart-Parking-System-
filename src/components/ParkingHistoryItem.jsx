import React from "react";
import { formatDate, formatHour } from "../utils/functions";

const ParkingHistoryItem = ({ date, day_in_week, bike, enter, exit, parking_lot, responsible }) => {
  // console.log(date)

  return (
    <div 
        className="flex flex-row w-full"
    >
        <p className="w-[16%] flex items-start text-black font-normal text-lg">{day_in_week + " " + formatDate(date)}</p>
        <p className="w-[13%] flex items-start text-black font-normal text-lg">{bike}</p>
        <p className="w-[12%] flex items-start text-black font-normal text-lg italic">{formatHour(enter)}</p>
        <p className="w-[12%] flex items-start text-black font-normal text-lg italic">{formatHour (exit)}</p>
        <p className="w-[24%] flex items-start text-black font-normal text-lg">{parking_lot}</p>
        <p className="w-[23%] flex items-start text-black font-normal text-lg">{responsible}</p> 
    </div>
  );
};

export default ParkingHistoryItem;