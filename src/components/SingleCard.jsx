import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react';
import {getReviewsID} from '../utils/api'
import { Link } from 'react-router-dom';

function SingleCard() {
    const { review_id } = useParams();
    const [reviewData, setReviewData] = useState();
  
    useEffect(() => {
      getReviewsID(review_id).then((review) => {
        setReviewData(review)
      })
      
    }, [review_id])
  
    if (!reviewData) return null;
  
    return (
      <>
        <h2>Title: {reviewData[0].title}</h2>
        <img
        src={reviewData[0].review_img_url}
        alt={reviewData[0].title}
        />
        <p> Designer: {reviewData[0].designer}</p>
        <p> Owner: {reviewData[0].owner}</p>
        <p>Category: {reviewData[0].category}</p>
        <p>Created at: {reviewData[0].created_at}</p>
        <p>Votes: {reviewData[0].votes}</p>
        <p>Comment count: {reviewData[0].comment_count}</p>
        <button>Upvote</button>
        <button>Downvote</button>
        <br />
        <br />
        <h3>Comments:</h3>
      

<Link to="/">Back to Home</Link>
      </>

    )
  }
  

export default SingleCard
