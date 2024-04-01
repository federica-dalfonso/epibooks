import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { SlPencil, SlTrash } from "react-icons/sl";


export default function SingleComment ({userComment}) {
    //tema     
    const { theme } = useContext(ThemeContext);
    //tema dei font:
    const listTheme = theme === "dark" ? "font-color-light" : "font-color-dark";

    const { comment, rate, } = userComment;

    return (
        <div className="d-flex align-items-center justify-content-between gap-3 py-2">
            <div className='d-flex align-items-center gap-2'>
              <img className='single-comment-image' src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="immagine_profilo" />
                <div className="d-flex flex-column comment-span-style">
                    <span className={listTheme}>{`${comment}`}</span>
                    <span className={listTheme}>{`voto: ${rate}`}</span> 
                </div>   
            </div>            
            {userComment && 
            <div className='d-flex gap-2'>
                <button className='modify-comment-button'><SlPencil/></button>
                <button className='delete-comment-button'><SlTrash/></button>
            </div>}               
        </div>
    )
}