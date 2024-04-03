import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { Alert } from "react-bootstrap";
import { useState, useEffect } from 'react';
import ModalConfirm from './ModalConfirm';


export default function SingleComment ({userComment, onCommentDeleted}) {
    //tema     
    const { theme } = useContext(ThemeContext);
    //tema dei font:
    const listTheme = theme === "dark" ? "font-color-light" : "font-color-dark";

    //modale di conferma Bootstrap: 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //destrutturo la prop:
    const { comment, rate, _id } = userComment;

    // gestione alert per fetch:
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const hideAlerts = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
    };
    //timeout per far sparire l'alert dopo 2secondi:
    useEffect(() => {
        const timeout = setTimeout(hideAlerts, 2000);
        return () => clearTimeout(timeout);
    }, [showSuccessAlert, showErrorAlert]);

    //endpoint delete:
    const ENDPOINT_delete = `https://striveschool-api.herokuapp.com/api/comments/${_id}`;
    //autorizzazione 
    const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MTE1Njk0MDIsImV4cCI6MTcxMjc3OTAwMn0.9Zx0zJl5P8pMv6knkTcWL1Ijace_4y3zC7SQixMzx9o";

    const deleteComment = async (asin) => {
        try {
          let response = await fetch(ENDPOINT_delete,
            {
              method: "DELETE",
              headers: {
                Authorization: key,
              },
            }
          )
          if (response.ok) {
            setShowSuccessAlert(true);
            onCommentDeleted();
            handleClose(true);
          } else {
            setShowErrorAlert(true);
            console.error('Qualcosa è andato storto!')
          }
        } catch (error) {
          console.log("C'è stato un errore con la tua richiesta:", error)
        }
      }

    return (
      <>
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
              <ModalConfirm confirm={()=> deleteComment(userComment._id)}
              show={show} modalClose={handleClose} modalShow={handleShow}/>
            </div>} 
        </div>
        {showSuccessAlert && <Alert variant="warning" className='text-center'>Il tuo commento è stato eliminato!</Alert>}
        {showErrorAlert && <Alert variant="danger" className='text-center'>Non è stato possibile eliminare il commento!</Alert>}              
        </>
    )
}