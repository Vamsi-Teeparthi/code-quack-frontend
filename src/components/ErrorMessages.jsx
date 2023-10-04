import { Close } from '@mui/icons-material'
import React from 'react'

const ErrorMessages = ({message, setError}) => {
  return (
    <div className='error-messages-wrapper'>
        <span className="message-display">{message}</span>
        <Close onClick={() => setError("")} className='close-error' />
    </div>
  )
}

export default ErrorMessages