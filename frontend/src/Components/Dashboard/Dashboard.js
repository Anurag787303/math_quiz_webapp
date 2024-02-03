import React, { useState } from 'react';
import "./Dashboard.css";
import dashboardImage from "../Assets/dashboard_image.svg";

const Dashboard = () => {
  // State to control the visibility of the popup
  const [showPopup, setShowPopup] = useState(true);

  // Function to hide the popup
  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='dashboard-container'>
      {showPopup && (
        <div className="dashboard-popup">
          <div className="popup-content">
            <span className="close" onClick={hidePopup}>&times;</span>
            <div className='taskname' id='select'>SELECT THE SMALLEST NUMBER</div>
            <div className='answer-list-select'>
              <div className='answer_select' id='first'></div>
              <div className='answer_select' id='second'></div>
            </div>
            <div className='taskname' id='match'>MATCH</div>
              <div className='answer-list-match'>
                <div className='answer_match' id='first'></div>
                <div className='answer_match' id='second'></div>
                <div className='answer_match' id='third'></div>
                <div className='answer_match' id='fourth'></div>
              </div>
            <div className='taskname' id='fill'>FILL</div>
              <div className='answer-list-fill'>
                <div className='answer_fill' id='first'></div>
                <div className='answer_fill' id='second'></div>
                <div className='answer_fill' id='third'></div>
                <div className='answer_fill' id='fourth'></div>
              </div>

            <button onClick={hidePopup}>Close Popup</button>
          </div>
        </div>
      )}
      {!showPopup && (
        <>
          <div className='dashboard-left-container'>
            <div className='dashboard-image-container'>
              <div className='dashboard-image'>
                <img src={dashboardImage} alt="dashboard" />
              </div>
              <div className='dashboard-image-title'>
                <h1>@nameishere</h1>
              </div>
            </div>
            <div className='dashboard-table-container'>
              <div className='dashboard-table'>
                <div className='run-col'>
                  <div className='run-col-header'>
                    <h1>RUN</h1>
                  </div>
                </div>
                <div className='score-col'>
                  <div className='score-col-header'>
                    <h1>SCORE</h1>
                  </div>
                </div>
                <div className='date-col'>
                  <div className='date-col-header'>
                    <h1>DATE</h1>
                  </div>
                </div>
                <div className='time-col'>
                  <div className='time-col-header'>
                    <h1>TIME</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='dashboard-right-container'>
            <div className='piechart-container'></div>
            <div className='dashboard-right-bottom-container'>
              <div className='dashboard-right-bottom-text'>
                <h1>BEAT YOUR PERSONAL BEST</h1>
                <p>XXXX</p>
              </div>
              <button>
                LET'S PLAY
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
