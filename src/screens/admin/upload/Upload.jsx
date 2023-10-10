import React, { useState } from 'react'
import LanguageDataForm from './components/LanguageDataForm'
import QuizDataForm from './components/QuizDataForm'
import ErrorMessages from '../../../components/ErrorMessages';
import { uploadVideos } from '../../../services/api/videos';
import { useNavigate } from 'react-router';

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoData, setVideoData] = useState({
    "language": "",
    "url": "",
    "shortDescription": "",
    "longDescription": ""
  })

  const [quiz, setQuiz] = useState([])

  const [currentQuizDetails, setCurrentQuizDetails] = useState({
    "question": "",
    "optionA": "",
    "optionB": "",
    "optionC": "",
    "optionD": "",
    "answer": "a"
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [error, setError] = useState("")


  const navigate = useNavigate()

  const inputData = (event, name) => {
    setVideoData({ ...videoData, [name]: event?.target?.value })
  }

  const quizInputData = (event, name) => {
    setCurrentQuizDetails({ ...currentQuizDetails, [name]: event?.target?.value })
  }


  const validateLanguageDataHandler = () => {
    if (!videoData?.language) {
      setError("Please enter programming language")
      return false
    } else if (!videoData?.url) {
      setError("Please enter URL")
      return false
    } else if (!videoData?.shortDescription) {
      setError("Please enter short description")
      return false
    } else if (!videoData?.longDescription) {
      setError("Please enter long description")
      return false
    } else if (videoData?.language?.length < 2 || videoData?.language?.length > 40) {
      setError("Language must contain min 2 and max 40 characters");
      return false
    } else if (videoData?.url?.length < 15) {
      setError("Please check the url once. It seems incorrect");
      return false
    } else if (videoData?.shortDescription?.length < 20 || videoData?.shortDescription?.length > 500) {
      setError("Short description must contains at least 20 characters and max 500 characters");
      return false
    } else if (videoData?.longDescription?.length < 50 || videoData?.longDescription?.length > 1000) {
      setError("Long description must contains at least 50 characters and max 1000 characters");
      return false
    }
    return true
  }

  const moveToQuiz = () => {
    setError("")
    if (validateLanguageDataHandler()) {
      setCurrentPage(2)
    }
  }

  const currentQuizValidateHandler = () => {
    if (!currentQuizDetails?.question) {
      setError("Please enter Question")
      return false
    } else if (!currentQuizDetails?.optionA) {
      setError("Please enter Option A")
      return false
    } else if (!currentQuizDetails?.optionB) {
      setError("Please enter Option B")
      return false
    } else if (!currentQuizDetails?.optionC) {
      setError("Please enter Option C")
      return false
    } else if (!currentQuizDetails?.optionD) {
      setError("Please enter Option D");
      return false
    } else if (!currentQuizDetails?.answer) {
      setError("Please enter answer");
      return false
    }
    return true
  }

  const addMoreQuiz = () => {
    setError("")
    if (currentQuizValidateHandler()) {
      const updatedQuiz = [...quiz]; // Create a copy of the current quiz array

      updatedQuiz[currentQuestion] = {
        "question": currentQuizDetails?.question,
        "options": [currentQuizDetails?.optionA, currentQuizDetails?.optionB, currentQuizDetails?.optionC, currentQuizDetails?.optionD],
        "answer": currentQuizDetails?.answer
      };
      setQuiz(updatedQuiz);
      setCurrentQuestion(currentQuestion + 1)
      setCurrentQuizDetails({
        "question": "",
        "optionA": "",
        "optionB": "",
        "optionC": "",
        "optionD": "",
        "answer": "a"
      })
    }
  }


  const videoSubmitHandler = () => {
    setError("")
    setLoading(true)
    if(quiz?.length > 0) {
      let data = {
        "language": videoData?.language,
        "shortDescription": videoData?.shortDescription,
        "url": videoData?.url,
        "longDescription": videoData?.longDescription,
        "quiz": quiz
      }
      uploadVideos({ data })
        .then((res) => {
          navigate("/videos")
        }).catch((err) => {
          setError(err?.data?.message)
        }).finally(() => {
          setLoading(false)
        })
    } else {
      setError("Please enter at least one question ")
      setLoading(false)
    }
  }


  return (
    <div className='main-content-page upload-new-language-video-page'>
      <header className="video-upload-header">Upload New Video</header>

      {error && <ErrorMessages message={error} setError={setError} />}
      {currentPage === 1 ? <LanguageDataForm videoData={videoData} inputData={inputData} /> : <QuizDataForm quiz={quiz} currentQuizDetails={currentQuizDetails} currentQuestion={currentQuestion} quizInputData={quizInputData} addMoreQuiz={addMoreQuiz} />}
      {currentPage === 1 ?
        <button onClick={() => { moveToQuiz() }} className='code-quack-main-button'>Next</button>
        :
        <div className="buttons-side-by-side">
          <button onClick={() => { setCurrentPage(1) }} className='code-quack-main-button'>Previous</button>
          <button disabled={quiz?.length === 0} onClick={() => { videoSubmitHandler() }} className='code-quack-main-button'>{loading ? "Loading ..." : "Submit"}</button>
        </div>
      }
    </div>
  )
}

export default Upload