import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const SpaceLaunchContext = createContext()

// Provider component for space launches
export const SpaceLaunchProvider = ({ children }) => {

    const [launches, setLaunches] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Function to fetch space launches
    useEffect(() => {

        let isMounted = true

        const getSpaceLaunch = async () => {
            try {
                const space_apiKey = process.env.REACT_APP_SPACE_API_KEY
                const url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?hide_recent_previous=true&limit=9"
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${space_apiKey}`
                    }
                })
                setLoading(true)
                const launchData = response.data.results
                if (isMounted) {
                    setLaunches(launchData)
                    setLoading(false)
                }
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        getSpaceLaunch()

        return () => {
            isMounted = false
        }
    }, [])



    return (
        <SpaceLaunchContext.Provider value={{ loading, error, launches }}>
            {children}
        </SpaceLaunchContext.Provider>
    );
};
