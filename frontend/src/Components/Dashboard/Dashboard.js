import React from "react";
import "./Dashboard.css";
import dashboardImage from "../Assets/dashboard_image.svg";
import Popup from "../Popup/Popup";
import { useState } from "react";

const Dashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-left-container">
        <div className="dashboard-image-container">
          <div className="dashboard-image">
            <img src={dashboardImage} />
          </div>
          <div className="dashboard-image-title">
            <h1>@nameishere</h1>
          </div>
        </div>
        <div className="dashboard-table-container">
          <div className="dashboard-table">
            <div className="run-col">
              <div className="run-col-header">
                <h1>RUN</h1>
              </div>
            </div>
            <div className="score-col">
              <div className="score-col-header">
                <h1>SCORE</h1>
              </div>
            </div>
            <div className="date-col">
              <div className="date-col-header">
                <h1>DATE</h1>
              </div>
            </div>
            <div className="time-col">
              <div className="time-col-header">
                <h1>TIME</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-right-container">
        <div className="piechart-container"></div>
        <div className="dashboard-right-bottom-container">
          <div className="dashboard-right-bottom-text">
            <h1>BEAT YOUR PERSONAL BEST</h1>
            <p>XXXX</p>
          </div>
          <button onClick={handlePopupToggle}>LET'S PLAY</button>
        </div>
      </div>
      {isPopupVisible && (
        <div className="popup-overlay" onClick={handlePopupToggle}></div>
      )}
      {isPopupVisible && (
        <div className="popup-window">
          <Popup />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
