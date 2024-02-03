import React from 'react'
import './Popup.css'

const Popup = () => {
    return (
        <div className='popup-window'>
            <div className='popup-content'>
                <div className='popup-box' id='popup-task1'><h2>SELECT THE SMALLEST NUMBER</h2></div>
                <div className='popup-box' id='popup-box-t1'>
                    <div className='popup-result-t1' id='t1-q1'><h2>1</h2></div>
                    <div className='popup-result-t1' id='t1-q2'><h2>0</h2></div>
                </div>
                <div className='popup-box' id='popup-task2'><h2>MATCH THE FOLLOWING</h2></div>
                <div className='popup-box' id='popup-box-t2'>
                    <div className='popup-result-t2' id='t2-q1'><h2>1</h2></div>
                    <div className='popup-result-t2' id='t2-q2'><h2>1</h2></div>
                    <div className='popup-result-t2' id='t2-q3'><h2>1</h2></div>
                    <div className='popup-result-t2' id='t2-q4'><h2>1</h2></div>
                </div>
                <div className='popup-box' id='popup-task3'><h2>FILL IN THE BLANKS</h2></div>
                <div className='popup-box' id='popup-box-t3'>
                    <div className='popup-result-t3' id='t3-q1'><h2>1</h2></div>
                    <div className='popup-result-t3' id='t3-q2'><h2>1</h2></div>
                    <div className='popup-result-t3' id='t3-q3'><h2>1</h2></div>
                    <div className='popup-result-t3' id='t3-q4'><h2>1</h2></div>
                </div>
            </div>
            <div className='popup-footer'>
                <div className='popup-score'><h1>YOUR SCORE: 8/10</h1></div>
                <div className='popup-done'><button><h2>DONE</h2></button></div>
            </div>
        </div>
    )
}

export default Popup