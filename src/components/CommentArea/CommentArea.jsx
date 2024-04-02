import './CommentArea.css';
import CommentList from './CommentList.jsx';
import AddComment from './AddComment.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MySpinner from './MySpinner.jsx';

export default function CommentArea ({ asin }) {  
    // stati per gestione commenti:
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState({
        comment: "",
        rate: "",
        elementId: asin,
    });

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
                        <AddComment asin={asin} comments={comments} setComments={setComments}
                        newComment={newComment} setNewComment={setNewComment}/>
                    </Col> 
                    </>                    
                )}
            </Row>            
        </Container>            
        </>
        
    )
}