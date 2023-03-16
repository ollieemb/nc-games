import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';
import ReviewCard from './ReviewCard';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviewsData) => {
      setReviews(reviewsData);
      setIsLoading(false);
    }) 
  }, [])
  
  
  return(
    <div>
    {isLoading ? <p className='loadingReviews' key="loading">Loading Reviews</p> : <>
      <ul className="card-container">
        {reviews.map((review) => {
          return <ReviewCard review={review} />
        })}
      </ul>
    </>}
    </div>
  )
}

export default Home;

