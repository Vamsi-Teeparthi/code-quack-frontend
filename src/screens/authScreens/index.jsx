import { colors } from '@mui/material'
import React, { useState } from 'react'
import SignIn from './components/SignIn'
import Signup from './components/Signup'
import Footer from './components/Footer'
import ErrorMessages from './components/ErrorMessages'

const AuthScreens = () => {
    const [authScreen, setAuthScreen] = useState("sign-in");
    
    const [error, setError] = useState("")

    // function to switch sign in and sign up screens
    const switchAuthScreenHandler = (currentScreen) => {
        if (currentScreen === "sign-in") {
            setAuthScreen("sign-up")
        } else {
            setAuthScreen("sign-in")
        }
    }
    return (
        <div className='auth-screen-wrapper'>
            {error && <ErrorMessages message={error} setError={setError} />}
            <div className={`auth-wrapper ${authScreen}`}>
                {authScreen === "sign-in" ? <SignIn setError={setError} /> : <Signup setError={setError} setAuthScreen={setAuthScreen} />}
                <Footer authScreen={authScreen} switchAuthScreenHandler={switchAuthScreenHandler} />
            </div>
        </div>
    )
}

export default AuthScreens