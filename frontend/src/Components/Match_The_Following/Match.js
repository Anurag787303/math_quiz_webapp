import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import './Match.css'
import matchLeftImage from '../Assets/match_left.svg'
import { linedraw } from '../../helpers'
import { getCurrentExercise, logCenterPosition2 } from '../../helpers'
import { Navigate } from 'react-router-dom'

const Match = () => {
  let exercise = getCurrentExercise();
  let answers = JSON.parse(localStorage.getItem('answers'));
  let randomOrder = JSON.parse(localStorage.getItem('t2_matching'))

  const [map, setMap] = useState({})
  const [active, setActive] = useState(null)

  useEffect(() => {
    const columnA = document.querySelector('.match-column-a-columns');
    const columnB = document.querySelector('.match-column-b-columns');

    if (!exercise || !answers) return

    const optionsA = Array.from(columnA.querySelectorAll('.match-column-a-column-container')).map((e) =>
      e.querySelector('.match-column-option')
    );

    const optionsB = Array.from(columnB.querySelectorAll('.match-column-b-column-container')).map((e) =>
      e.querySelector('.match-column-option')
    );

    if (answers.t2.q1 !== null) {
      map[`q0`] = [optionsA[0], optionsB[parseInt(answers.t2.q1)]]
      logCenterPosition2(optionsA[0], optionsB[parseInt(answers.t2.q1)], 0)
    }
    if (answers.t2.q2 !== null) {
      map[`q1`] = [optionsA[1], optionsB[parseInt(answers.t2.q2)]]
      logCenterPosition2(optionsA[1], optionsB[parseInt(answers.t2.q2)], 1)
    }
    if (answers.t2.q3 !== null) {
      map[`q2`] = [optionsA[2], optionsB[parseInt(answers.t2.q3)]]
      logCenterPosition2(optionsA[2], optionsB[parseInt(answers.t2.q3)], 2)
    }
    if (answers.t2.q4 !== null) {
      map[`q3`] = [optionsA[3], optionsB[parseInt(answers.t2.q4)]]
      logCenterPosition2(optionsA[3], optionsB[parseInt(answers.t2.q4)], 3)
    }

    let newMap = { ...map }
    setMap(newMap)

  }, []);

  if (!exercise || !answers) return <Navigate to="/dashboard" />

  const removeElement = (key, element1, element2) => {
    const parentElement1 = element1.parentNode;
    const textElement1 = parentElement1.querySelector('.match-column-a-column-text') || parentElement1.querySelector('.match-column-b-column-text');

    const parentElement2 = element2.parentNode;
    const textElement2 = parentElement2.querySelector('.match-column-a-column-text') || parentElement2.querySelector('.match-column-b-column-text');

    element1.classList.remove(key)
    textElement1.classList.remove(key)

    element2.classList.remove(key)
    textElement2.classList.remove(key)

    const matchLines = document.querySelectorAll('.match-line')
    matchLines.forEach(line => {
      if (line.classList.contains(key)) {
        line.remove()
      }
    });
  }

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
        removeElement(key, map[key][0], map[key][1])
        answers.t2[`q${parseInt(key[1]) + 1}`] = null;
        localStorage.setItem("answers", JSON.stringify(answers))
        delete map[key]
        if (active !== null) {
          active.option.classList.remove(`q${active.q}`)
          setActive(null)
        }
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
        element.classList.add(`q${q}`)

        setActive({
          option: element,
          class: parentClass,
          text: textElement,
          q: q,
          x: centerX,
          y: centerY
        })

      } else {
        if (parentClass < active.class) {
          linedraw(centerX, centerY, active.x, active.y, q)
          active.option.classList.remove(`q${active.q}`)
          active.option.classList.add(`q${q}`)
          textElement.classList.add(`q${q}`)
          element.classList.add(`q${q}`)
          active.text.classList.add(`q${q}`)
          map[`q${q}`] = [element, active.option]

          answers.t2[`q${q + 1}`] = active.q
        } else {
          linedraw(active.x, active.y, centerX, centerY, active.q)
          active.option.classList.add(`q${active.q}`)
          element.classList.add(`q${active.q}`)
          textElement.classList.add(`q${active.q}`)
          active.text.classList.add(`q${active.q}`)
          map[`q${active.q}`] = [active.option, element]
          answers.t2[`q${active.q + 1}`] = q
        }

        let newMap = { ...map }
        localStorage.setItem("answers", JSON.stringify(answers))

        setActive(null)
        setMap(newMap)
      }
    }
  };

  const logCenterPosition2 = (element1, element2, q) => {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    const centerX1 = rect1.left + rect1.width / 2;
    const centerY1 = rect1.top + rect1.height / 2;
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;

    const parentElement1 = element1.parentNode;
    const textElement1 = parentElement1.querySelector('.match-column-a-column-text') || parentElement1.querySelector('.match-column-b-column-text');

    const parentElement2 = element2.parentNode;
    const textElement2 = parentElement2.querySelector('.match-column-a-column-text') || parentElement2.querySelector('.match-column-b-column-text');

    element1.classList.add(`q${q}`)
    textElement1.classList.add(`q${q}`)

    element2.classList.add(`q${q}`)
    textElement2.classList.add(`q${q}`)

    linedraw(centerX1, centerY1, centerX2, centerY2, q);
  };

  return (
    <Layout activityName={"MATCH THE FOLLOWING"} taskNumber={2}>
      <div className='question-body'>
        <div className='match-column-a'>
          <div className='match-column-a-header'>
            <h1>COLUMN A</h1>
          </div>
          <div className='match-column-a-columns'>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>{exercise.t2.q1}</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 0)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>{exercise.t2.q2}</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>{exercise.t2.q3}</h1>
              </div>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 2)}>
              </div>
            </div>
            <div className='match-column-a-column-container'>
              <div className='match-column-a-column-text'>
                <h1>{exercise.t2.q4}</h1>
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
                <h1>{randomOrder[0]}</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 1)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>{randomOrder[1]}</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 2)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>{randomOrder[2]}</h1>
              </div>
            </div>
            <div className='match-column-b-column-container'>
              <div className='match-column-option' onClick={(event) => logCenterPosition(event, 3)}>
              </div>
              <div className='match-column-b-column-text'>
                <h1>{randomOrder[3]}</h1>
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