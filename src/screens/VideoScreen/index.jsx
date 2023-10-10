import { YouTube } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import VideoPlayer from './componenet/VideoPlayer';
import VideoInfo from './componenet/VideoInfo';
import { useNavigate, useParams } from 'react-router';
import { getVideo } from '../../services/api/videos';

const VideoScreen = () => {
    const [videoData, setVideoData] = useState({})
    const [loading, setLoading] = useState(true)
    const { videoID } = useParams()
    const navigate = useNavigate()
    const loadVideoData = () => {
        setLoading(true)
        getVideo({ videoID })
            .then((res) => {
                setVideoData(res?.data?.video)
            })
            .catch((err) => {
                navigate("/")
            }).finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        if (videoID) {

            loadVideoData()
        }
    }, [videoID])
    return (
        <div className='main-content-page video-display-page'>
            {loading ? <div className='loading-wrapper'>Loading ...</div> :
                <>
                    {Object.keys(videoData)?.length > 0 && (
                        <>
                            <VideoPlayer videoData={videoData} />
                            <VideoInfo setVideoData={setVideoData} videoData={videoData} />
                        </>
                    )}
                    <button onClick={() => { navigate(`/quiz/${videoID}`) }} className="code-quack-main-button button-more-width">Go To Quiz</button>
                </>}
            {/* <YouTube videoId={videoId} opts={opts} onReady={videoPlay} /> */}
        </div>
    )
}

export default VideoScreen