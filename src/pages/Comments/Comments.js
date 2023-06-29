import React, { useContext } from "react"
import {CommentCreateReadContext} from "../../contexts/CommentCreateReadContext"
import CustomMotion from "../../components/CustomMotion/CustomMotion"
import AddComments from "./AddComments"
import CommentList from "./CommentList"
import "./Comments.css"


const Comments = () => {

    const { userComments } = useContext(CommentCreateReadContext)

    return (
        <CustomMotion>
            <div className="comments-container container">
                <div className="row">
                    <div className="comments-col col-sm-12 col-md-12 col-lg-12 mb-3 mx-auto">
                        <AddComments />
                        {userComments.map((commElem, index) => {
                            return (
                                <CommentList commElem={commElem} key={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </CustomMotion >
    )
}
export default Comments