import React from "react"
import { UserAuth } from "../../contexts/AuthContext"


const LogInOut = () => {

  const { handleGoogleSignIn, handleSignOut, user } = UserAuth()

  return (
    <li classame="nav-item">
       <button className="btn btn-secondary fw-bold" onClick={user === null ? handleGoogleSignIn : handleSignOut }>{user === null ? "Log in with Google" : "Log out"}</button>
    </li>
  )
}

export default LogInOut
