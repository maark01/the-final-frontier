import React from "react"
import { UserAuth } from "../../contexts/AuthContext"


const LogInOut = () => {

  const { handleGoogleSignIn,isLoggedIn, handleSignOut, user } = UserAuth()

  return (
    <li classame="nav-item">
      { user === null ? (
        <button className="btn btn-secondary fw-bold" onClick={handleGoogleSignIn}>Log in with Google</button>
      ) : (
        <button className="btn btn-secondary fw-bold" onClick={handleSignOut}>Log out</button>
      )}
    </li>
  )
}

export default LogInOut
