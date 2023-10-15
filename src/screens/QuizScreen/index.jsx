import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getQuiz, submitQuiz } from '../../services/api/videos'
import Quiz from './components/Quiz';
import Congratulation from './components/Congratulation';

const QuizScreen = () => {
    const [quizData, setQuizData] = useState([]);
    const [language, setLanguage] = useState("")
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState([])
    const [time, setTime] = useState(30);
    const [disableScreen, setDisableScreen] = useState(false);
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState("");
    const [answersRevealed, setAnswersRevealed] = useState({})

    const { videoID } = useParams()
    const navigate = useNavigate()
    const loadQuizData = () => {
        setLoading(true)
        getQuiz({ videoID })
            .then((res) => {
                setQuizData(res?.data?.quiz?.quiz)
                setLanguage(res?.data?.quiz?.language)
            })
            .catch((err) => {
                navigate("/")
            }).finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        if (videoID) {

            loadQuizData()
        }
    }, [videoID])


    const nextQuestionHandler = () => {
        if (!currentQuestion) {
            alert("Please choose your answer")
        } else {

            if (currentQuestion === quizData?.length) {
                const updatedAnswers = [...answers];
                updatedAnswers.push(currentQuestionAnswer ? currentQuestionAnswer : "not answered")
                // submit
                submitQuiz({ videoID, data: {answers: updatedAnswers} })
                    .then((res) => {
                        setAnswersRevealed(res?.data?.results)
                        setQuizData([])
                        setTime(0);
                        
                    }).catch((err) => {
                        alert("Internal Server Error")
                    }).finally(() => {
                        setDisableScreen(false)
                    })
            } else {
                const updatedAnswers = [...answers];
                updatedAnswers.push(currentQuestionAnswer ? currentQuestionAnswer : "not answered")
                setAnswers(updatedAnswers)
                setCurrentQuestion(currentQuestion + 1);
                setTime(30)
                setCurrentQuestionAnswer("")
                setDisableScreen(false)
            }
        }
    }

    useEffect(() => {
        // Function to decrease the timer by 1 second
        if (quizData?.length > 0) {

            const decreaseTimer = () => {
                if (time > 0) {
                    setTime(time - 1);
                } else if(currentQuestion <= quizData?.length) {
                    setDisableScreen(true)
                    // if (!currentQuestionAnswer) {
                    //     setCurrentQuestionAnswer("not answered")
                    // }
                    nextQuestionHandler()
                }
            };

            // Set up an interval to decrease the timer every second
            const interval = setInterval(decreaseTimer, 1000);

            // Clean up the interval when the component unmounts
            return () => {
                clearInterval(interval);
            };
        }

    }, [time, quizData])
    return (
        <div className='main-content-page quiz-page'>
            <header className="quiz-screen-header">Quiz on {language} programming language</header>
            {Object.keys(answersRevealed)?.length > 0 ? <Congratulation answersRevealed={answersRevealed} /> :
                disableScreen ? <div className='disable-screen'> Time over for this question.Loading next Question</div> :
                    <>
                        <Quiz setCurrentQuestionAnswer={setCurrentQuestionAnswer} currentQuestionAnswer={currentQuestionAnswer} quizData={quizData} time={time} currentQuestion={currentQuestion} />
                        <button disabled={currentQuestionAnswer?.length === 0} onClick={() => { setDisableScreen(true); nextQuestionHandler() }} className="code-quack-main-button">{currentQuestion === quizData?.length ? "Submit" : "Next"}</button>
                    </>

            }
        </div >
    )
}

export default QuizScreen