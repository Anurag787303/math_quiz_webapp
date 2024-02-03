import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Match.css'
import matchLeftImage from '../Assets/match_left.svg'
import { linedraw } from '../../helpers'

const Match = () => {
  const [map, setMap] = useState([null, null, null, null])

  const [active, setActive] = useState(null)

  const logCenterPosition = (event, q) => {
    event.preventDefault();

    const element = event.target;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const parentElement = element.parentNode;
    const parentClass = parentElement.classList.item(0);

    console.log("active:", active)

    if (active === null) {
      setActive({
        option: element,
        class: parentClass,
        q: q,
        x: centerX,
        y: centerY
      })
    } else {
      if (active.class === parentClass) {
        setActive({
          option: element,
          class: parentClass,
          q: q,
          x: centerX,
          y: centerY
        })
      } else {
        if (parentClass < active.class) {
          linedraw(centerX, centerY, active.x, active.y, q)
        } else {
          linedraw(active.x, active.y, centerX, centerY, q)
        }

        setActive(null)
        active.option.classList.add(`q${q}`)
        element.classList.add(`q${q}`)
      }
    }
  };

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
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 0)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>3 + 4</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>3 + 4</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 2)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>3 + 4</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 3)}>
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
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 0)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>7</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>7</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 2)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>7</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 3)}>
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