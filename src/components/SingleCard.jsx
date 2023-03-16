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
    <div key={review_id}>
      <h2>Title: {reviewData[0].title}</h2>
      <img src={reviewData[0].review_img_url} alt={reviewData[0].title} />
      <p>Designer: {reviewData[0].designer}</p>
      <p>Owner: {reviewData[0].owner}</p>
      <p>Category: {reviewData[0].category}</p>
      <p>Created at: {reviewData[0].created_at}</p>
      <p>Votes: {reviewData[0].votes + userVote}</p>
      <p>Comment count: {reviewData[0].comment_count}</p>
      <button
        type="button"
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

      <Link to="/">Back to Home</Link>
      <br />
      <br />
    </div>
  );
}

export default SingleCard;
