import React, { createContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import axios from "axios"

export const SpaceNewsContext = createContext()

export const SpaceNewsProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [spaceNewsPerPage, setSpaceNewsPerPage] = useState(5)

    const getSpaceNews = async () => {
        try {
            const response = await axios.get("https://api.spaceflightnewsapi.net/v3/articles?_limit=100&_start=10")
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const { data = [], isLoading, isError } = useQuery(["space-news"], getSpaceNews, { staleTime: 3600000, cacheTime: 3600000 })

    const spaceNewArr = [...data]

    for (let i = 1; i <= (spaceNewArr.length = spaceNewsPerPage); i++) {
        spaceNewArr.push(i)
    }

    const NextBtnHandle = () => {
        setCurrentPage(currentPage + 1)
        setSpaceNewsPerPage(spaceNewsPerPage + 5)
    }

    const PrevBtnHandle = () => {
        setCurrentPage(currentPage - 1)
        setSpaceNewsPerPage(spaceNewsPerPage - 5)
    }

    return (
        <SpaceNewsContext.Provider value={{ data, spaceNewsPerPage, isLoading, isError, spaceNewArr, currentPage, setCurrentPage, NextBtnHandle, PrevBtnHandle }}>
            {children}
        </SpaceNewsContext.Provider>
    );
};
