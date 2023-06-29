import React, { createContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const NasaPicture = createContext()

export const NasaPictureProvider = ({ children }) => {

    const nasa_apiKey = process.env.REACT_APP_NASA_API_KEY
    const [currentPage, setCurrentPage] = useState(1)

    const date = new Date()
    const timestamp = date.getTime()
    const tenDaysBefore = 777600000
    const endDate = date.toISOString().slice(0, 10).trim()
    const startDate = new Date(timestamp - tenDaysBefore).toISOString().slice(0, 10).trim()
    const url = `https://api.nasa.gov/planetary/apod?&start_date=${startDate}&end_date=${endDate}&api_key=${nasa_apiKey}`

    const getNasaPicture = async () => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const { data = [], isLoading, isError } = useQuery(["NASA-APOD"], getNasaPicture, { staleTime: 86400000, cacheTime: 86400000 })

    const NextBtnHandle = () => {
        setCurrentPage(currentPage + 1)
    }

    const PrevBtnHandle = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <NasaPicture.Provider value={{ isLoading, isError, data, currentPage, NextBtnHandle, PrevBtnHandle }}>
            {children}
        </NasaPicture.Provider>
    )
}