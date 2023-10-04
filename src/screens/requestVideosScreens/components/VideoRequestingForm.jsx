import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";
import Header from '../../../components/Header';
import { requestVideos } from '../../../services/api/request';
import ErrorMessages from '../../../components/ErrorMessages';

const VideoRequestingForm = () => {
    const [requestingData, setRequestingData] = useState({
        "language": "",
        "message": ""
    })
    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const inputData = (event, name) => {
        setRequestingData({ ...requestingData, [name]: event?.target?.value })
    }


    const validateInput = () => {
        if (!requestingData?.language) {
            setError("Please Enter Language")
            return false
        } else if (requestingData?.language?.length < 3) {
            setError("Please enter language at least 3 characters")
            return false
        } else if (requestingData?.message && requestingData?.message?.length < 10) {
            setError("Please enter message at least 10 characters")
            return false
        } else {
            return true
        }
    }

    // module to call the login api
    const requestingHandler = (event) => {
        event.preventDefault();
        setLoading(true)
        setError("")
        if (validateInput()) {
            const data = {
                "language": requestingData?.language,
            }
            if (requestingData?.message) {
                data.message = requestingData?.message
            }
            requestVideos({ data })
                .then((res) => {
                    navigate("/")
                }).catch((err) => {
                    setError(err?.data?.message)
                }).finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }
    return (
        <>
            {error && <ErrorMessages message={error} setError={setError} />}
            <div className="video-requesting-form">
                <Header mainHeader={"Request A New Video"} subHeader={"If you want new language video enter details below"} />
                <form onSubmit={requestingHandler} className="auth-form">
                    <div className="each-input-text-wrap">
                        <span className="input-label">Programming Language</span>
                        <input type="text" onChange={(event) => inputData(event, "language")} value={requestingData?.language} className="code-quack-main-input" />
                    </div>
                    <div className="each-input-text-wrap">
                        <span className="input-label">Message</span>
                        <textarea cols={5} rows={10} onChange={(event) => inputData(event, "message")} value={requestingData?.message} className="code-quack-main-text-area" />
                    </div>
                    <button type='submit' onClick={(event) => { requestingHandler(event) }} className="code-quack-main-button">{loading ? "Loading ..." : "Submit"}</button>

                </form>
            </div>
        </>
    )
}

export default VideoRequestingForm