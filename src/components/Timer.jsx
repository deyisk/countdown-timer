import React, { useEffect, useState } from "react";
import "./Timer.css";

const STATUS = {
  pause: 0,
  default: 2,
};

function Timer() {
  const [status, setStatus] = React.useState(STATUS.default);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(10);
  const intervalRef = React.useRef();
  const [start, setStart] = useState(false);

  const hoverHandler = () => {
    if(start){
      clearInterval(intervalRef.current);
      window.alert("Paused..");
    }else{
      return clearInterval(intervalRef.current);
    }
  };

  const outHandler = () => {
    intervalRef.current = setInterval(() => {
      countDown();
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function countDown() {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59);
        setMinutes((min) => min - 1);
      } else {
        let sec = 0;
        setSeconds(sec);
      }
    } else {
      setSeconds((sec) => sec - 1);
    }
  }

  React.useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(
        () => {
          countDown();
        },1000);
    } else if (status === STATUS.pause) {
      clearInterval(intervalRef.current);
    }else if(intervalRef.current){
      clearInterval(intervalRef.current);
      setMinutes(0);
      setSeconds(10);
    }
    return () =>  clearInterval(intervalRef.current);
  }, [countDown, start, status]);

  const toggleStart=()=>{
    setStart(!start)
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const pause = () => setStatus(STATUS.pause);
  const stop = () => {
    setStatus(STATUS.pause);
    setMinutes(0);
    setSeconds(10);
  };

  return (
    <div className="timer">
      <div
        className="timer-header"
        onMouseEnter={hoverHandler}
        onMouseLeave={outHandler}
      >
        <h2>
          {timerMinutes}:{timerSeconds}
        </h2>
      </div>
      <button className="btn" id="btn-start" onClick={toggleStart}>{!start ? "Start Timer" : "Reset Timer"}
      </button>
    </div>
  );
}

export default Timer;
