import React from 'react'

const SideBar = ({setCurrentScreen}) => {
    return (
        <div className="side-bar">
            <div onClick={() => {setCurrentScreen("profile")}} className="each-side-item">Profile</div>
            <div onClick={() => {setCurrentScreen("reset-password")}} className="each-side-item">Reset Password</div>
        </div>
    )
}

export default SideBar