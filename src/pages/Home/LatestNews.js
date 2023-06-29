import React, { useContext } from "react"
import { SpaceNewsContext } from "../../contexts/SpaceNewsContext"


const LatestNews = () => {

    const { spaceNewArr } = useContext(SpaceNewsContext)

    return (
        <div className="latest-news-content">
            <h3>Latest News</h3>
            {spaceNewArr.slice(0, 1).map((elem, index) => {
                return (
                    <div className="latest-news-card card" key={index}>
                        <div className="latest-news-card-header card-image">
                            <img src={elem.imageUrl} className="latest-news-card-img card-img-top" alt="media-img" />
                        </div>
                        <div className="latest-news-card-body card-body">
                            <h4 className="latest-news-title">{elem.title}</h4>
                            <p className="latest-news-text">{elem.summary}</p>
                            <p className="latest-news-text">Author: {elem.newsSite} - {elem.publishedAt.slice(0, 10)}</p>
                            <a className="latest-news-anchor text-light fw-bold" href={elem.url} target="_blank" rel="noreferrer">Read more</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default LatestNews
