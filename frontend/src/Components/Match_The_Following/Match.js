import React from 'react'
import Layout from '../Layout/Layout'
import './Match.css'
import matchLeftImage from '../Assets/match_left.svg'

const Match = () => {
  return (
    <Layout>
      <div className='question-body'>
        <div className='match-column-a'>
          <div className='match-column-a-header'>
            <h1>COLUMN A</h1>
          </div>
          <div className='match-column-a-columns'>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>3 + 4</h1>
              </div>
              <div className='match-column-option'>
              </div>
            </div>
          </div>
        </div>
        <div className='match-column-b'>
          <div className='match-column-b-header'>
            <h1>COLUMN B</h1>
          </div>
          <div className='match-column-b-columns'>
            <div className='match-column-b-column-container'>
              <div className='match-column-option'>
              </div>
              <div className='match-column-b-column-text'>
                <h1>7</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='match-left-image'>
          <img src={matchLeftImage} />
        </div>
      </div>
    </Layout>
  )
}

export default Match