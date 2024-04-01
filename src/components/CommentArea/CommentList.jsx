import SingleComment from './SingleComment.jsx';

export default function CommentList ({ commentToShow }) {
    //gestiamo anche il caso in cui l'array non contenga ancora nessun commento!
    // console.log(commentToShow);
    return (
        <div className='comment-list-box'>
            {commentToShow.length === 0 ? (
                <p className='no-comment-yet'>Nessuna recensione presente</p>
            ) : (
                commentToShow.map((comment, index) => (
                    <SingleComment key={index} userComment={comment}/>
                ))
            )}
        </div>
    );
}