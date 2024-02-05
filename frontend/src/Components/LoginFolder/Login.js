import React, { useState } from 'react';
import './Login.css';
import user_icon from '../Assets/user_icon_black-login.PNG';
import lock_icon from '../Assets/lock_icon_black-login.PNG';
import user_logo from '../Assets/user_icon_grey-login.PNG';
import { authenticate, isAuth } from '../../helpers/auth.js'
import { Navigate, useNavigate } from "react-router-dom"
import { useAlert } from 'react-alert';

const Login = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const handleLoginButton = async () => {
        const response = await fetch(`https://math-quiz-webapp-qr15.vercel.app/backend-api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        });

        const data = await response.json()
        if (data.success) {
            authenticate(data, () => {
                navigate('/dashboard')
            })
        } else {
            alert.show(data.message)
        }
    }

    const handleRegisterButton = async () => {
        const response = await fetch(`https://math-quiz-webapp-qr15.vercel.app/backend-api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        });

        const data = await response.json()
        if (data.success) {
            authenticate(data, () => {
                navigate("/dashboard")
            })
        } else {
            alert.show(data.message)
        }
    }

    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        isAuth() ? <Navigate to="/dashboard" /> : (
            <div className='outer-image-container'>
                <div className='outer'>
                    <div className='wrapper'>
                        <div className='image-wrapper'>
                            <div id='user-icon'><img src={user_logo} alt='User Logo' /></div>
                        </div>

                        <div className='container'>
                            <div className='title'>
                                {action === "Login" ? <h1>Login</h1> : <h1>New User</h1>}
                            </div>
                            <div className='inputs'>

                                <div className='input' id='username'>
                                    <div id='user-logo'><img src={user_icon} alt='User Icon' /></div>
                                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}></input>
                                </div>

                                <div className='input' id='password'>
                                    <div id='lock-logo'><img src={lock_icon} alt='Lock Icon' /></div>
                                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>

                                <div id='button' onClick={action === "Login" ? handleLoginButton : handleRegisterButton}>
                                    {action === "Login" ? <button className='Login' >Sign In</button> : <button className='SignUp'>Sign Up</button>}
                                </div>
                            </div>
                        </div>

                        <div className='options'>
                            {action === "Login" ?
                                <div className="on-login-page" onClick={() => { setAction("Sign Up") }}><p>New user? Sign up</p></div> :
                                <div className="on-signup-page" onClick={() => { setAction("Login") }}><p>Already have an account? Login</p></div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    );
};

export default Login