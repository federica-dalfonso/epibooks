import './ThemeButton.css'
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { SlBulb } from "react-icons/sl";
import { SlPower } from "react-icons/sl";

export default function ThemeButton ({ changeTheme }) {

    const { theme } = useContext(ThemeContext);

    return (
        <div className='margin-custom'>
            <button className={theme === "dark" ? "theme-dark-style" : "theme-light-style"} 
            onClick={changeTheme}>
                {theme === "dark" ? <SlBulb/> : <SlPower/>}
            </button>
        </div>
    )
}