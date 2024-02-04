import React, { useEffect, useState } from 'react'
import './Popup.css'
import { calculateScore } from '../../helpers'

const Popup = ({ setVisibility }) => {
    const [answers, setAnswer] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        let v = JSON.parse(localStorage.getItem("check"))
        setAnswer(v)

        let newScore = calculateScore(v)
        setScore(newScore)
    }, [])

    const handlePopupDone = () => {
        setVisibility(false)
    }

    return (
        <div className='popup-window'>
            <div className='popup-content'>
                <div className='popup-box' id='popup-task1'>
                    <h2>SELECT THE SMALLEST NUMBER</h2>
                </div>
                <div className='popup-box' id='popup-box-t1'>
                    <div className='popup-result-t1' id='t1-q1' style={{ backgroundColor: answers && answers.t1.q1 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t1.q1 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t1' id='t1-q2' style={{ backgroundColor: answers && answers.t1.q2 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t1.q2 ? 1 : 0}</h2>
                    </div>
                </div>
                <div className='popup-box' id='popup-task2'>
                    <h2>MATCH THE FOLLOWING</h2>
                </div>
                <div className='popup-box' id='popup-box-t2'>
                    <div className='popup-result-t2' id='t2-q1' style={{ backgroundColor: answers && answers.t2.q1 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t2.q1 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t2' id='t2-q2' style={{ backgroundColor: answers && answers.t2.q2 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t2.q2 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t2' id='t2-q3' style={{ backgroundColor: answers && answers.t2.q3 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t2.q3 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t2' id='t2-q4' style={{ backgroundColor: answers && answers.t2.q4 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t2.q4 ? 1 : 0}</h2>
                    </div>
                </div>
                <div className='popup-box' id='popup-task3'>
                    <h2>FILL IN THE BLANKS</h2>
                </div>
                <div className='popup-box' id='popup-box-t3'>
                    <div className='popup-result-t3' id='t3-q1' style={{ backgroundColor: answers && answers.t3.q1 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t3.q1 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t3' id='t3-q2' style={{ backgroundColor: answers && answers.t3.q2 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t3.q2 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t3' id='t3-q3' style={{ backgroundColor: answers && answers.t3.q3 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t3.q3 ? 1 : 0}</h2>
                    </div>
                    <div className='popup-result-t3' id='t3-q4' style={{ backgroundColor: answers && answers.t3.q4 ? '#00900E' : '#FF3F3F' }}>
                        <h2>{answers && answers.t3.q4 ? 1 : 0}</h2>
                    </div>
                </div>
            </div>
            <div className='popup-footer'>
                <div className='popup-score'><h1>YOUR SCORE: {score}/10</h1></div>
                <div className='popup-done'><button onClick={handlePopupDone}><h2>DONE</h2></button></div>
            </div>
        </div>
    )
}

export default Popup;