import './MySpinner.css';
import { Spinner } from 'react-bootstrap';
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function MySpinner () {
    //tema:
    const {theme} = useContext(ThemeContext);
    // tema della card:
    const spinnerTheme = theme === "dark" ? "spinner-dark" : "spinner-light";

    return <Spinner animation="border" className={spinnerTheme} />
}