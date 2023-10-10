import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { updateFavoriteVideo } from '../../../services/api/videos'

const VideoInfo = ({ videoData, setVideoData }) => {
  const [loading, setLoading] = useState(false)
  const updateFavorite = (status) => {
    setLoading(true)
    updateFavoriteVideo({data: { videoID: videoData?._id, status}})
      .then((res) => {
        const response = status  === "pull" ? false : true
        setVideoData({...videoData, "favorite":response })
      }).catch((err) => {

      }).finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='video-info-wrapper'>
      <header className="video-header-language-name">
        <span>{videoData?.language} Programming Language</span>
        <span>{loading ? <CircularProgress size={20} /> : videoData?.favorite ? <Favorite onClick={() => {updateFavorite("pull")}} /> : <FavoriteBorder onClick={() => {updateFavorite("push")}}  />}</span>
      </header>
      <div className="video-long-description">
        {videoData?.longDescription}
      </div>
    </div>
  )
}

export default VideoInfo