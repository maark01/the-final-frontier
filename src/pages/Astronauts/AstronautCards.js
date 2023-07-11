import React from "react"
import "./AstronautCards.css"

const AstronautCards = ({ cosmonaut }) => {

  return (
    <div className="cosmonaut-content" >
      <div className="cosmonaut-card card mx-auto">
        <div className="cosmonaut-card-header">
          <img src={cosmonaut.profile_image} className="cosmonaut-card-img-top card-img-top" alt="cosmonaut-img" />
        </div>
        <div className="cosmonaut-card-body card-body text-center">
          <h4 className="cosmonaut-card-title fw-bold">{cosmonaut.name}</h4>
          <p className="cosmonaut-card-text">{cosmonaut.date_of_birth} - {cosmonaut.date_of_death !== null ? cosmonaut.date_of_death : "Alive"}</p>
          <p className="cosmonaut-card-text">{cosmonaut.nationality}</p>
          <p className="cosmonaut-card-text">{cosmonaut.agency.name}</p>
          <p className="cosmonaut-card-text">{cosmonaut.age} years old</p>
          <p className="cosmonaut-card-text">{cosmonaut.status.name}</p>
        </div>
      </div>
    </div>
  )
}

export default AstronautCards
