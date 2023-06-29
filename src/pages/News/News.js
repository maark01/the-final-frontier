import React, { useContext } from "react"
import { SpaceNewsContext } from "../../contexts/SpaceNewsContext"
import Loading from "../../components/Loading/Loading"
import CustomMotion from "../../components/CustomMotion/CustomMotion"
import "./News.css"


const News = () => {

    const { isLoading, isError, currentPage, spaceNewArr, spaceNewsPerPage, PrevBtnHandle, NextBtnHandle } = useContext(SpaceNewsContext)

    if (isLoading) {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <Loading />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12 text-light">
                        <h3>You reach the maximum API calls!</h3>
                    </div>
                </div>
            </div>
        )
    }

    return (
        (<CustomMotion>
            <div className="news-container container">
                <div className="news-row row">
                    <div className="news-col col-sm-12 col-md-8 col-lg-8">
                        <div className="launch-header-content">
                            <h3 className="news-header-title text-center">News from the Cosmos</h3>
                            <p className="news-header-text">Here you can follow the recent news </p>
                            <hr />
                        </div>
                        <div className="news-pagination-btns d-flex justify-content-between mb-3">
                            <button onClick={PrevBtnHandle} className={`news-btn-prev btn btn-secondary ${spaceNewsPerPage === 5 ? "disabled" : "active"}`}>
                                <i className="fa-solid fa-caret-left"></i>
                            </button>
                            <span className="news-current-page my-auto text-light fw-bold">{currentPage} / 20</span>
                            <button onClick={NextBtnHandle} className={`news-btn-next btn btn-secondary ${spaceNewsPerPage !== 100 ? "active" : "disabled"}`}>
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </div>
                        {spaceNewArr.slice(spaceNewsPerPage - 5, spaceNewsPerPage).map(elem => {
                            return (
                                <div className="news-box mb-3" key={elem.id}>
                                    <div className="news-box-card card mb-3">
                                        <div className="row g-0">
                                            <div className="news-box-img-content my-auto col-md-4 mb-3">
                                                <img src={elem.imageUrl} className="news-box-img img-fluid" alt="media-img" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="news-box-title fw-bold">{elem.title}</h5>
                                                    <p className="news-box-summary">{elem.summary}</p>
                                                    <p className="news-box-text">Source: {elem.newsSite} - Published at: {elem.publishedAt.slice(0, 10)}</p>
                                                    <a className="news-box-anchor text-light fw-bold" href={elem.url} target="_blank" rel="noreferrer">Read more</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </CustomMotion>)
    )
}

export default News