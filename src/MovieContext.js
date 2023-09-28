import { createContext, useState } from "react";

export const movieContext = createContext();



export default function MovieProvider({ children }) {
    let [moviesData, setMoviesData] = useState([]);

    return (
    <movieContext.Provider value={{ moviesData, setMoviesData }}>
        {children}
    </movieContext.Provider>
    );
}
