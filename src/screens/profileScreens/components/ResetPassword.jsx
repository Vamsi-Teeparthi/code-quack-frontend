import React, { useContext, useState } from 'react'
import ErrorMessages from '../../../components/ErrorMessages'
import Header from '../../../components/Header'
import { login, resetPassword } from '../../../services/api/auth'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { appContext } from '../../../services/appContext'

const ResetPassword = () => {
    const { setGlobalMessage, setOpenGlobalMessage } = useContext(appContext)
    const [error, setError] = useState("")
    const [resetData, setResetData] = useState({
        "oldPassword": "",
        "newPassword": "",
        "confirmNewPassword": "",
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const inputData = (event, name) => {
        setResetData({ ...resetData, [name]: event?.target?.value })
    }


    const validateInput = () => {
        if (!resetData?.oldPassword) {
            setError("Please Enter Old Password")
            return false
        } else if (!resetData?.newPassword) {
            setError("Please Enter New Password")
        } else if (!resetData?.confirmNewPassword) {
            setError("Please Enter Confirm Password")
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(resetData?.newPassword)) {
            setError("New Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")
            return false
        } else if (resetData?.newPassword === resetData?.oldPassword) {
            setError("New password and Old password are same. Please change new password")
            return false
        } else if (resetData?.newPassword !== resetData?.confirmNewPassword) {
            setError("Confirm new password is not same. Please verify")
            return false
        } else {
            return true
        }
    }

    // module to call the login api
    const resetPasswordHandler = (event) => {
        event.preventDefault();
        setLoading(true)
        setError("")
        if (validateInput()) {
            const data = {
                "oldPassword": resetData?.oldPassword,
                "newPassword": resetData?.newPassword
            }
            resetPassword({ data })
                .then((res) => {
                    setOpenGlobalMessage(true)
                    setGlobalMessage(res?.data?.message)
                    Cookies.remove("token")
                    navigate("/login")
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
        <div className="reset-password-wrapper">
            {error && <ErrorMessages message={error} setError={setError} />}

            <Header mainHeader={"Reset Your Password Here"} subHeader={""} />
            <form onSubmit={resetPasswordHandler} className="auth-form reset-form">
                <div className="each-input-text-wrap">
                    <span className="input-label">Old Password</span>
                    <input type="password" onChange={(event) => inputData(event, "oldPassword")} value={resetData?.oldPassword} className="code-quack-main-input" />
                </div>
                <div className="each-input-text-wrap">
                    <span className="input-label">New Password</span>
                    <input type="password" onChange={(event) => inputData(event, "newPassword")} value={resetData?.newPassword} className="code-quack-main-input" />
                </div>
                <div className="each-input-text-wrap">
                    <span className="input-label">Confirm New Password</span>
                    <input type="password" onChange={(event) => inputData(event, "confirmNewPassword")} value={resetData?.confirmNewPassword} className="code-quack-main-input" />
                </div>
                <button type='submit' onClick={(event) => { resetPasswordHandler(event) }} className="code-quack-main-button button-more-width">{loading ? "Loading ..." : "Reset Password"}</button>

            </form>
        </div>
    )
}

export default ResetPassword