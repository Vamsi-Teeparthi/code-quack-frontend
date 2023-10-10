import React, { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import ResponseScreen from './components/ResponseScreen'
import { getProfile } from '../../services/api/auth'
import ResetPassword from './components/ResetPassword'

const ProfileScreens = () => {
  const [currentScreen, setCurrentScreen] = useState("profile");
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfileHandler = () => {
    setLoading(false)
    getProfile()
      .then((res) => {
        setProfileData(res?.data?.user)
      }).catch(() => {

      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProfileHandler()
  }, [])
  return (
    <div className='main-content-page profile-screen'>
      {loading ? <div className='loading-wrapper'>Loading ...</div> :
        <>
          <SideBar setCurrentScreen={setCurrentScreen} />
          {currentScreen === "profile" ?
            <ResponseScreen profileData={profileData} /> :
            <ResetPassword />
          }
        </>}
    </div>
  )
}

export default ProfileScreens