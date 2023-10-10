import React, { useEffect, useState } from 'react'
import { getNotifications } from '../../services/api/videos';
import { timeFormat } from '../../utils/timeFormat';

const NotificationDropDown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotificationsHandler = () => {
    setLoading(true)
    getNotifications()
    .then( (res) => {
       setNotifications(res?.data?.notifications)
    }).catch( (err) => {

    }).finally( () => {
      setLoading(false)
    })
  }

  useEffect( () => {
    fetchNotificationsHandler()
  }, [])
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
                  <span className="title">{each?.title}</span>
                  <span className="date">{timeFormat(each?.createdAt)}</span>
                </div>
                <div className="description">{each?.message}</div>
              </div>
            ))

        }
      </div>
    </div>
  )
}

export default NotificationDropDown