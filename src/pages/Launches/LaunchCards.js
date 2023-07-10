import React, { useEffect, useState } from "react"

// Access the props from Launches.js file
const LaunchCards = ({ image, card_id, launch_name, launch_date, launch_service_name, launch_service_type, launch_mission_description, orbit }) => {
    const [result, setResult] = useState("")
    const [show, setShow] = useState(false)
    const launchDate = new Date(launch_date).getTime()

    // Countdown timer for launch date
    useEffect(() => {
        const launchCountDown = setInterval(() => {
            const currentDate = new Date().getTime()
            const distance = launchDate - currentDate
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            const strNullSec = seconds < 10 ? "0" : ""
            const strNullMin = minutes < 10 ? "0" : ""
            const strNullHour = hours < 10 ? "0" : ""
            const strNullDay = days < 10 ? "0" : ""

            // Update the result state with the countdown
            distance < 0 ? clearInterval(launchCountDown) : setResult(`${strNullDay + days}d ${strNullHour + hours}h ${strNullMin + minutes}m ${strNullSec + seconds}s`)
        }, 1000)

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(launchCountDown)
        }
    }, [launchDate])

    // Toggle launch mission description visibility
    const toggleLaunchMission = () => {
        setShow(!show)
    }

    const launchMissionStyle = {
        maxHeight: show ? "100%" : "0px",
        overflow: "hidden",
    }

    return (
        <div className="launch-card card" id={card_id}>
            <div className="launch-card-header">
                <img src={image !== null ? image : require("../../assets/img/iss_icon.png")} className="launch-card-img-top card-img-top" alt="launch-img" />
            </div>
            <div className="launch-card-body card-body">
                <h5 className="launch-card-title text-center fw-bold">{launch_name.split("|")}</h5>
                <p className="launch-card-text text-center">Launch: {new Date(launch_date).toLocaleString("hu-HU")}</p>
                <p className="launch-card-text text-center fw-bolder">Time Left: {result}</p>
                {show && <div className="launch-mission-box" style={launchMissionStyle}>
                    <h6 className="launch-card-text text-center fw-bold">Launch Service Provider:</h6>
                    <p className="launch-card-text text-center">{launch_service_name}</p>
                    <h6 className="launch-card-text text-center fw-bold">Launch Service Type:</h6>
                    <p className="launch-card-text text-center">{launch_service_type}</p>
                    <h6 className="launch-card-text text-center fw-bold">Mission:</h6>
                    <p className={`launch-card-text text-center`}>{launch_mission_description}</p>
                    <h6 className="launch-card-text text-center fw-bold">Orbit Level:</h6>
                    <p className="launch-card-text text-center">{orbit}</p>
                </div>}
                <button className="btn btn-secondary d-flex mx-auto" onClick={toggleLaunchMission}>{show ? "Show Less" : "Show More"}</button>
            </div>
        </div>
    )
}

export default LaunchCards
