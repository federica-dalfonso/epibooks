import './CommentArea.css';
import CommentList from './CommentList.jsx';
import AddComment from './AddComment.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MySpinner from './MySpinner.jsx';

export default function CommentArea ({ asin }) {  
    // stati per gestione commenti:
    const [comments, setComments] = useState([]);

    // stato per gestire l'aggiornamento dell'array di commenti da visualizzare:
    const [refreshComments, setRefreshComments] = useState(false);

    //gestione stato spinner di caricamento: 
    const [loading, setLoading] = useState(true);

    //autorizzazione:
    const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MTE1Njk0MDIsImV4cCI6MTcxMjc3OTAwMn0.9Zx0zJl5P8pMv6knkTcWL1Ijace_4y3zC7SQixMzx9o";   
    //endpoint GET: 
    const ENDPOINT_get = `https://striveschool-api.herokuapp.com/api/comments/${asin}`

    //fetch get dei commenti:
    useEffect(() => {
        const getComments = async () => {
            try {
            const response = await fetch(ENDPOINT_get, 
                {
                headers: {
                    Authorization: key,
                },
                }
            )
            if (response.ok) {
                let comments = await response.json();
                setComments(comments);
                setLoading(false);
            } else {
                alert("Errore nella richiesta dei dati")
            }} 
            catch (error) {
                console.error("Errore nella richiesta:", error);
            }
        }
        if (asin) {
            getComments();
        }
    }, [asin, refreshComments]);   
    
    return (
        <>
        <Container className='box-comments' data-testid="comment-area">
            <Row className='g-3'>
                { loading ? (
                    <Col sm={12} className='d-flex justify-content-center align-items-center'>
                        <MySpinner/>
                    </Col>
                ) : (
                    <>
                    <Col sm={12} md={6} lg={6}>     
                        <CommentList commentToShow={comments} onCommentDeleted={() => setRefreshComments(!refreshComments)}/>                       
                    </Col>
                    <Col sm={12} md={6} lg={6} className='add-comment-box'>
                        <AddComment asin={asin} onCommentAdded={() => setRefreshComments(!refreshComments)}/>
                    </Col> 
                    </>                    
                )}
            </Row>            
        </Container>            
        </>
        
    )
}