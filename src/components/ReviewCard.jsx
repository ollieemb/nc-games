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
          <h2 className='reviewCardh2'>  {review.title}</h2>
          <p><span class="review-label">Creator:</span> <span class="review-value">{review.designer}</span></p>
<p><span class="review-label">Owner:</span> <span class="review-value">{review.owner}</span></p>
<p><span class="review-label">Category:</span> <span class="review-value">{review.category}</span></p>
<p><span class="review-label">Posted:</span> <span class="review-value">{new Date(review.created_at).toLocaleString({ dateStyle: 'full', timeStyle: 'short' })}</span></p>
<p><span class="review-label">Comment Count:</span> <span class="review-value">{review.comment_count}</span></p>
<p><span class="review-label">Votes: </span> <span class="review-value">{review.votes + userVote}</span></p>

          <button
className='upvoteButton'
type="button"
onClick={() => onClick(review.review_id)}
disabled={userVote !== 0}
>
Upvote
</button>
            {isVotingError && <p> vote not registered </p>}

         
          <br/>
          <br/>
          <Link to={`/reviews/${review.review_id}`} className="linkToComments">View Review and Comments</Link>
          <br/>
          <br/>
          <br/>
        </li>
      )

}

export default ReviewCard