import React, { useEffect, useState } from 'react'
import VideosList from './components/VideosList'
import { getVideos } from '../../services/api/videos'

const HomeScreens = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // to fetch all the videos list 
  const fetchVideosHandler = () => {
    setLoading(true)
    getVideos()
      .then((res) => {
        setVideos(res?.data?.videos)
      }).catch( (err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchVideosHandler()
  }, [])

  return (
    <div className='main-content-page home-screen-wrapper'>
      <div className="home-header">Select Languages</div>
      
        <VideosList videos={videos} loading={loading} />
      
    </div>
  )
}

export default HomeScreens