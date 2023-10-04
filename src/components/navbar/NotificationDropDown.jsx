import React, { useState } from 'react'

const NotificationDropDown = () => {
  const [notifications, setNotifications] = useState(["ss", "dsfsd", "sdffdf"]);
  const [loading, setLoading] = useState(false);
  return (
    <div className='profile-drop-down notification-drop-down'>
      <div className="notification-header-wrap">
        <div className="header-name">Notifications</div>
      </div>
      <div className="notification-data-display">
        {loading ? <div className='loading-wrapper'>Loading ...</div> :
          notifications?.length === 0 ? <div className='loading-wrapper'>You don't have any notifications</div> :
            notifications?.map((each) => (
              <div className="each-notification">
                <div className="title-date">
                  <span className="title">Title Name</span>
                  <span className="date">Tue, 12:30 pm</span>
                </div>
                <div className="description">New java programming language is uploaded. Please go to home page to check the video</div>
              </div>
            ))

        }
      </div>
    </div>
  )
}

export default NotificationDropDown