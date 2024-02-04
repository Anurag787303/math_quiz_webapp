import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Fill.css'
import fillLeftImage from '../Assets/Fill_left.svg'
import { getCurrentExercise } from '../../helpers'
import { isAuth } from '../../helpers/auth'
import { Navigate, useNavigate } from 'react-router-dom'

const Fill = () => {
  let exercise = getCurrentExercise();
  let answers = JSON.parse(localStorage.getItem('answers'));
  const navigate = useNavigate();

  const [t3, setT3] = useState({
    q1: (answers && answers.t3.q1) || "",
    q2: (answers && answers.t3.q2) || "",
    q3: (answers && answers.t3.q3) || "",
    q4: (answers && answers.t3.q4) || ""
  })

  if (!exercise || !answers) {
    return <Navigate to="/dashboard" />
  }

  const handleInputChange = (key, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) && value != "" && value != "-") return

    value = (isNaN(parsedValue) ? value : parsedValue)

    setT3(t3 => ({
      ...t3,
      [key]: value
    }));

    answers.t3 = {
      ...t3,
      [key]: value
    }
    localStorage.setItem('answers', JSON.stringify(answers))
  }

  return ( //Write the html here
    isAuth() ? (<Layout activityName={"FILL IN THE BLANKS"} taskNumber={3}>
      <div className='fill-body'>

        <div className='fill-image-left'><img src={fillLeftImage} /></div>

        <div className='content-center'>
          <div className='problem-boxes'>
            <div className='problem-container'>
              <h1>{exercise.t3.q1}</h1>
            </div>
            <div className='problem-container'>
              <h1>{exercise.t3.q2}</h1>
            </div>
            <div className='problem-container'>
              <h1>{exercise.t3.q3}</h1>
            </div>
            <div className='problem-container'>
              <h1>{exercise.t3.q4}</h1>
            </div>
          </div>
          <div className='equal-boxes'>
            <div className='equal-container'>
              <h1>=</h1>
            </div>
            <div className='equal-container'>
              <h1>=</h1>
            </div>
            <div className='equal-container'>
              <h1>=</h1>
            </div>
            <div className='equal-container'>
              <h1>=</h1>
            </div>
          </div>
          <div className='asnwer-boxes'>
            <div className='answer-container'>
              <input type='text' onChange={(e) => handleInputChange('q1', e.target.value)} value={t3.q1} />
            </div>
            <div className='answer-container'>
              <input type='text' onChange={(e) => handleInputChange('q2', e.target.value)} value={t3.q2} />
            </div>
            <div className='answer-container'>
              <input type='text' onChange={(e) => handleInputChange('q3', e.target.value)} value={t3.q3} />
            </div>
            <div className='answer-container'>
              <input type='text' onChange={(e) => handleInputChange('q4', e.target.value)} value={t3.q4} />
            </div>
          </div>
        </div>
      </div>
    </Layout>) : <Navigate to="login" />
  )
}

export default Fill