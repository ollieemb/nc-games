import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';
import ReviewCard from './ReviewCard';

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
          return <ReviewCard review={review} />
        })}
      </ul>
    </>
  )
}

export default Home;

