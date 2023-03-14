import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react';
import {getComments} from '../utils/api'
// import { Link } from 'react-router-dom';
// import {singleCard} from './SingleCard'

function Comments() {
    const { review_id } = useParams();
    const [commentsData, setCommentsData] = useState();

    useEffect(() => {
        getComments(review_id).then((comments) => {
            setCommentsData(comments);
            console.log(comments);
        }) 
    },[review_id])
    
    return(
        <ul className='commentsOnCard'>
       <h2>comment</h2>
        


        </ul>
    )

}

export default Comments;
