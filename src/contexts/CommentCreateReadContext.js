import React, { createContext, useState, useEffect } from "react"
import { query, collection, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore"
import { UserAuth } from "./AuthContext"
import { firestoreDB } from "../firebase"


export const CommentCreateReadContext = createContext()

export const CommentCreateReadProvider = ({ children }) => {
    const { user } = UserAuth()
    const [userComments, setUserComments] = useState([])
    const [inputUserComment, setInputUserComment] = useState("")

    //create a comment
    const createComment = async (event) => {
        event.preventDefault(event)
        const userStr = user?.displayName
        const firstName = userStr.split(" ").slice(0, 1).map(fname => (fname))
        const lastName = userStr.split(" ").slice(-1, userStr.length).map(lname => (lname)[0])

        if (event.target.inputComment.value !== "") {
            await addDoc(collection(firestoreDB, "user_comments"), {
                username: `${firstName} ${lastName}`,
                comment_id: user.uid,
                comment: inputUserComment,
                timestamp: serverTimestamp(),
                comment_date: serverTimestamp(),
                completed: false,
            })

        } else {
            alert("Please add a comment!")
        }
        setInputUserComment(event.target.inputComment.value = "")
    }

    //read all comments
    useEffect(() => {
        const q = query(collection(firestoreDB, "user_comments"), orderBy("timestamp", "desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let allComments = []
            querySnapshot.forEach((doc) => {
                allComments.push({ ...doc.data(), id: doc.id })
            })
            setUserComments(allComments)
        })
        return () => unsubscribe()
    }, [])

    return (
        <CommentCreateReadContext.Provider value={{ createComment, userComments, setInputUserComment }}>
            {children}
        </CommentCreateReadContext.Provider>
    )
}
