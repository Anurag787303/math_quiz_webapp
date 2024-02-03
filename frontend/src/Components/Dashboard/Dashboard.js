import React, { useEffect } from 'react'
import "./Dashboard.css"
import dashboardImage from "../Assets/dashboard_image.svg"
import { generateRandomExercise, getRandomOrder } from '../../helpers/index.js'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const handlePlayButton = () => {
    const exercise = generateRandomExercise()
    localStorage.setItem('exercise', JSON.stringify(exercise))
    localStorage.setItem('t2_matching', JSON.stringify(getRandomOrder([exercise.answers.t2.q1, exercise.answers.t2.q2, exercise.answers.t2.q3, exercise.answers.t2.q4])))
    localStorage.setItem('answers', JSON.stringify({
      t1: {
        q1: null,
        q2: null,
      },
      t2: {
        q1: null,
        q2: null,
        q3: null,
        q4: null
      },
      t3: {
        q1: null,
        q2: null,
        q3: null,
        q4: null
      }
    }))
    navigate('/select')
  }

  let checkAnswers = null;

  useEffect(() => {
    let popupShow = localStorage.getItem('popup')
    let answers = JSON.parse(localStorage.getItem("answers"))
    let exercise = JSON.parse(localStorage.getItem("exercise"))
    let matching = JSON.parse(localStorage.getItem("t2_matching"))

    console.log(exercise.answers.t2.q1, matching[parseInt(answers.t2.q1)])
    console.log(exercise.answers.t3.q4, parseInt(answers.t3.q4))
    console.log((answers.t2.q1 ? matching[answers.t2.q1] : false))

    if (popupShow) {
      checkAnswers = {
        t1: {
          q1: parseInt(exercise.answers.t1.q1) === (answers.t1.q1 !== null ? parseInt(answers.t1.q1[1]) : false),
          q2: parseInt(exercise.answers.t1.q2) === (answers.t1.q2 !== null ? parseInt(answers.t1.q2[1]) : false)
        },
        t2: {
          q1: exercise.answers.t2.q1 === (answers.t2.q1 !== null ? matching[answers.t2.q1] : false),
          q2: exercise.answers.t2.q2 === (answers.t2.q2 !== null ? matching[answers.t2.q2] : false),
          q3: exercise.answers.t2.q3 === (answers.t2.q3 !== null ? matching[answers.t2.q3] : false),
          q4: exercise.answers.t2.q4 === (answers.t2.q4 !== null ? matching[answers.t2.q4] : false)
        },
        t3: {
          q1: parseInt(exercise.answers.t3.q1) === (answers.t3.q1 !== null && answers.t3.q1 !== "" ? parseInt(answers.t3.q1) : false),
          q2: parseInt(exercise.answers.t3.q2) === (answers.t3.q2 !== null && answers.t3.q2 !== "" ? parseInt(answers.t3.q2) : false),
          q3: parseInt(exercise.answers.t3.q3) === (answers.t3.q3 !== null && answers.t3.q3 !== "" ? parseInt(answers.t3.q3) : false),
          q4: parseInt(exercise.answers.t3.q4) === (answers.t3.q4 !== null && answers.t3.q4 !== "" ? parseInt(answers.t3.q4) : false)
        }
      };

      console.log(checkAnswers)
    }
  }, [])

  return (
    <div className='dashboard-container'>
      <div className='dashboard-left-container'>
        <div className='dashboard-image-container'>
          <div className='dashboard-image'>
            <img src={dashboardImage} />
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
        <div className='piechart-container'>

        </div>
        <div className='dashboard-right-bottom-container'>
          <div className='dashboard-right-bottom-text'>
            <h1>BEAT YOUR PERSONAL BEST</h1>
            <p>XXXX</p>
          </div>
          <button onClick={handlePlayButton}>
            LET'S PLAY
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard