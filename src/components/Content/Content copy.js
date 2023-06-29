import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"


export default function Content({ routes }) {

    const location = useLocation();

    return (
        <AnimatePresence>
            {/*<Routes location={location} key={location.pathname}>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
                </Routes>*/}
            <Routes location={location} key={location.pathname}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    >
                        {route.children &&
                            route.children.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={child.path}
                                    index={child.index}
                                    element={child.element}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </AnimatePresence>
    )
}