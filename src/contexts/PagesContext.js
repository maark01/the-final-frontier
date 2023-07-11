import React, { createContext } from "react"
import Home from "../pages/Home/Home"
import News from "../pages/News/News"
import Astronaut from "../pages/Astronauts/Astronaut"
import Launches from "../pages/Launches/Launches"
import Comments from "../pages/Comments/Comments"
import PageNotFound from "../pages/PageNotFound/PageNotFound"

export const PagesContext = createContext()

export const PagesProvider = ({ children }) => {

    // Set every pages in a object and put all together in an a array
    const pages = [
        { name: "Home", path: "/", menubar: true, element: <Home /> },
        { name: "News", path: "/news", menubar: true, element: <News /> },
        { name: "Astronauts", path: "/astronauts", menubar: true, element: <Astronaut /> },
        { name: "Launches", path: "/launches", menubar: true, element: <Launches /> },
        { name: "Comments", path: "/comments", menubar: true, element: <Comments /> },
        { name: "PageNotFound", path: "*", menubar: false, element: <PageNotFound /> },
    ]

    return (
        <PagesContext.Provider value={{ pages }}>
            {children}
        </PagesContext.Provider>
    )
}