import { Code } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router'

const EachVideoList = ({ key, data }) => {
    const navigate= useNavigate();
    return (
        <div onClick={() => {navigate(`/video/${data?._id}`)}} key={key} className="each-videos-list-wrapper">
            <span className="programming-language"><Code />  {data?.language} Programming Language</span>
            <span className="short-description">{data?.shortDescription}</span>
        </div>
    )
}
const VideosList = ({ videos, loading }) => {
    return (
        <div className='videos-list-wrapper'>
            {loading ? <div className='loading-wrapper'>Loading ...</div> :
                (videos && videos?.length === 0) ? <div className='loading-wrapper'>No videos to display</div> : <>
                    {videos?.map((eachData) => (
                        <EachVideoList key={eachData?._id} data={eachData} />

                    ))}
                </>
            }

        </div>
    )
}

export default VideosList