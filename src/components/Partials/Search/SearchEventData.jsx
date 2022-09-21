import { createContext, useState } from 'react';

export const SearchEvent = createContext();

export const SearchContainer = ({ children }) => {
    const [searchEventData, setSearchEventData] = useState('');

    return (
        <SearchEvent.Provider value={{ searchEventData, setSearchEventData }}>
            {children}
        </SearchEvent.Provider>
    )
}