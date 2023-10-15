import React, { useContext, useState } from 'react'
import Header from './Header'
import { signup } from '../../../services/api/auth'
import { Check } from '@mui/icons-material'
import { appContext } from '../../../services/appContext'

const Signup = ({ setError, setAuthScreen }) => {
  const {setGlobalMessage, setOpenGlobalMessage} = useContext(appContext)
  const [signupData, setSignupData] = useState({
    "name": "",
    "username": "",
    "email": "",
    "gender": "male",
    "password": "",
    "confirmPassword": "",
    "deaf": false
  })

  const [loading, setLoading] = useState(false)


  const inputData = (event, name) => {
    if (name === "deaf") {
      setSignupData({ ...signupData, [name]: event })
    } else {
      setSignupData({ ...signupData, [name]: event?.target?.value })
    }
  }

  const validateHandler = () => {
    setError("")
    if (!signupData?.name) {
      setError("Please Enter Name")
      return false
    } else if (!signupData?.username) {
      setError("Please Enter Username")
      return false
    } else if (!signupData?.email) {
      setError("Please Enter Email")
      return false
    } else if (!signupData?.password) {
      setError("Please Enter Password")
      return false
    } else if (!signupData?.confirmPassword) {
      setError("Please Enter Confirm Password")
      return false
    } else if (!/^[A-Za-z\- ]{3,50}$/.test(signupData?.name)) {
      setError("Please enter only alphabets in name field and minimum 3 and max 50 letters required.")
      return false
    } else if (!/^[A-Za-z][A-Za-z0-9]{6,15}$/.test(signupData?.username)) {
      setError("Username is not valid. It must start with an alphabet, contain only alphabets and numbers, and have a minimum 6 and max 15 characters.")
      return false
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(signupData?.email)) {
      setError("Invalid email address. Please enter a valid email address.")
      return false
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(signupData?.password)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")
      return false
    } else if (signupData?.password !== signupData?.confirmPassword) {
      setError("Confirm password is not same. Please verify")
      return false
    } else {
      return true
    }
  }

  const signupHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    if (validateHandler()) {
      const data = {
        "name": signupData?.name,
        "username": signupData?.username,
        "email": signupData?.email,
        "password": signupData?.password,
        "gender": "male",
        "deaf": signupData?.deaf
      }
      signup({ data })
        .then((res) => {
          setOpenGlobalMessage(true)
          setGlobalMessage(res?.data?.message)
          setAuthScreen("sign-in")
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
    <>
      <Header mainHeader={"Create your own account"} subHeader={"Please fill all required fields and make sure they are correct"} />
      <form onSubmit={signupHandler} className="auth-form">
        <div className="input-side-by-side">
          <div className="each-input-text-wrap">
            <span className="input-label">Name</span>
            <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "name")} value={signupData?.name} />
          </div>
          <div className="each-input-text-wrap">
            <span className="input-label">Username</span>
            <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "username")} value={signupData?.username} />
          </div>

        </div>

        <div className="input-side-by-side">
          <div className="each-input-text-wrap">
            <span className="input-label">Email</span>
            <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "email")} value={signupData?.email} />
          </div>
          <div className="each-input-text-wrap">
            <span className="input-label">Gender</span>
            <div className="gender-wrapper">

              <span className='gender-each-wrap'>
                <input type="radio" value="male" checked={signupData?.gender === "male"} onChange={(event) => inputData(event, "gender")} />
                <label >Male</label>

              </span>
              <span className='gender-each-wrap'>
                <input type="radio" id="female" value="female" checked={signupData?.gender === "female"} onChange={(event) => inputData(event, "gender")}  />
                <label>Female</label><br />
              </span>
              <span className='gender-each-wrap'>
                <input type="radio" value="others" checked={signupData?.gender === "others"} onChange={(event) => inputData(event, "gender")} />
                <label >Others</label>
              </span>
            </div>
          </div>

        </div>

        <div className="input-side-by-side">
          <div className="each-input-text-wrap">
            <span className="input-label">Password</span>
            <input type="password" className="code-quack-main-input" onChange={(event) => inputData(event, "password")} value={signupData?.password} />
          </div>
          <div className="each-input-text-wrap">
            <span className="input-label">Confirm Password</span>
            <input type="password" className="code-quack-main-input" onChange={(event) => inputData(event, "confirmPassword")} value={signupData?.confirmPassword} />
          </div>

        </div>

        <div className="deaf-wrapper">
          <span onClick={() => { inputData(!signupData?.deaf, "deaf") }} className="selection-box">{signupData?.deaf && <Check />}</span>
          <span className="deaf-info">Are you a physically deaf?</span>
        </div>


        <button type='submit' onClick={(event) => signupHandler(event)} className="code-quack-main-button">{loading ? "Loading ..." : "Sign Up"}</button>

      </form>
    </>
  )
}

export default Signup