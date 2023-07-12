import React, { createContext, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import axios from "axios"

export const SpaceNewsContext = createContext()


// Provider component for space news
export const SpaceNewsProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [spaceNewsPerPage, setSpaceNewsPerPage] = useState(5)

    // Function to fetch space news
    const getSpaceNews = async () => {
        try {
            const response = await axios.get("https://api.spaceflightnewsapi.net/v3/articles?_limit=100&_start=10")
            const spaceNewsData = response.data
            return spaceNewsData
        } catch (error) {
            console.log(error)
        }
    }

    // UseQuery hook to fetch space news with caching
    const { data = [], isLoading, isError } = useQuery({ queryKey: ["space-news"], queryFn: getSpaceNews, cacheTime: 3600000 })

    // Create an array for space news
    const spaceNewArr = [...data]

    for (let i = 1; i <= (spaceNewArr.length = spaceNewsPerPage); i++) {
        spaceNewArr.push(i)
    }

    // Function to handle next button click
    const NextBtnHandle = () => {
        setCurrentPage(currentPage + 1)
        setSpaceNewsPerPage(spaceNewsPerPage + 5)
    }

    // Function to handle previous button click
    const PrevBtnHandle = () => {
        setCurrentPage(currentPage - 1)
        setSpaceNewsPerPage(spaceNewsPerPage - 5)
    }

    //Scroll to top, when next/prev buttons pressed
    useEffect(()=>{
        window.scrollTo({top: 0})
    },[currentPage])

    return (
        <SpaceNewsContext.Provider value={{ spaceNewsPerPage, isLoading, isError, spaceNewArr, currentPage, setCurrentPage, NextBtnHandle, PrevBtnHandle }}>
            {children}
        </SpaceNewsContext.Provider>
    );
};
