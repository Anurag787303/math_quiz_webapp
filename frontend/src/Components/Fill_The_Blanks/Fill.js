import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Fill.css'
import fillLeftImage from '../Assets/Fill_left.svg'
import { getCurrentExercise } from '../../helpers'

const Fill = () => {
  let exercise = getCurrentExercise();
  let answers = JSON.parse(localStorage.getItem('answers'));

  const [t3, setT3] = useState({
    q1: answers.t3.q1,
    q2: answers.t3.q2,
    q3: answers.t3.q3,
    q4: answers.t3.q4
  })

  const handleInputChange = (key, value) => {
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
    <Layout activityName={"FILL IN THE BLANKS"} taskNumber={3}>
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
              <input type='number' onChange={(e) => handleInputChange('q1', e.target.value)} value={t3.q1}></input>
            </div>
            <div className='answer-container'>
              <input type='number' onChange={(e) => handleInputChange('q2', e.target.value)} value={t3.q2}></input>
            </div>
            <div className='answer-container'>
              <input type='number' onChange={(e) => handleInputChange('q3', e.target.value)} value={t3.q3}></input>
            </div>
            <div className='answer-container'>
              <input type='number' onChange={(e) => handleInputChange('q4', e.target.value)} value={t3.q4}></input>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Fill