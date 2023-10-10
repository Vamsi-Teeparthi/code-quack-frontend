import React, { useEffect, useState } from 'react'

const Quiz = ({setCurrentQuestionAnswer, currentQuestionAnswer, quizData, time, currentQuestion}) => {
   
    return (
        <div className='quiz-timer'>
            <div className="quiz">
                <div className="question">{currentQuestion}. {quizData[currentQuestion -1]?.question}</div>
                <div className="options">

                    <span className='gender-each-wrap'>
                        <input type="radio" id="a" value="a" checked={currentQuestionAnswer === "a"} onChange={() => setCurrentQuestionAnswer("a")} />
                        <label >{quizData[currentQuestion - 1]?.options[0]}</label>
                    </span>
                    <span className='gender-each-wrap'>
                        <input type="radio" id="b" value="b" checked={currentQuestionAnswer === "b"} onChange={() => setCurrentQuestionAnswer("b")}/>
                        <label>{quizData[currentQuestion - 1]?.options[1]}</label><br />
                    </span>
                    <span className='gender-each-wrap'>
                        <input type="radio" id="c" value="c" checked={currentQuestionAnswer === "c"} onChange={() => setCurrentQuestionAnswer("c")} />
                        <label >{quizData[currentQuestion - 1]?.options[2]}</label>
                    </span>
                    <span className='gender-each-wrap'>
                        <input type="radio" id="d" value="d" checked={currentQuestionAnswer === "d"} onChange={() => setCurrentQuestionAnswer("d")} />
                        <label >{quizData[currentQuestion - 1]?.options[3]}</label>
                    </span>
                </div>
            </div>

            <div class="timer">

                {time} <span className="seconds">Sec</span>
            </div>

        </div>
    )
}

export default Quiz