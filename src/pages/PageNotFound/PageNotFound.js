import React from "react"
import "./PageNotFound.css"

const PageNotFound = () => {
    return (
        <div className="page-not-found-container container">
            <div className="row">
                <div className="page-not-found-col col-sm-12 col-md-12 col-lg-12">
                    <div className="page-not-found-content">
                        <h3 className="page-not-found-header text-center">ERROR 404 - Oh NO, PAGE NOT FOUND!</h3>
                        <img className="page-not-found-img" src="https://www.cnet.com/a/img/resize/f812da3969350cc0b0afd5bf35ca4ffbf08cb696/hub/2019/05/22/1b710a6b-5f4d-4987-a046-c23674b221a3/picard-meme-facepalm.jpg?auto=webp&width=1200" alt="picard" />
                        <a className="beam-up-link" href={"/"}>
                            BEAM UP TO HOME!
                            <div className="enterprise-img">
                                <img className="enterprise-image" src={require("../../assets/img/enterprise_v3.png")} alt="enterprise" style={{ width: "10rem" }} />
                            </div>
                        </a>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
