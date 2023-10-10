import { Person } from '@mui/icons-material'
import React from 'react'

const ResponseScreen = ({ profileData }) => {
    return (
        <div className='response-screen'>
            <Person />
            <div className="profile-details">
                <div className="each-profile-details">
                    {profileData?.name}
                </div>
                <div className="each-profile-details">
                    {profileData?.email}
                </div>
                <div className="each-profile-details">
                    {profileData?.gender}
                </div>
            </div>
        </div>
    )
}

export default ResponseScreen