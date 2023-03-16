import { Link } from 'react-router-dom';
import { voteOnReviewHome } from '../utils/api';
import {  useState } from 'react';


function ReviewCard ({review}) {
    const [isVotingError, setIsVotingError] = useState(false);
      const [userVote, setUserVote] = useState(0);


    const onClick = (review_id) => {
        setUserVote(+1)
        
        setIsVotingError(false);
        voteOnReviewHome(review_id)
          
          .catch(() => {
            setIsVotingError(true);
            setUserVote(0)
          });
      };
    
    return(
        <li className='card' key={review.review_id}>
          <img 
            src={review.review_img_url}
            alt={review.title}
            className="pictureCard"
          />
          <h2> Title: {review.title}</h2>
          <p>Designer: {review.designer}</p>
          <p> Owner: {review.owner}</p>
          <p>Category: {review.category}</p>
          <p>Created At: {new Date(review.created_at).toLocaleString({ dateStyle: 'full', timeStyle: 'short' })}</p>
          
          <p>Comment Count: {review.comment_count}</p>
          <p>Votes: {review.votes + userVote}</p>
          <button
type="button"
onClick={() => onClick(review.review_id)}
disabled={userVote !== 0}
>
Upvote
</button>
            {isVotingError && <p> vote not registered </p>}

         
          <br/>
          <br/>
          <Link to={`/reviews/${review.review_id}`}>View Review and Comments</Link>
          <br/>
          <br/>
          <br/>
        </li>
      )

}

export default ReviewCard