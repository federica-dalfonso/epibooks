import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { useState, useEffect } from "react";


export default function AddComment ({asin, comments, setComments, newComment, setNewComment}) {
    //tema     
    const { theme } = useContext(ThemeContext);
    //tema dei font:
    const addCommentTheme = theme === "dark" ? "font-color-light" : "font-color-dark";

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

    //endpoint POST:
    const ENDPOINT_post = "https://striveschool-api.herokuapp.com/api/comments";
    //autorizzazione 
    const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MTE1Njk0MDIsImV4cCI6MTcxMjc3OTAwMn0.9Zx0zJl5P8pMv6knkTcWL1Ijace_4y3zC7SQixMzx9o";

    const handleNewComment = async (event) => {
        event.preventDefault();
        setNewComment({
            comment: "",
            rate: "",
            elementId: asin,
        });
        // console.log(newComment);
        if (newComment.comment && newComment.rate) {
            try 
            {
            const response = await fetch(ENDPOINT_post, {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: key,
                },
            });    
            if (response.ok) {
                setShowSuccessAlert(true);
                // Aggiungo il nuovo commento alla lista dei commenti:
                setComments((prevComments) => [...prevComments, newComment]);
            } else {
                setShowErrorAlert(true);
                throw new Error("Qualcosa è andato storto durante la tua richiesta POST.");
            }} 
            catch (error) 
            {
                console.error("Si è verificato un problema con la tua richiesta:", error);
            }
        } 
    };

    return (
        <>
        <Form className="w-100 px-5 py-2" onSubmit={handleNewComment}>
            <Form.Group className="mb-3" controlId="controlComment">
                <Form.Label className={addCommentTheme}>Scrivi qui il tuo commento sul libro</Form.Label>
                <Form.Control type="textarea" rows={2}
                value={newComment.comment} onChange={(e) => {
                    setNewComment({
                        ...newComment,
                        comment: e.target.value, 
                    })
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="controlRate">
                <Form.Select as="selection" max={5}
                value={newComment.rate} onChange={(e) => {
                    setNewComment({
                    ...newComment,
                    rate: e.target.value,
                })}}>
                <option>Seleziona un voto da 1 a 5</option>
                <option value="1">1</option> 
                <option value="2">2</option> 
                <option value="3">3</option> 
                <option value="4">4</option> 
                <option value="5">5</option> 
                </Form.Select>
            </Form.Group>     
            <Button type="submit" variant="success">Salva</Button>       
        </Form>        
        {showSuccessAlert && <Alert variant="success" className='text-center'>Il tuo commento è stato aggiunto!</Alert>}
        {showErrorAlert && <Alert variant="danger" className='text-center'>C'è un errore...controlla il form e riprova!</Alert>}                    
        </>
    )
}  
