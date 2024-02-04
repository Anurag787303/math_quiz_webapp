import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import dashboardImage from "../Assets/dashboard_image.svg";
import Popup from "../Popup/Popup";
import {
  calculateScore,
  calculateSpecificScores,
  changeDurationFormat,
  changeTimeFormat,
  generateRandomExercise,
  getRandomOrder,
} from "../../helpers/index.js";
import { Navigate, useNavigate } from "react-router-dom";
import { signout, isAuth } from "../../helpers/auth.js";
import PieChart from "../PieChart/PieChart.js";

const Dashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [runs, setRuns] = useState([]);
  const [name, setName] = useState("");
  const [numRuns, setNumRuns] = useState(0);

  const navigate = useNavigate();

  const handleLogoutButton = () => {
    signout(() => {
      navigate("/login");
    });
  };

  const addRun = async (answers, time_taken, submittedAt, score, userId, specificAnswers) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/backend-api/run`; // Define the route for adding a run

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers,
        time_taken,
        submittedAt,
        score,
        userId,
        createdAt: Date.now(),
        specificAnswers
      }),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    await getRuns(userId);
  };

  const getRuns = async (userId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/backend-api/runs?userId=${userId}`; // Define the route for fetching runs
    const response = await fetch(url);
    const data = await response.json();
    setRuns(data.runs.slice(0, 10));
    setNumRuns(data.runs.length);
    if (data.runs.length) {
      setSpecificAnswers(data.runs[0].specificAnswers)
      localStorage.setItem("specific_answers", JSON.stringify(data.runs[0].specificAnswers))
    }
  };

  const handlePlayButton = () => {
    localStorage.setItem("start_time", JSON.parse(Date.now()));
    const exercise = generateRandomExercise();
    localStorage.setItem("exercise", JSON.stringify(exercise));
    localStorage.setItem(
      "t2_matching",
      JSON.stringify(
        getRandomOrder([
          exercise.answers.t2.q1,
          exercise.answers.t2.q2,
          exercise.answers.t2.q3,
          exercise.answers.t2.q4,
        ])
      )
    );
    localStorage.setItem(
      "answers",
      JSON.stringify({
        t1: {
          q1: null,
          q2: null,
        },
        t2: {
          q1: null,
          q2: null,
          q3: null,
          q4: null,
        },
        t3: {
          q1: null,
          q2: null,
          q3: null,
          q4: null,
        },
      })
    );
    navigate("/select");
  };

  let checkAnswers = null;
  const [specificAnswers, setSpecificAnswers] = useState({
    correct: 0,
    incorrect: 0,
    unattempted: 0,
  });

  useEffect(() => {
    let user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    let popupShow = localStorage.getItem("popup");
    let answers = JSON.parse(localStorage.getItem("answers"));
    let exercise = JSON.parse(localStorage.getItem("exercise"));
    let matching = JSON.parse(localStorage.getItem("t2_matching"));

    setName(user["name"]);
    getRuns(user["_id"]);

    if (popupShow) {
      checkAnswers = {
        t1: {
          q1:
            parseInt(exercise.answers.t1.q1) ===
            (answers.t1.q1 !== null ? parseInt(answers.t1.q1[1]) : false),
          q2:
            parseInt(exercise.answers.t1.q2) ===
            (answers.t1.q2 !== null ? parseInt(answers.t1.q2[1]) : false),
        },
        t2: {
          q1:
            exercise.answers.t2.q1 ===
            (answers.t2.q1 !== null ? matching[answers.t2.q1] : false),
          q2:
            exercise.answers.t2.q2 ===
            (answers.t2.q2 !== null ? matching[answers.t2.q2] : false),
          q3:
            exercise.answers.t2.q3 ===
            (answers.t2.q3 !== null ? matching[answers.t2.q3] : false),
          q4:
            exercise.answers.t2.q4 ===
            (answers.t2.q4 !== null ? matching[answers.t2.q4] : false),
        },
        t3: {
          q1:
            parseInt(exercise.answers.t3.q1) ===
            (answers.t3.q1 !== null && answers.t3.q1 !== ""
              ? parseInt(answers.t3.q1)
              : false),
          q2:
            parseInt(exercise.answers.t3.q2) ===
            (answers.t3.q2 !== null && answers.t3.q2 !== ""
              ? parseInt(answers.t3.q2)
              : false),
          q3:
            parseInt(exercise.answers.t3.q3) ===
            (answers.t3.q3 !== null && answers.t3.q3 !== ""
              ? parseInt(answers.t3.q3)
              : false),
          q4:
            parseInt(exercise.answers.t3.q4) ===
            (answers.t3.q4 !== null && answers.t3.q4 !== ""
              ? parseInt(answers.t3.q4)
              : false),
        },
      };

      let newSpecificScores = calculateSpecificScores(
        answers,
        exercise.answers,
        matching
      )

      localStorage.setItem(
        "specific_answers",
        JSON.stringify(newSpecificScores)
      )

      setSpecificAnswers(newSpecificScores)

      if (popupShow) {
        setPopupVisible(true);
        let start_time = JSON.parse(localStorage.getItem("start_time"));
        let end_time = JSON.parse(localStorage.getItem("end_time"));
        let duration = end_time - start_time;
        let score = calculateScore(checkAnswers);

        let durationString = changeDurationFormat(duration);
        let dateString = changeTimeFormat(Date.now());
        let userId = user["_id"];
        addRun(checkAnswers, durationString, dateString, score, userId, newSpecificScores);
      }

      localStorage.removeItem("popup");
      localStorage.removeItem("answers");
      localStorage.removeItem("exercise");
      localStorage.removeItem("start_time");
      localStorage.removeItem("remove_time");
      localStorage.setItem("check", JSON.stringify(checkAnswers));
    }
  }, [checkAnswers]);

  return isAuth() ? (
    isPopupVisible ? (
      <div className="dashboard-container">
        {isPopupVisible && <div className="popup-overlay"></div>}
        {isPopupVisible && (
          <div className="popup-window" answers={checkAnswers}>
            <Popup setVisibility={setPopupVisible} />
          </div>
        )}
      </div>
    ) : (
      <div className="dashboard-container">
        <div className="layout-logout-button" onClick={handleLogoutButton}>
          <button>Logout</button>
        </div>
        <div className="dashboard-left-container">
          <div className="dashboard-image-container">
            <div className="dashboard-image">
              <img src={dashboardImage} />
            </div>
            <div className="dashboard-image-title">
              <h1>@{name}</h1>
            </div>
          </div>
          <div className="dashboard-table-container">
            <div className="dashboard-table">
              <div className="run-col">
                <div className="run-col-header">
                  <h1>RUN</h1>
                </div>
                <div className="run-col-elements">
                  {runs && runs.map((run, index) => <h1>{index + 1}</h1>)}
                </div>
              </div>
              <div className="score-col">
                <div className="score-col-header">
                  <h1>SCORE</h1>
                </div>
                <div className="score-col-elements">
                  {runs && runs.map((run) => <h1>{run.score}</h1>)}
                </div>
              </div>
              <div className="date-col">
                <div className="date-col-header">
                  <h1>DATE</h1>
                </div>
                <div className="date-col-elements">
                  {runs && runs.map((run) => <h1>{run.submittedAt}</h1>)}
                </div>
              </div>
              <div className="time-col">
                <div className="time-col-header">
                  <h1>TIME</h1>
                </div>
                <div className="time-col-elements">
                  {runs && runs.map((run) => <h1>{run.time_taken}</h1>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-right-container">
          <div className="piechart-container">
            {numRuns ? <PieChart /> : <h1>PLAY YOUR FIRST GAME</h1>}
          </div>
          <div className="dashboard-right-bottom-container">
            <div className="dashboard-right-bottom-text">
              <h1>Total Runs</h1>
              <p>{numRuns}</p>
            </div>
            <button onClick={handlePlayButton}>LET'S PLAY</button>
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
