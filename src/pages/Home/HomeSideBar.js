import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { SpaceLaunchContext } from "../../contexts/SpaceLaunchContext"
import LaunchCards from "../Launches/LaunchCards"

const HomeSideBar = () => {

    const navigate = useNavigate()
    const { launches } = useContext(SpaceLaunchContext)

    // Set the details of menu parts in an array
    const homeCards = [
        {
            cardTitle: "News",
            image: require("../../assets/img/soyuz.jpg"),
            cardText: "Astronomy News",
            onNavigateHandler: function navigateHandler() { navigate("/news") }
        },
        {
            cardTitle: "Launches",
            image: require("../../assets/img/spaceshuttle_liftOff_02.jpg"),
            cardText: "Upcoming Launches",
            onNavigateHandler: function navigateHandler() { navigate("/launches") }
        },
        {
            cardTitle: "Comments",
            image: require("../../assets/img/cosmonaut.jpg"),
            cardText: "Leave a Comment",
            onNavigateHandler: function navigateHandler() { navigate("/comments") }
        },
    ]

    return (
        <div className="home-side-col col-sm-12 col-md-12 col-lg-4 mx-auto">
            <h3 className="next-events-header text-center mb-3">Next Event</h3>
            {launches.slice(0, 1).map((elem, index) => {
            return (
                <LaunchCards
                  key={index}
                  card_id={elem.id}
                  image={elem.image}
                  launch_name={elem.name}
                  launch_date={elem.net}
                  launch_service_name={elem.launch_service_provider.name}
                  launch_service_type={elem.launch_service_provider.type}
                  launch_mission_description={elem.mission != null ? elem.mission.description : "No mission details"}
                  orbit={elem.mission.orbit.name}
                />
              )
            })}
            <h3 className="quicl-links-header text-center my-3">Quick Links</h3>
            {homeCards.map((elem, index) => {
                return (
                    <div className="home-card card text-center" key={index} onClick={elem.onNavigateHandler}>
                        <img src={elem.image} className="home-card-img-top card-img-top" alt="cardImg" />
                        <div className="card-body">
                            <h5 className="card-title text-center fw-bold">{elem.cardTitle}</h5>
                            <p className="card-text">{elem.cardText}</p>
                            <button className="btn btn-secondary">Take a Look</button>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default HomeSideBar