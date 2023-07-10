import React, { useState } from "react"
import { UserAuth } from "../../contexts/AuthContext"
import { firestoreDB } from "../../firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { format } from "date-fns"

const CommentList = ({ commElem }) => {

    const { user } = UserAuth() // Access the user authentication context
    const [editing, setEditing] = useState(false) // Boolean state for editing
    const [updatedComment, setUpdatedComment] = useState("") // Set the updated comment

    // Update function / "save funciton"
    const updateHandle = async (id) => {
        if (id === commElem.id) {
            await updateDoc(doc(firestoreDB, "user_comments", id), {
                comment: updatedComment,
            })
        }
        setEditing(false)
    }

    // Delete Function
    const deleteHandle = async (id) => {
        await deleteDoc(doc(firestoreDB, "user_comments", id))
    }

    // Edit function
    const editHandle = () => {
        setEditing(true)
    }

    // Cancel Function
    const cancelHandle = () => {
        setEditing(false)
    }

    let formattedDate = ""
    if (commElem.comment_date) {
        const date = commElem.comment_date.toDate()
        formattedDate = format(date, "yyyy.MM.dd HH:mm")
    } else {
        formattedDate = "Invalid Date"
    }

    return (
        <div className="mx-auto">
            {editing ? (
                <div className="commentlist-content mb-3">
                    <div className="commentlist-header">
                        <h6 className="commentlist-username">{commElem.username} - posted at: {formattedDate}</h6>
                    </div>
                    <div className="btn-icon-box">
                        <i className="btn-icon fa-solid fa-xmark me-2" onClick={() => cancelHandle()}></i>
                        {<i className="btn-icon fa-solid fa-floppy-disk me-2" onClick={() => updateHandle(commElem.id)}></i>}
                    </div>
                    <div className="commentlist-update-box">
                        <input className="commentlist-update form-control mb-2" type="text" name="setUpdatedComment" defaultValue={commElem.comment} onChange={(event) => setUpdatedComment(event.target.value)} />
                    </div>
                </div>
            ) : (
                <div className="commentlist-content mb-3">
                    <div className="commentlist-header">
                        <h6 className="commentlist-username">{commElem.username} - posted at: {formattedDate}</h6>
                    </div>
                    {user?.uid === commElem.comment_id ? <div className="btn-icon-box">
                         <i className="btn-icon fa-solid fa-trash-can me-2" onClick={() => deleteHandle(commElem.id)}></i>
                         <i className="btn-icon fa-solid fa-pencil me-2" onClick={editHandle}></i>
                    </div> :<></>}
                    <div className="commentlist-comment-box">
                        <p className="commentlist-text">{commElem.comment}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommentList