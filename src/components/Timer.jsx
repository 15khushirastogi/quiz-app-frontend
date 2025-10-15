import React, { useState, useEffect } from "react";

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // 1800 seconds = 30 minutes

  useEffect(() => {
    // Exit if time is up
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Set up interval to decrease time every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Add warning class when less than 5 minutes remaining
  const isWarning = timeLeft <= 300;

  return (
    <div className={`timer ${isWarning ? "warning" : ""}`}>
      ⏱️ {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
