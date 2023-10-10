import React, { useEffect, useState } from 'react'
import { getFavoriteVideos } from '../../services/api/videos';
import VideosList from './components/VideosList';

const FavoriteScreens = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // to fetch all the videos list 
  const fetchVideosHandler = () => {
    setLoading(true)
    getFavoriteVideos()
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
      <div className="home-header">Favorite Videos</div>
      
        <VideosList videos={videos} loading={loading} />
      
    </div>
  )
}

export default FavoriteScreens