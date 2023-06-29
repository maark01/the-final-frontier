import React, {useContext} from "react"
import { AstronautContext } from "../../contexts/AstronautContext"

export const AstronautCard = () => {

    const {loading, astronautData} = useContext(AstronautContext)

    console.log(astronautData)
    return (
        <div>
            {astronautData.map((astro, index) => {
                return (
                    <div className="astronauts-card card" key={index}>
                        <div className="astronauts-card-body card-body">
                            <img src={astro.profile_image} className="astronauts-img-top card-img-top" alt="astronauts-img" />
                            <h5 className="astronauts-title text-center">{astro.name}</h5>
                            <p className="astronauts-text"></p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
