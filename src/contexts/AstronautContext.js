import React, { createContext, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const AstronautContext = createContext()

// Create a provider component for the Astronaut data
export const AstronautProvider = ({ children }) => {

    // Set initial offset number state
    const [offsetNum, setOffsetNum] = useState(0)
    
    // Define the API URL based on the offset number
    const api_url = `https://lldev.thespacedevs.com/2.2.0/astronaut/?agency_ids=17%2C27%2C37%2C44%2C63&has_flown=true&is_human=true&limit=54&offset=${offsetNum}`

    // Function to fetch the next set of astronauts
    const getNextAstronauts = async () => {
        setOffsetNum((prevOffsetNum) => prevOffsetNum + 54)
    }

    // Function to fetch the previous set of astronauts
    const getPrevAstronauts = async () => {
        setOffsetNum((prevOffsetNum) => prevOffsetNum - 54)
    }

    // Function to fetch the list of astronauts from the API
    const fetchAstronauts = async () => {
        try {
            const response = await axios.get(api_url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer dff6005c96751908505b4a85d2512438c2a87f62"
                }
            })
            const astronauts = response.data.results
            return astronauts
        } catch (error) {
            throw new Error(error)
        }
    }

    // Use the useQuery hook to fetch the list of astronauts
    const { data: astronauts, isLoading, isError, refetch } = useQuery({ queryKey: ["astronauts"], queryFn: fetchAstronauts, cacheTime: 86400000  })

    // Trigger the refetch whenever the offset number changes
    useEffect(() => {
        refetch()
    }, [offsetNum, refetch])

    useEffect(()=>{
        window.scrollTo({top: 0})
    },[offsetNum])

    // Provide the Astronaut data through the context
    return (
        <AstronautContext.Provider value={{ offsetNum, data: astronauts || [], isLoading, isError, getNextAstronauts, getPrevAstronauts }}>
            {children}
        </AstronautContext.Provider>
    )
}
