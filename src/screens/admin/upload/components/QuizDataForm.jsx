import React from 'react'

const QuizDataForm = ({ quiz, currentQuizDetails, quizInputData, currentQuestion, addMoreQuiz }) => {
    return (
        <div className='language-data-form-wrapper'>
            <div className="question-no-added-list">
                <span className="question-no">
                    Question {currentQuestion + 1}
                </span>

                <div className="quiz-list">
                    <span className="quiz-added">Quiz Added :</span>
                    {currentQuestion > 0 && Array.from({ length: quiz?.length }, (_, index) => (
                        <div key={index} className="each-list">{index + 1}</div>
                    ))}
                </div>

            </div>
            <div className="each-input-text-wrap">
                <span className="input-label">Question</span>
                <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "question")} value={currentQuizDetails?.question} />
            </div>
            <div className="dual-text-display">
                <div className="each-input-text-wrap language">
                    <span className="input-label">Option A</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "optionA")} value={currentQuizDetails?.optionA} />
                </div>
                <div className="each-input-text-wrap">
                    <span className="input-label">Option B</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "optionB")} value={currentQuizDetails?.optionB} />
                </div>
            </div>
            <div className="dual-text-display">
                <div className="each-input-text-wrap language">
                    <span className="input-label">Option C</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "optionC")} value={currentQuizDetails?.optionC} />
                </div>
                <div className="each-input-text-wrap">
                    <span className="input-label">Option D</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "optionD")} value={currentQuizDetails?.optionD} />
                </div>
            </div>
            <div className="dual-text-display">
                <div className="each-input-text-wrap language">
                    <span className="input-label">Correct Option</span>
                    {/* <input type="text" className="code-quack-main-input" onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} /> */}
                    <select className='code-quack-main-input' onChange={(event) => quizInputData(event, "answer")} value={currentQuizDetails?.answer} >
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                    </select>
                </div>
                <button onClick={() => { addMoreQuiz() }} className="code-quack-main-button button-more-width"> + Add Question To Quiz</button>
            </div>
        </div>
    )
}
export default QuizDataForm