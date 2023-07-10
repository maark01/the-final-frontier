import React, { useContext } from "react"
import { SpaceLaunchContext } from "../../contexts/SpaceLaunchContext"
import Loading from "../../components/Loading/Loading"
import LaunchCards from "./LaunchCards"
import CustomMotion from "../../components/CustomMotion/CustomMotion"
import "./Launches.css"

const Launches = () => {

   // Access the props of SpaceLaunchContext
  const { isLoading, isError, data } = useContext(SpaceLaunchContext)

  const LaunchCardWrapper = ({ children }) => {
    return (
      <div className="launch-card-wrapper m-2">
        {children}
      </div>
    )
  }

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
            <h3>You have reached the maximum API calls!</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CustomMotion>
      <div className="launch-container container">
        <div className="row">
          <div className="launch-col col-sm-12 col-md-12 col-lg-12">
            <div className="launch-header-content">
              <h3 className="launch-header-title text-center">Launches</h3>
              <p className="launch-header-text">Here you can follow the upcoming events </p>
              <hr />
            </div>
            <div className="launch-main-content">
              {/* Mapping the database content by map method and prepare properties */}
              {data.map((elem) => (
                <LaunchCardWrapper key={elem.id}>
                  <LaunchCards
                    isLoading={isLoading}
                    image={elem.image}
                    card_id={elem.id}
                    launch_name={elem.name}
                    launch_date={elem.net}
                    launch_service_name={elem.launch_service_provider.name}
                    launch_service_type={elem.launch_service_provider.type}
                    launch_mission_description={elem.mission !== null ? elem.mission.description : "No mission details"}
                    orbit={elem.mission !== null ? elem.mission.orbit.name : "No mission details"}
                  />
                </LaunchCardWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomMotion>
  )
}

export default Launches
