import "./DetailForm.css"
import { Container, Row, Col} from 'react-bootstrap';
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";


export default function DetailForm ({ book, clickBtn, clickToShowComment}) {

    const { title, img, price, category } = book;

    //tema:
    const {theme} = useContext(ThemeContext);
    // tema font:
    const themeText = theme === "dark" ? "text-light" : "text-dark";
    // tema button:
    const buttonTheme = theme === "dark" ? "show-more-light" : "show-more-dark";

    return (
        <Container className="my-2 py-4">
        <Row className="g-4">
            <Col xs={12} md={3} lg={5} className="d-flex align-content-center justify-content-center">
                <img className="image-details" src={img} alt="copertina_libro"/>
            </Col>
            <Col xs={12} md={9} lg={7}>
                <div className="d-flex flex-column align-items-start">
                    <div className="d-flex flex-column gap-3">
                        <span className="text-uppercase subtitle-style">{category}</span>
                        <h2 className={`text-uppercase ${themeText}`}>{title}</h2>                         
                        <p className={`${themeText}`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Pariatur ab qui non voluptas laudantium commodi eligendi 
                            inventore esse incidunt et, saepe neque, nam vel, 
                            sapiente rem harum voluptatibus? In, facilis.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Pariatur ab qui non voluptas laudantium commodi eligendi 
                            inventore...
                        </p>
                        <span className={`mb-3 fw-lighter text-uppercase ${themeText}`}>{`${price} euro`}</span> 
                    </div>
                    <div className="my-5">
                        <button className={`${buttonTheme}`} onClick={clickToShowComment}>
                            {clickBtn ? "Nascondi i commenti" : "Vedi i commenti"}
                        </button>  
                    </div> 
                </div>                                                
            </Col>
        </Row>
    </Container>   
    )
}