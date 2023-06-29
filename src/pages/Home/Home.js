import React from "react"
import CustomMotion from "../../components/CustomMotion/CustomMotion"
import LatestNews from "./LatestNews"
import HomeSideBar from "./HomeSideBar"
import NasaAPOD from "./NasaAPOD"
import "./Home.css"

const Home = () => {

    return (
        <CustomMotion>
            <div className="home-container container">
                <div className="home-row row">
                    <div className="home-main-col col-sm-12 col-md-12 col-md-8 col-lg-8">
                        <div className="greet-content">
                            <h3 className="home-greet-header">Welcome to Final Frontier</h3>
                            <p className="home-greet-text">
                                This website has been developed by React and includes Firebase Google Authentication and Firestore. <br />
                                The theme of the website is space exploration, and you can follow the future space launches.<br />
                                I hope you find the content engaging and enjoy exploring the fascinating world of space. <br />
                                If you have any questions or need further assistance, feel free to reach out. Happy browsing!
                            </p>
                        </div>
                        <LatestNews />
                        <NasaAPOD />
                    </div>
                    <HomeSideBar />
                </div>
            </div>
        </CustomMotion>
    )
}

export default Home