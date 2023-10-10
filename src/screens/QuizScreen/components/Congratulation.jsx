import React from 'react'

const Congratulation = ({answersRevealed}) => {
  return (
    <div className='congratulation-wrapper'>
        <div className="score-display">
            {answersRevealed?.score} / {answersRevealed?.total}
        </div>
    </div>
  )
}

export default Congratulation