import { AccountCircle, Code, NotificationAddRounded, Notifications } from '@mui/icons-material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ProfileDropDown from './ProfileDropDown'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import NotificationDropDown from './NotificationDropDown';

const NavBar = () => {
    const [profile, setProfile] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const navigate = useNavigate()
    const navigateTo = (url) => {
        setProfile(false)
        setNotificationOpen(false)
        navigate(url)
    }

    const token = Cookies.get("token")
    let role = "user"
    if (token) {

        const decoded = jwt_decode(token);
        if (decoded?.role === "admin") {
            role = "admin"
        }
    }
    return (
        <div className='navbar-wrapper'>
            <div className="navbar-logo-wrapper">
                <Code />
                <span className="navbar-company-name">CodeQuack</span>
            </div>

            <div className="navbar-menu-items-wrapper">

                {role === "admin" ?
                    <>
                        <span onClick={() => navigateTo("/videos")} className="each-menu-item">Videos</span>
                        <span onClick={() => navigateTo("/upload")} className="each-menu-item">Upload</span>
                        <span onClick={() => navigateTo("/requests")} className="each-menu-item">Requests</span>
                    </> :
                    <>
                        <span onClick={() => navigateTo("/")} className="each-menu-item">Home</span>
                        <span onClick={() => navigateTo("/request")} className="each-menu-item">Request Videos</span>
                        <span onClick={() => navigateTo("/feedback")} className="each-menu-item">Feedback</span>
                        <span onClick={() => navigateTo("/favorites")} className="each-menu-item">Favorites</span>
                    </>}
                {token ?
                    <>
                        <span onClick={() => {setProfile(false);setNotificationOpen(!notificationOpen);}} className="each-menu-item"><Notifications />
                            {notificationOpen &&
                                <NotificationDropDown />
                            }
                        </span>
                        <span onClick={() => {setProfile(!profile); setNotificationOpen(false)}} className="each-menu-item"><AccountCircle />
                            {profile &&
                                <ProfileDropDown setProfile={setProfile} />
                            }
                        </span>
                    </>
                    :
                    <span onClick={() => navigateTo("/login")} className="each-menu-item">Login</span>
                }
            </div>
        </div>
    )
}

export default NavBar