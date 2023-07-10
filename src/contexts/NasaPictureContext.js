import React, { createContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const NasaPicture = createContext()

// Create a context and database about NASA daily images of the last 10 days
export const NasaPictureProvider = ({ children }) => {

    const nasa_apiKey = process.env.REACT_APP_NASA_API_KEY
    const [currentPage, setCurrentPage] = useState(1)

    // Set the start and end date of the required period
    const date = new Date()
    const timestamp = date.getTime()
    const tenDaysBefore = 777600000
    const endDate = date.toISOString().slice(0, 10).trim()
    const startDate = new Date(timestamp - tenDaysBefore).toISOString().slice(0, 10).trim()
    const url = `https://api.nasa.gov/planetary/apod?&start_date=${startDate}&end_date=${endDate}&api_key=${nasa_apiKey}`

    // Function to fetch NASA API
    const getNasaPicture = async () => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

     // UseQuery hook to fetch NASA daily images with caching
    const { data = [], isLoading, isError } = useQuery(["NASA-APOD"], getNasaPicture, { staleTime: 86400000, cacheTime: 86400000 })

     // Function to handle next button click
    const NextBtnHandle = () => {
        setCurrentPage(currentPage + 1)
    }

    // Function to handle previous button click
    const PrevBtnHandle = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <NasaPicture.Provider value={{ isLoading, isError, data, currentPage, NextBtnHandle, PrevBtnHandle }}>
            {children}
        </NasaPicture.Provider>
    )
}