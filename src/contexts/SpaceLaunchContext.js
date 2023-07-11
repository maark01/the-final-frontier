import React, { createContext, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const SpaceLaunchContext = createContext()

// Provider component for space launches
export const SpaceLaunchProvider = ({ children }) => {

    const space_apiKey = process.env.REACT_APP_SPACE_API_KEY
    const [currentPage, setCurrentPage] = useState(1)
    const [spaceLaunchPerPage, setSpaceLaunchPerPage] = useState(3)

    // Function to fetch space launches
    const getSpaceLaunch = async () => {
        try {
            const url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?hide_recent_previous=true&limit=9"
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${space_apiKey}`
                }
            })
            const launches = response.data.results
            return launches
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // UseQuery hook to fetch space launches with caching
    const { data: launches, isLoading, isError } = useQuery({ queryKey: ["launches"], queryFn: getSpaceLaunch, cacheTime: 86400000 })

    // Function to handle next button click
    const NextBtnHandle = () => {
        setCurrentPage(currentPage + 1)
        setSpaceLaunchPerPage(spaceLaunchPerPage + 3)
    }

    // Function to handle previous button click
    const PrevBtnHandle = () => {
        setCurrentPage(currentPage - 1)
        setSpaceLaunchPerPage(spaceLaunchPerPage - 3)
    }

    return (
        <SpaceLaunchContext.Provider value={{ isLoading, isError, spaceLaunchPerPage, currentPage, data :launches || [], PrevBtnHandle, NextBtnHandle }}>
            {children}
        </SpaceLaunchContext.Provider>
    );
};
