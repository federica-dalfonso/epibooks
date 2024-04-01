import { createContext } from "react";
import { useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export default function ThemeContextProvider ( {children} ) {

    // uso il localStorage per memorizzare lo stato del tema, altrimenti
    // nella pagina NotFound o in un eventuale refresh non viene mantenuto aggiornato:
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>        
    )
}