import React, { useContext, useState } from "react"
import { AstronautContext } from "../../contexts/AstronautContext"
import Loading from "../../components/Loading/Loading"
import AstronautCards from "./AstronautCards"
import "./Astronaut.css"

const Astronaut = () => {

    // Access the data and functions of AstronautContext
    const { data, isError, isLoading, offsetNum, getNextAstronauts, getPrevAstronauts } = useContext(AstronautContext)

    const [searchfieldInput, setSearchfieldInput] = useState("")
    const [selectedOption, setSelectedOption] = useState("all")

    let cosmonautData = data

    // Event handler for search field input
    const searchfieldInputHandle = (event) => {
        setSearchfieldInput(event.target.value)
    }

    // Event handler for select dropdown
    const onSelectHandle = (event) => {
        setSelectedOption(event.target.value)
    }

    // Filter the data based on the selected option
    if (selectedOption !== "all") {
        cosmonautData = cosmonautData.filter(cosmonaut => cosmonaut.agency.name === selectedOption)
    }

    // Filter the data based on the search field input
    if (searchfieldInput) {
        cosmonautData = cosmonautData.filter((cosmonaut) => {
            return cosmonaut.name.toLowerCase().includes(searchfieldInput.toLowerCase())
        })
    }

    // Render loading state if data is still loading
    if (isLoading) {
        return <div className="container"><div className="row"><div className="col-12"><Loading /></div></div></div>
    }

    // Render error state if there was an error fetching data
    if (isError) {
        return <div className="error text-center fs-2 fw-bold my-3">Error: Failed to fetch astronaut data</div>
    }

    // Render the Astronaut component
    return (
        <div className="astronaut-container container">
            <div className="row">
                <div className="col-sm-12 col-lg-12 d-block mx-auto my-3">
                    <div className="astronaut-header-content">
                        <h3 className="astronaut-header-title text-center">Astronauts</h3>
                        <p className="astronaut-header-text">Find your favourite Astronauts</p>
                        <hr />
                    </div>
                    <div className="astronaut-searchbar-selectbar-content mx-auto">
                        <label className="form-label">Name Search:</label>
                        <input className="form-control mb-2" type="text" name="searchfieldInput" placeholder="filter by name..." onChange={searchfieldInputHandle} autoComplete="off" />
                        <div>
                            <select className="form-select form-select-sm mb-3" aria-label=".form-select" value={selectedOption} onChange={onSelectHandle}>
                                <option value="all">All Space Agencies</option>
                                <option value={"Russian Federal Space Agency (ROSCOSMOS)"}>Russian Federal Space Agency (ROSCOSMOS)</option>
                                <option value={"European Space Agency"}>European Space Agency</option>
                                <option value={"National Aeronautics and Space Administration"}>National Aeronautics and Space Administration</option>
                                <option value={"Japan Aerospace Exploration Agency"}>Japan Aerospace Exploration Agency</option>
                                <option value={"China National Space Administration"}>China National Space Administration</option>
                            </select>
                        </div>
                        <div className="astronauts-pagination-btns mb-5">
                            <div className="d-flex justify-content-between">
                                <button className={`btn btn-danger astronaut-btn-prev ${offsetNum === 0 ? "disabled" : "active"}`} onClick={getPrevAstronauts}>
                                    <i className="fa-solid fa-caret-left"></i>
                                </button>
                                <span className="my-auto text-light fw-bold">{(offsetNum / 54)+1} / 11</span>
                                <button className={`btn btn-success astronaut-btn-next ${offsetNum === 540 ? "disabled" : "active"}`} onClick={getNextAstronauts}>
                                    <i className="fa-solid fa-caret-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {cosmonautData.map((elem) => {
                    return (
                        <div className="col-sn-12 col-md-6 col-lg-4 mb-5" key={elem.id}>
                            <AstronautCards cosmonaut={elem} />
                        </div>
                    )
                })}
                <div className="astronauts-pagination-btns mb-5">
                    <div className="d-flex justify-content-between">
                        <button className={`btn btn-danger astronaut-btn-prev ${offsetNum === 0 ? "disabled" : "active"}`} onClick={getPrevAstronauts}>
                            <i className="fa-solid fa-caret-left"></i>
                        </button>
                        <span className="my-auto text-light fw-bold">{offsetNum / 54} / 10</span>
                        <button className={`btn btn-success astronaut-btn-next ${offsetNum === 540 ? "disabled" : "active"}`} onClick={getNextAstronauts}>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Astronaut