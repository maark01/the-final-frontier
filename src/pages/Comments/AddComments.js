import React, { useContext }  from "react"
import { UserAuth } from "../../contexts/AuthContext"
import {CommentCreateReadContext} from "../../contexts/CommentCreateReadContext"


const AddComments = () => {

    const { handleGoogleSignIn, user } = UserAuth()
    const {createComment, setInputUserComment} = useContext(CommentCreateReadContext)

    return (
        <div className="addcomments">
            {user !== null ? (
                <div className="addcomments-form">
                    <form className="form" autoComplete="off" onSubmit={createComment}>
                    <h3 className="text-center my-2">Leave a comment</h3>
                        <div className="mb-3 text-center">
                            <textarea className="form-control mx-auto" cols={3} placeholder="Write something..." name="inputComment" onChange={(event) => setInputUserComment(event.target.value)}></textarea>
                        </div>
                        <div className="mb-3 d-flex justify-content-center submit-box">
                            <button className="btn btn-secondary btn-submit" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="addcomments-form">
                    <h3 className="text-center my-2">Would you like to leave a comment?</h3>
                    <p className="sign-in-parag text-center text-light fw-bold" onClick={handleGoogleSignIn}>Sign in</p>
                </div>
            )}
        </div>
    )
}

export default AddComments