import { createContext, useState } from "react";

export const movieContext = createContext();



export default function MovieProvider({ children }) {
    let [moviesData, setMoviesData] = useState();

    console.log("movies data :",moviesData);

    return (
    <movieContext.Provider value={{ moviesData, setMoviesData }}>
        {children}
    </movieContext.Provider>
    );
}
