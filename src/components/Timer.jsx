import React, { useEffect, useState } from "react";
import "./Timer.css";

const STATUS = {
  pause: 0,
  start: 1,
  default: 2,
};

function Timer() {
  const hoverHandler = () => {
    clearInterval(intervalRef.current);
    window.alert("Paused..");
  };
  const outHandler = () => {
    intervalRef.current = setInterval(() => {
      countDown();
    }, 1000);
  };

  const [status, setStatus] = React.useState(STATUS.default);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(10);
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const intervalRef = React.useRef();

  function countDown() {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59);
        setMinutes((min) => min - 1);
      } else {
        let mins = displayMessage ? 0 : 0;
        let sec = 0;
        setSeconds(sec);
        setMinutes(mins);
        setDisplayMessage((value) => !value);
      }
    } else {
      setSeconds((sec) => sec - 1);
    }
  }

  React.useEffect(() => {
    if (status === STATUS.start) {
      intervalRef.current = setInterval(
        () => {
          countDown();
        },1000
      );

    } else if (status === STATUS.pause && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds, status]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const start = () => setStatus(STATUS.start);
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

      <button className="btn" id="btn-start" onClick={start}>
        Start
      </button>

      <button className="btn" id="btn-stop" onClick={stop}>
        Stop
      </button>
    </div>
  );
}

export default Timer;
