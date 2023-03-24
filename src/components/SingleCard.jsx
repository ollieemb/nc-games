import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReviewsID } from '../utils/api';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { voteOnReviewHome } from '../utils/api';

function SingleCard({ review }) {
  const { review_id } = useParams();
  const [reviewData, setReviewData] = useState();
  const [userVote, setUserVote] = useState(0);
  const [isVotingError, setIsVotingError] = useState(false);

  useEffect(() => {
    getReviewsID(review_id).then((review) => {
      setReviewData(review);
    });
  }, [review_id]);

  const onClick = (event) => {
    event.preventDefault();
  
    setUserVote((prevUserVote) => prevUserVote + 1);
  
    setIsVotingError(false);
    voteOnReviewHome(review_id)
      .catch(() => {
        setIsVotingError(true);
        setUserVote(0);
      });
  };
  

  if (!reviewData) return null;

  return (

<div key={review_id} className="reviewCardDiv">
  <h2> {reviewData[0].title}</h2>
  <img src={reviewData[0].review_img_url} alt={reviewData[0].title} />
  <p><span class="designer-title">Designer:</span> {reviewData[0].designer}</p>
  <p><span class="owner-title">Owner:</span> {reviewData[0].owner}</p>
  <p><span class="category-title">Category:</span> {reviewData[0].category}</p>
  <p><span class="created-at-title">Created at:</span> {new Date(reviewData[0].created_at).toLocaleString({dateStyle: 'full', timeStyle:'short'})}</p>

  <p><span class="votes-title">Votes: </span>{reviewData[0].votes + userVote}</p>
      {/* <p>Comment count: {reviewData[0].comment_count}</p> */}
      <button
        type="button"
        className='upvoteButton'
        onClick={onClick}
        disabled={userVote !== 0}
      >
        Upvote
      </button>
      {isVotingError && <p> vote not registered </p>}
      <br />
      <br />
      <h3>Comments:</h3>
      <Comments />

      <Link to="/" className='backToHome'>Back to Home</Link>
      <br />
      <br />
    </div>
  );
}

export default SingleCard;
