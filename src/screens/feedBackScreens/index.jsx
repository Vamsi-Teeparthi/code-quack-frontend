import React, { useState } from 'react'
import Header from '../../components/Header'
import { submitFeedback } from '../../services/api/auth'
import ErrorMessages from '../../components/ErrorMessages'
import { useNavigate } from 'react-router'

const FeedBackScreens = () => {
  const [error, setError] = useState("")
  const [feedbackData, setFeedbackData] = useState({
    "rating": 1,
    "videos": "",
    "quiz": "",
    "ui": "",
    "icons": "",
    "favoritePage": "",
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)


  const inputData = (event, name) => {
    setFeedbackData({ ...feedbackData, [name]: event?.target?.value })
  }

  const validateHandler = () => {
    setError("")
    if (!feedbackData?.rating) {
      setError("Please Enter Rating")
      return false
    } else if (!feedbackData?.videos) {
      setError("Please Select How do you like our videos")
      return false
    } else if (!feedbackData?.quiz) {
      setError("Please Enter How do you like our quiz")
      return false
    } else if (!feedbackData?.ui) {
      setError("Please Enter How do you like our UI")
      return false
    } else if (!feedbackData?.icons) {
      setError("Please Enter How do you understand the purpose of our icons")
      return false
    } else if (!feedbackData?.favoritePage) {
      setError("Please Enter your favorite page")
      return false
    } else {
      return true
    }
  }

  const submitFeedbackHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    if (validateHandler()) {
      const data = {
        "ui": feedbackData?.ui,
        "icons": feedbackData?.icons,
        "favoritePage": feedbackData?.favoritePage,
        "videos": feedbackData?.videos,
        "rating": feedbackData?.rating,
        "quiz": feedbackData?.quiz,
      }
      submitFeedback({ data })
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
    <div className='main-content-page'>
      <>
        {error && <ErrorMessages message={error} setError={setError} />}
        <Header mainHeader={"Give Your Valuable Feedback"} subHeader={"Please take a moment to share your thoughts, suggestions, or any issues you've encountered."} />
        <form onSubmit={submitFeedbackHandler} className="auth-form">
          <div className="input-side-by-side">
            <div className="each-input-text-wrap">
              <span className="input-label">Overall Rating (1 / 5)</span>
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "rating")} value={feedbackData?.rating} >
                <option value="" disabled hidden>Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="each-input-text-wrap">
              <span className="input-label">How do you like our videos ?</span>
              {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "videos")} value={feedbackData?.videos} >
                <option value="" disabled hidden>Select an option</option>
                <option value="vg">Very Good</option>
                <option value="g">Good</option>
                <option value="n">Neutral</option>
                <option value="b">Bad</option>
                <option value="vb">Very Bad</option>
              </select>
            </div>

          </div>

          <div className="input-side-by-side">
            <div className="each-input-text-wrap">
              <span className="input-label">How do you like our quiz ?</span>
              {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "quiz")} value={feedbackData?.quiz} >
                <option value="" disabled hidden>Select an option</option>
                <option value="vg">Very Good</option>
                <option value="g">Good</option>
                <option value="n">Neutral</option>
                <option value="b">Bad</option>
                <option value="vb">Very Bad</option>
              </select>
            </div>
            <div className="each-input-text-wrap">
              <span className="input-label">How do you like UI ?</span>
              {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "ui")} value={feedbackData?.ui} >
                <option value="" disabled hidden>Select an option</option>
                <option value="vg">Very Good</option>
                <option value="g">Good</option>
                <option value="n">Neutral</option>
                <option value="b">Bad</option>
                <option value="vb">Very Bad</option>
              </select>
            </div>

          </div>

          <div className="input-side-by-side">
            <div className="each-input-text-wrap">
              <span className="input-label">How do you understand purpose of icons ?</span>
              {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "icons")} value={feedbackData?.icons} >
                <option value="" disabled hidden>Select an option</option>
                <option value="vg">Very Good</option>
                <option value="g">Good</option>
                <option value="n">Neutral</option>
                <option value="b">Bad</option>
                <option value="vb">Very Bad</option>
              </select>
            </div>
            <div className="each-input-text-wrap">
              <span className="input-label">What is favorite page ?</span>
              {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
              <select className='code-quack-main-input' onChange={(event) => inputData(event, "favoritePage")} value={feedbackData?.favoritePage} >
                <option value="" disabled hidden>Select an option</option>
                <option value="videos">Videos Page</option>
                <option value="request">Request Page</option>
                <option value="favorite">Favorite Page</option>
                <option value="profile">Profile Page</option>
              </select>
            </div>

          </div>




          <button type='submit' onClick={(event) => submitFeedbackHandler(event)} className="code-quack-main-button">{loading ? "Loading ..." : "Submit"}</button>

        </form>
      </>
    </div>
  )
}

export default FeedBackScreens