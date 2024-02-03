import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Match.css'
import matchLeftImage from '../Assets/match_left.svg'
import { linedraw } from '../../helpers'

const Match = () => {
  const [map, setMap] = useState({})

  const [active, setActive] = useState(null)

  const logCenterPosition = (event, q) => {
    event.preventDefault();

    const element = event.target;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const parentElement = element.parentNode;
    const parentClass = parentElement.classList.item(0);
    const textElement = parentElement.querySelector('.match-column-a-column-text') || parentElement.querySelector('.match-column-b-column-text');

    for (let key in map) {
      if (map[key].includes(element)) {
        console.log("Already assigned")
        return
      }
    }

    if (active === null) {
      setActive({
        option: element,
        class: parentClass,
        text: textElement,
        q: q,
        x: centerX,
        y: centerY
      })

      element.classList.add(`q${q}`)
    } else {
      if (active.class === parentClass) {
        active.option.classList.remove(`q${active.q}`)
        setActive({
          option: element,
          class: parentClass,
          q: q,
          x: centerX,
          y: centerY
        })

        element.classList.add(`q${q}`)
      } else {
        if (parentClass < active.class) {
          linedraw(centerX, centerY, active.x, active.y, q)
          active.option.classList.remove(`q${active.q}`)
          active.option.classList.add(`q${q}`)
          textElement.classList.add(`q${q}`)
          element.classList.add(`q${q}`)
          active.text.classList.add(`q${q}`)
          map[`q${q}`] = [element, active.option]
        } else {
          linedraw(active.x, active.y, centerX, centerY, active.q)
          active.option.classList.add(`q${active.q}`)
          element.classList.add(`q${active.q}`)
          textElement.classList.add(`q${active.q}`)
          active.text.classList.add(`q${active.q}`)
          map[`q${active.q}`] = [active.option, element]
        }

        let newMap = { ...map }

        setActive(null)
        setMap(newMap)
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
                <h1>5 - 4</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>5 * 2</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 2)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>9 / 3</h1>
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
                <h1>3</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>1</h1>
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
                <h1>10</h1>
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