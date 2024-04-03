import { Container, Row } from 'react-bootstrap';
import SingleBook from './SingleBook';
import React, { useContext } from 'react';
import { useState } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function AllBooks ({ results }) { 

    //tema     
    const { theme } = useContext(ThemeContext);
    const containerTheme = theme === "dark" ? "bg-dark" : "bg-light";

    const [selected, setSelected] = useState(false);

    return (
        <>
            <Container className={`mt-5 ${containerTheme}`}>       
                    <Row>                                                                
                        {/*passo come prop l'ìntero libro, poi lo destrutturo nel componente*/}
                        {results && results.map((book) => {
                            return <SingleBook key={book.asin} book={book} 
                            selected={selected} setSelected={setSelected}/>
                        })}                                                
                    </Row>                        
            </Container>  
        </>
    )
}