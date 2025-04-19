import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SlotProgress = ({ total = 1000, available = 756}) => {
  const percentage = Math.round((available / total) * 100);

  const getTextColor = () => {
    if (percentage < 10) return "text-red-600";
    if (percentage >= 10 && percentage <= 50) return "text-orange-500";
    if (percentage > 50) return "text-green-600";
    return "text-blue-600";
  };

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
          value={percentage}
          strokeWidth={8}
          styles={buildStyles({
            rotation: 0, // 12 o'clock start
            strokeLinecap: "round", // rounded ends = natural gap
            pathColor: "#22C55E", // green
            trailColor: "#EF4444", // red
            textColor: "transparent",
          })}
        />
      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${getTextColor()}`}>
          {percentage}%
        </span>
        <span className="text-sm text-gray-600">
          {available} / {total}
        </span>
      </div>
    </div>
  );
};

export default SlotProgress;
