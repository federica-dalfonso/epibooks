import "./SingleBook.css"
import { Col, Card } from "react-bootstrap"
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { Link } from "react-router-dom";

export default function SingleBook ( {book, selected, setSelected} ) {

    //tema:
    const {theme} = useContext(ThemeContext);
    // tema della card:
    const cardTheme = theme === "dark" ? "back-color-dark" : "back-color-light";
    // tema del font:
    const textTheme = theme === "dark" ? "text-light" : "text-dark";

    //destrutturo la prop book
    const { img, title, price, category, asin} = book;
    
    return (
        <>
        <Col sm={12} md={6} lg={3} className='g-2'>
            <Card className={`custom-card cursor-hover ${cardTheme} ${selected === book.asin ? 'red-border' : 'none'}`}
            onClick={() => setSelected(book.asin)}>
                <Card.Img variant="top" src={img} className="img-fluid" alt="copertina_libro"/>
                <Card.Body>
                    <Card.Subtitle className="text-uppercase subtitle-style py-2">{category}</Card.Subtitle>
                    <Card.Title className={`ellipsis size-title text-uppercase mb-4 ${textTheme}`}>{title}</Card.Title>                  
                    <Card.Subtitle className={`mb-3 fw-lighter text-uppercase size-price ${textTheme}`}>{`${price} euro`}</Card.Subtitle>                   
                    <Link to={`/details/:${asin}`} className="link-style">DETTAGLI</Link>                                          
                </Card.Body>
            </Card>
        </Col> 
        </>
    )
}