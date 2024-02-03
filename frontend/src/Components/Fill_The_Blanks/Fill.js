import React from 'react'
import Layout from '../Layout/Layout'
import './Fill.css'
import fillLeftImage from '../Assets/Fill_left.svg'

const Fill = () => {
  return ( //Write the html here
    <Layout>
      <div className='fill-body'>

        <div className='fill-image-left'><img src={fillLeftImage} /></div>

        <div className='content-center'>
          <div className='problem-boxes'>
            <div className='problem-container'>
              <h1>222 + 333</h1>
            </div>
            <div className='problem-container'>
              <h1>2 + 3</h1>
            </div>
            <div className='problem-container'>
              <h1>2 + 3</h1>
            </div>
            <div className='problem-container'>
              <h1>2 + 3</h1>
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
              <input type='number'></input>
            </div>
            <div className='answer-container'>
              <input type='number'></input>
            </div>
            <div className='answer-container'>
              <input type='number'></input>
            </div>
            <div className='answer-container'>
              <input type='number'></input>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Fill