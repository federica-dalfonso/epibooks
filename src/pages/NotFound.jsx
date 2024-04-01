import './NotFound.css';
import { ThemeContext } from "../context/ThemeContextProvider";
import { useContext } from 'react';
import logo404 from "./not-found_image.png";
import { Container, Row, Col } from 'react-bootstrap';


export default function NotFound () {

    const { theme } = useContext(ThemeContext);
    // console.log(theme)

    // classe per gestire il tema:
    const notFoundTheme = theme === "dark" ? "text-light bg-dark" : "text-dark bg-light";

    return (
        <Container className={`container-not-found ${notFoundTheme}`}>
            <Row>
                <Col className='d-flex flex-column align-items-center justify-content-center'><img className='img-fluid' src={logo404} alt="immagine_404"/></Col>
                <Col className='d-flex flex-column align-items-start justify-content-center'>
                    <p className='fs-5'>Ops! Questa storia non è ancora stata scritta...</p>
                    <h2>Pagina non trovata!</h2> 
                </Col>
            </Row>
        </Container>
    )
}