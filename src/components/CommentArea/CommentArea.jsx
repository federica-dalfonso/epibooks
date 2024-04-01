import './CommentArea.css';
import CommentList from './CommentList.jsx';
import AddComment from './AddComment.jsx';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MySpinner from './MySpinner.jsx';

export default function CommentArea ({ asin }) {  

    //gestione commenti:
    const [comments, setComments] = useState([]);
    //caricamento commenti per spinner: 
    const [loading, setLoading] = useState(true);
    
    // gestione alert:
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const hideAlerts = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
    };
    useEffect(() => {
        const timeout = setTimeout(hideAlerts, 2000);
        return () => clearTimeout(timeout);
    }, [showSuccessAlert, showErrorAlert]);

    //autorizzazione 
    const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MTE1Njk0MDIsImV4cCI6MTcxMjc3OTAwMn0.9Zx0zJl5P8pMv6knkTcWL1Ijace_4y3zC7SQixMzx9o";
    
    //endpoint GET: 
    const ENDPOINT_get = `https://striveschool-api.herokuapp.com/api/comments/${asin}`

    //fetch per ottenere i commenti:
    useEffect(() => {
        const getComments = async () => {
            try {
            const response = await fetch(ENDPOINT_get, {
                headers: {
                    Authorization: key,
                },
                }
            )
            if (response.ok) {
                const comments = await response.json();
                setComments(comments);
                // console.log(comments);
                setLoading(false);
            } else {
                console.log('error')
            }
            } catch (error) {
            console.log(error)
            }
        }
        if (asin) {
            getComments();
        }
    }, [asin], [comments]);   

    //endpoint POST:
    const ENDPOINT_post = "https://striveschool-api.herokuapp.com/api/comments";

    //fetch per inviare il nuovo commento: 
    const postComments = async (newComment) => {
        try {
            const response = await fetch(ENDPOINT_post, {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: key,
                },
            })
            if (response.ok) {
                setShowSuccessAlert(true);
                setComments((prevComments) => [...prevComments, newComment]);
            } else {
                setShowErrorAlert(true);
                throw new Error('Qualcosa è andato storto');
            }
        } catch (error) {
            console.log(error);
        }
    }

    //endpoint delete:
    // const ENDPOINT_delete = `https://striveschool-api.herokuapp.com/api/comments/${asin}`; con l'ID del commento

    return (
        <>
        <Container className='my-3 px-5'>
            <Row className='g-3'>
                { loading ? (
                    <Col sm={12} className='d-flex justify-content-center align-items-center'>
                        <MySpinner/>
                    </Col>
                ) : (
                    <>
                    <Col sm={12} md={6} lg={6} className=''>     
                        <CommentList commentToShow={comments}/>                       
                    </Col>
                    <Col sm={12} md={6} lg={6} className='add-comment-box'>
                        <AddComment asin={asin} postComments={postComments}/>
                        {showSuccessAlert && <Alert variant="success" className='text-center'>Il tuo commento è stato aggiunto!</Alert>}
                        {showErrorAlert && <Alert variant="danger" className='text-center'>C'è un errore...controlla il form e riprova!</Alert>}                    
                    </Col> 
                    </>                    
                )}
            </Row>            
        </Container>            
        </>
        
    )
}