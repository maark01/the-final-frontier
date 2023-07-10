import { useContext, createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

// Create an authentication context
const AuthContext = createContext()

// Provider component for the authentication context
export const AuthContextProvider = ({ children }) => {

    // State variables for user and login status
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Function for signing in with Google in "pop up style"
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    // Function for logging out
    const logOut = () => {
        signOut(auth)
    }

    // Function to handle Google sign in
    const handleGoogleSignIn = async () => {
        try {
            googleSignIn()
            setIsLoggedIn(true)
        } catch (error) {
            console.log(error)
        }
    }

    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            logOut()
            setIsLoggedIn(false)
        } catch (error) {
            console.log(error)
        }
    }

    // Effect hook to listen for changes in authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => { unsubscribe() }
    }, [])

    // Provide the authentication context value to the children components
    return (
        <AuthContext.Provider value={{ handleGoogleSignIn, handleSignOut, isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}