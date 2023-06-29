import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"


const HamburgerIcon = ({ toggleHamburger }) => {

    return (
        <div className="header-hamburger col-4 text-light">
            <FontAwesomeIcon icon={faBars} className="fa-bars" onClick={toggleHamburger} />
        </div>
    )
}

export default HamburgerIcon
