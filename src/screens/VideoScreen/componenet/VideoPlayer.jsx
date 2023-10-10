import React from 'react'

const VideoPlayer = ({videoData}) => {
  return (
    <div className='video-player'>
            <iframe key={videoData?._id} width={"100%"} height={"95%"} alt="Video Player" src={videoData?.url} frameBorder={0} allowFullScreen={true}></iframe>
    </div>
  )
}

export default VideoPlayer