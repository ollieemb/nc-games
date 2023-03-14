import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviewsData) => {
      setReviews(reviewsData);
    }) 
  }, [])

  return(
    <>
      <ul className="card-container">
        {reviews.map((review) => {
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
              <p>Votes: {review.votes}</p>
              <p>Category: {review.category}</p>
              <p>Created At: {review.created_at}</p>
              <p>Comment Count: {review.comment_count}</p>
              <button>Upvote</button>
              <button>Downvote</button>
              <br/>
              <br/>
              <Link to={`/reviews/${review.review_id}`}>View Review and Comments</Link>
              <br/>
              <br/>
              <br/>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Home;

