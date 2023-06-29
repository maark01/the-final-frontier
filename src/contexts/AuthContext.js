import { useContext, createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithRedirect, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    const handleGoogleSignIn = async () => {
        try {
            googleSignIn()
            setIsLoggedIn(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignOut = async () => {
        try {
            logOut()
            setIsLoggedIn(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ handleGoogleSignIn, handleSignOut, isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}