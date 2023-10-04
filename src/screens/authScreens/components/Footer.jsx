import React from 'react'

const Footer = ({ authScreen, switchAuthScreenHandler }) => {
  return (
    <div className='auth-footer'>
      {authScreen === "sign-in" ? "Don't have an account?" : "Already have an account?"}&nbsp;&nbsp;<span onClick={() => switchAuthScreenHandler(authScreen)} className="auth-footer-link">{authScreen === "sign-in" ? "Signup here" : "Login here"}</span>
    </div>
  )
}

export default Footer