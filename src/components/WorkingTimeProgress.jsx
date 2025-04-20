import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const WorkTimeProgess = ({ total = 17 * 60 * 60, work = 11 * 60 * 60 + 58 * 60 + 15 }) => {
  const rHour = Math.floor((total - work) / 3600);
  const rMin = Math.floor((total - rHour * 3600 - work) / 60)
  const rSec = total - rHour * 3600 - work - 60 * rMin
    console.log(total)
    console.log(work)
  return (
    <div className="relative w-48 h-48">
      {/* Inner Blue Ring */}
      <div className="absolute inset-6">
        <CircularProgressbar
          value={100}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: "#3B82F6", // blue-500
            trailColor: "transparent",
            strokeLinecap: "round",
          })}
        />
      </div>

      {/* Outer Progress Ring */}
      <div className="absolute inset-0">
        <CircularProgressbar
          value={work / total * 100}
          strokeWidth={8}
          styles={buildStyles({
            rotation: 0, // 12 o'clock start
            strokeLinecap: "round", // rounded ends = natural gap
            pathColor: "#22C55E", // green
            trailColor: "#FFFFFF", 
            textColor: "transparent",
          })}
        />
      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold text-blue-600`}>
          {rHour}h
        </span>
        <span className="text-sm text-gray-600">
          {rMin}m {rSec}s
        </span>
      </div>
    </div>
  );
};

export default WorkTimeProgess;
