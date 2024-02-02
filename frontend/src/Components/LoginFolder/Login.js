import React, { useState } from 'react';
import './Login.css';
import user_icon from '../Assets/user_icon_black-login.PNG';
import lock_icon from '../Assets/lock_icon_black-login.PNG';
import user_logo from '../Assets/user_icon_grey-login.PNG';

const Login = () => {
    return (
        <div className='outer-image-container'>
            <div className='outer'>
                <div className='wrapper'>
                    <div className='image-wrapper'>
                        <div id='user-icon'><img src={user_logo} alt='User Logo' /></div>
                    </div>

                    <div className='container'>
                        <div className='title'>
                            <h1>Login</h1>
                        </div>
                        <div className='inputs'>

                            <div className='input' id='username'>
                                <div id='user-logo'><img src={user_icon} alt='User Icon' /></div>
                                <input type="text" placeholder='Username'></input>
                            </div>

                            <div className='input' id='password'>
                                <div id='lock-logo'><img src={lock_icon} alt='Lock Icon' /></div>
                                <input type="password" placeholder='Password'></input>
                            </div>

                            <div id='button'>
                                <button className='Login'>Sign In</button>
                            </div>
                        </div>
                    </div>

                    <div className='forgot'>
                        <a href=''>Forgot your password?</a>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Login