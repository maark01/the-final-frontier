import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useContext } from "react"
import { PagesContext } from "../../contexts/PagesContext"


export default function Content() {

    const location = useLocation()

    // Access the prop of PagesContext
    const {pages} = useContext(PagesContext)

    return (
        <AnimatePresence>
            {/* Render the routes based on the current location */}
            <Routes location={location} key={location.pathname}>
                {pages.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </AnimatePresence>
    )
}