import React, { useContext } from "react"
import { NasaPicture } from "../../contexts/NasaPictureContext"
import Loading from "../../components/Loading/Loading"
import YouTube from "react-youtube"


const NasaAPOD = () => {

    const { data, isLoading, isError, currentPage, NextBtnHandle, PrevBtnHandle } = useContext(NasaPicture)

    const opts = { width: "100%", maxheight: "26rem" }

    if (isLoading) {
        return (<Loading />)
    }

    if (isError) {
        return (
            <div className="error-content my-auto text-center"><h3>Oh no, we have an error! Content cannot load!</h3></div>
        )
    } 

    return (
        <div className="nasa-apod-content">
            <h3 className="nasa-apod-header">Astronomy Pictures of Last 10 Days</h3>
            <div className="nasa-apod-btns d-flex justify-content-between">
            <button onClick={PrevBtnHandle} className={`nasa-btn-prev btn btn-secondary ${currentPage === 1 ? "disabled" : "active"}`}>
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <button onClick={PrevBtnHandle} className={`nasa-btn-prev btn btn-secondary ${currentPage === 1 ? "disabled" : "active"}`}>
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <span className="my-auto text-light fw-bold">{currentPage} / 10</span>
                <button onClick={NextBtnHandle} className={`nasa-btn-next btn btn-secondary ${currentPage !== 10 ? "active" : "disabled"}`}>
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>
            {data.slice(currentPage - 1, currentPage).map((elem, index) => {
                return (
                    <div className="nasa-apod-card card" key={index}>
                        <div className="nasa-apod-card-header card-image">
                            {<img src={elem.hdurl} className={`nasa-apod-card-img card-img-top d-${elem.media_type !== "image" ? "none" : "flex"}`} alt="media-img" />}
                        </div>
                        <YouTube videoId={elem.url.slice(30, -6)} opts={opts} className={`youtube-video video d-${elem.media_type !== "video" ? "none" : "flex"}`} />
                        <div className="nasa-apod-card-body card-body">
                            <h4 className="nasa-apod-title fw-bold">{elem.title}</h4>
                            <p className="nasa-apod-explanation">{elem.explanation}</p>
                            <p className="nasa-apod-text">Source: NASA - {elem.date}</p>
                            <a className="nasa-apod-anchor text-light fw-bold" href={elem.url} target="_blank" rel="noreferrer">Read more</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NasaAPOD
