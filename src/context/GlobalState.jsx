import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [category, setCategory] = useState(9);
    const [difficulty, setDifficulty] = useState("easy");

    return (
        <GlobalContext.Provider
            value={{
                category,
                setCategory,
                difficulty,
                setDifficulty
            }}>
            { props.children}
        </GlobalContext.Provider>
    )
}