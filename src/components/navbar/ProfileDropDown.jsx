import { Logout, Person } from '@mui/icons-material'
import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router'

const ProfileDropDown = ({setProfile}) => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        Cookies.remove("token")
        navigate("/login")
        setProfile(false)
    }
  return (
    <div className='profile-drop-down'>
        <span onClick={() => navigate()} className="each-link"><Person/> Profile</span>
        <span onClick={() => {logoutHandler()}} className="each-link"><Logout/> Logout</span>
    </div>
  )
}

export default ProfileDropDown