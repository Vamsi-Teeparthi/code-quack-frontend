import React, { useState } from 'react'
import Header from './Header'
import { login } from '../../../services/api/auth'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";

const SignIn = ({ setError }) => {
  const [loginData, setLoginData] = useState({
    "username": "",
    "password": ""
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const inputData = (event, name) => {
    setLoginData({ ...loginData, [name]: event?.target?.value })
  }


  const validateInput = () => {
    if (!loginData?.username) {
      setError("Please Enter Email, Username")
      return false
    } else if (!loginData?.password) {
      setError("Please Enter Password")
    } else {
      return true
    }
  }

  // module to call the login api
  const loginHandler = (event) => {
    event.preventDefault();
    setLoading(true)
    setError("")
    if (validateInput()) {
      const data = {
        "authData": loginData?.username,
        "password": loginData?.password
      }
      login({ data })
        .then((res) => {
          Cookies.set("token", res?.data?.token)
          const decoded = jwt_decode(res?.data?.token);
          if (decoded?.role === "admin") {
            navigate("/videos")
          }else{
            navigate("/")

          }
        }).catch((err) => {
          console.log(err)
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
      <Header mainHeader={"Login to your account"} subHeader={"Please login to access your account"} />
      <form onSubmit={loginHandler} className="auth-form">
        <div className="each-input-text-wrap">
          <span className="input-label">Email or Username</span>
          <input type="text" onChange={(event) => inputData(event, "username")} value={loginData?.username} className="code-quack-main-input" />
        </div>
        <div className="each-input-text-wrap">
          <span className="input-label">Password</span>
          <input type="password" onChange={(event) => inputData(event, "password")} value={loginData?.password} className="code-quack-main-input" />
        </div>
        <button type='submit' onClick={(event) => { loginHandler(event) }} className="code-quack-main-button">{loading ? "Loading ..." : "Login"}</button>

      </form>
    </>
  )
}

export default SignIn