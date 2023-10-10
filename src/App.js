import {
  faCircleArrowDown,
  faCircleArrowUp,
  faPause,
  faPlay,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [min, setMin] = useState(25);
  const [seg, setSeg] = useState(0);

  return (
    <div className="container">
      <h1 className="title">Session Clock</h1>

      <div className="container-controls">
        <div className="controls left">
          <h3 id="break-label">Time Break</h3>
          <div className="control">
            <button id="break-increment">
              <FontAwesomeIcon icon={faCircleArrowUp} />
            </button>
            <span id="break-length">5</span>
            <button id="break-decrement">
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>
          </div>
        </div>

        <div className="controls right">
          <h3 id="session-label">Time Session</h3>
          <div className="control">
            <button id="session-increment">
              <FontAwesomeIcon icon={faCircleArrowUp} />
            </button>
            <span id="session-length">25</span>
            <button id="session-decrement">
              <FontAwesomeIcon icon={faCircleArrowDown} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-time">
        <div className="time">
          <h3 id="timer-label">Session</h3>
          <div id="time-left">
            {min.toString().padStart(2, "0")}:{seg.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="btns">
          <button id="start_stop">
            <FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} />
          </button>

          <button id="reset">
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </div>
      </div>
      <span className="author">by Saile</span>
    </div>
  );
}

export default App;
