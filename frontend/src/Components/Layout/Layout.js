import React from 'react'
import './Layout.css'

const Layout = ({ children }) => {
    return (
        <div className="question-container">
            <div className='question-info-container'>
                <div className='question-info'>
                    <div className='question-info-no'>
                        <h1>TASK X</h1>
                    </div>
                    <div className='question-info-text'>
                        <h1>NAME OF THE ACTIVITY</h1>
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
                    <div className='prev-arrow-icon'>
                        <h1>PREV</h1>
                    </div>
                    <div className='question-navigation-elements'>
                        <div className='question-navigation-element'>

                        </div>
                        <div className='question-navigation-element'>

                        </div>
                        <div className='question-navigation-element'>

                        </div>
                    </div>
                    <div className='next-arrow-icon'>
                        <h1>NEXT</h1>
                    </div>
                </div>
                <div className='layout-submit-button'>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Layout