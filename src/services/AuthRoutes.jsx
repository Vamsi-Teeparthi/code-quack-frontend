import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoutes = ({Component, ...props}) => {
  let hasAccess = false
    const token = Cookies.get("token")
    if(token){
        hasAccess = true
    }
  return (
    hasAccess ? <Component {...props} /> : <Navigate to="/login" />
  )
}

export default AuthRoutes