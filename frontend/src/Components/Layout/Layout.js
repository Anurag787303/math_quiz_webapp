import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Layout.css'
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, activityName, taskNumber }) => {

    const [isLeftMost, setLeftMost] = useState(taskNumber === 1);
    const [isRightMost, setRightMost] = useState(taskNumber === 3);

    let myMap = new Map();
    myMap.set(1, "/select");
    myMap.set(2, "/match");
    myMap.set(3, "/fill");
    const navigate = useNavigate();

    const handlePreviousButton = () => {
        navigate(myMap.get(taskNumber - 1))
    }
    const handleNextButton = () => {
        navigate(myMap.get(taskNumber + 1))
    }

    const handleSubmitButton = () => {
        localStorage.setItem('popup', true)
        navigate("/dashboard")
    }

    return (
        <div className="question-container">
            <div className='question-info-container'>
                <div className='question-info'>
                    <div className='question-info-no'>
                        <h1>TASK {taskNumber}</h1>
                    </div>
                    <div className='question-info-text'>
                        <h1>{activityName}</h1>
                    </div>
                </div>
                <div className='layout-logout-button'>
                    <button>Logout</button>
                </div>
            </div>
            <div className='question-body-container'>
                {children}
            </div>
            <div className='question-navigation-container'>
                <div className='question-navigation'>
                    <div className='prev-arrow-icon' style={{ visibility: isLeftMost ? 'hidden' : 'visible' }} onClick={handlePreviousButton}>
                        <h1>PREV</h1>
                    </div>
                    <div className='question-navigation-element'>
                        <Link to="/select"><h1>Q.1</h1></Link>
                    </div>
                    <div className='question-navigation-element'>
                        <Link to="/match"><h1>Q.2</h1></Link>
                    </div>
                    <div className='question-navigation-element'>
                        <Link to="/fill"><h1>Q.3</h1></Link>
                    </div>
                    <div className='next-arrow-icon' style={{ visibility: isRightMost ? 'hidden' : 'visible' }} onClick={handleNextButton}>
                        <h1>NEXT</h1>
                    </div>
                </div>
                <div className='layout-submit-button'>
                    <button onClick={handleSubmitButton}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Layout