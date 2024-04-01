import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";


export default function AddComment ({asin, postComments}) {
    //tema     
    const { theme } = useContext(ThemeContext);
    //tema dei font:
    const addCommentTheme = theme === "dark" ? "font-color-light" : "font-color-dark";

    const [newComment, setNewComment] = useState({
        comment: "",
        rate: "",
        elementId: asin,
    });

    const handleNewComment =  (event) => {
        event.preventDefault();
        postComments(newComment);
        setNewComment({
            comment: "",
            rate: "",
            elementId: asin,
        });
    }  

    return (
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
    )
}