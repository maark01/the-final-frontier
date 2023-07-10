import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { PagesContext } from "../../contexts/PagesContext"
import LogInOut from "./LogInOut"
import "./Header.css"

export default function Header() {

    // Access the prop of PagesContext
    const { pages } = useContext(PagesContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">The Final Frontier <i className="fa-solid fa-rocket"></i></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarFinalFrontier" aria-controls="navbarFinalFrontier" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarFinalFrontier">
                    <ul className="navbar-nav" >
                        {pages.filter(title => title.menubar === true).map(elem => {
                            return (
                                <li className="nav-item" key={elem.path}>
                                    <NavLink className="nav-link" aria-current="page" to={elem.path}>{elem.name.toUpperCase()}</NavLink>
                                </li>
                            )
                        })}
                        <LogInOut />
                    </ul>
                </div>
            </div>
        </nav>
    )
}

