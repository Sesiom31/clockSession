import {
  faCircleArrowDown,
  faCircleArrowUp,
  faPause,
  faPlay,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import alarmAudio from "./assets/Alarm_Clock.mp3";

function App() {
  const [initialMinSession, setInitialMinSession] = useState(25);
  const [initialMinBreak, setInitialMinBreak] = useState(5);
  const [minutosSession, setMinutosSession] = useState(initialMinSession);
  const [minutosBreak, setMinutosBreak] = useState(initialMinBreak);
  const [segundos, setSegundos] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  const minColor = minutosBreak < 1 || minutosSession < 1;

  useEffect(() => {
    if (minutosBreak === 0 && segundos === 0) {
      audioRef.current.play();
    } else if (minutosSession === 0 && segundos === 0) {
      audioRef.current.play();
    }
  }, [minutosBreak, minutosSession, segundos]);

  useEffect(() => {
    let timer;
    if (isPlay) {
      timer = setInterval(() => {
        if (segundos > 0) {
          setSegundos(segundos - 1);
        } else {
          if (isSession && minutosSession === 0) {
            setMinutosSession(initialMinSession);
            setIsSession(false);
          } else if (isSession) {
            setMinutosSession(minutosSession - 1);
            setSegundos(59);
          } else if (!isSession && minutosBreak === 0) {
            setMinutosBreak(initialMinBreak);
            setIsSession(true);
          } else if (!isSession) {
            setMinutosBreak(minutosBreak - 1);
            setSegundos(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [
    isPlay,
    segundos,
    isSession,
    minutosSession,
    minutosBreak,
    initialMinBreak,
    initialMinSession,
  ]);

  const handleTogglePlay = () => {
    setIsPlay(!isPlay);
  };

  const handleIncrementTimeSession = () => {
    if (!isPlay) {
      setInitialMinSession(initialMinSession < 60 ? initialMinSession + 1 : 60);
      setMinutosSession(initialMinSession < 60 ? initialMinSession + 1 : 60);
      setSegundos(isSession ? 0 : segundos);
    }
  };

  const handleDecrementTimeSession = () => {
    if (!isPlay) {
      setInitialMinSession(initialMinSession > 1 ? initialMinSession - 1 : 1);
      setMinutosSession(initialMinSession > 1 ? initialMinSession - 1 : 1);
      setSegundos(isSession ? 0 : segundos);
    }
  };

  const handleIncrementTimeBreak = () => {
    if (!isPlay) {
      setInitialMinBreak(initialMinBreak < 60 ? initialMinBreak + 1 : 60);
      setMinutosBreak(initialMinBreak < 60 ? initialMinBreak + 1 : 60);
      setSegundos(isSession ? segundos : 0);
    }
  };

  const handleDecrementTimeBreak = () => {
    if (!isPlay) {
      setInitialMinBreak(initialMinBreak > 1 ? initialMinBreak - 1 : 1);
      setMinutosBreak(initialMinBreak > 1 ? initialMinBreak - 1 : 1);
      setSegundos(isSession ? segundos : 0);
    }
  };

  const handleReset = () => {
    setInitialMinSession(25);
    setInitialMinBreak(5);
    setMinutosSession(25);
    setMinutosBreak(5);
    setSegundos(0);
    setIsPlay(false);
    setIsSession(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="container">
      <h1 className="title">Session Clock</h1>

      <div className="container-controls">
        <div className="controls left">
          <h3 id="break-label">Time Break</h3>
          <div className="control">
            <button id="break-increment" onClick={handleIncrementTimeBreak}>
              <FontAwesomeIcon icon={faCircleArrowUp} />
            </button>
            <span id="break-length">{initialMinBreak}</span>
            <button id="break-decrement" onClick={handleDecrementTimeBreak}>
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>
          </div>
        </div>

        <div className="controls right">
          <h3 id="session-label">Time Session</h3>
          <div className="control">
            <button id="session-increment" onClick={handleIncrementTimeSession}>
              <FontAwesomeIcon icon={faCircleArrowUp} />
            </button>
            <span id="session-length">{initialMinSession}</span>
            <button id="session-decrement" onClick={handleDecrementTimeSession}>
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-time">
        <div className="time">
          <h3
            id="timer-label"
            style={{ color: minColor ? "#9c0720" : "inherit" }}
          >
            {isSession ? "Session" : "Break"}
          </h3>
          <div
            id="time-left"
            style={{ color: minColor ? "#9c0720" : "inherit" }}
          >
            {isSession
              ? minutosSession.toString().padStart(2, "0")
              : minutosBreak.toString().padStart(2, "0")}
            :{segundos.toString().padStart(2, "0")}
          </div>
          <audio id="beep" ref={audioRef} src={alarmAudio} volume={50}></audio>
        </div>

        <div className="btns">
          <button id="start_stop" onClick={handleTogglePlay}>
            {isPlay ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>

          <button id="reset" onClick={handleReset}>
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </div>
      <span className="author">by Saile</span>
    </div>
  );
}

export default App;
