import jsonData from '../data/fantasy.json';
import DetailForm from '../components/DetailForm/DetailForm';
import CommentArea from '../components/CommentArea/CommentArea.jsx';
import MyNav from '../components/MyNav/MyNav.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


export default function BookDetails () {

    //gestione area commenti:
    const [view, setView] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const handleClick = () => {
        setView(!view);
        setIsButtonClicked(!isButtonClicked);
    }

    let {bookASIN} = useParams();
    // console.log(bookASIN)
    //il bookASIN estratto ha i due punti all'inizio, che non mi servono; devo eliminarli
    bookASIN = bookASIN.slice(1);
    // console.log(bookASIN)
    const bookToShow = jsonData.find(book => book.asin === bookASIN);
    // console.log(bookToShow)

    return (
        <>
            <MyNav/>
            <DetailForm book={bookToShow} clickBtn={isButtonClicked} clickToShowComment={handleClick}/>
            {view && <CommentArea asin={bookASIN}/>}
            <Footer/>
        </>     
    )
}