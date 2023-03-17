import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';
import ReviewCard from './ReviewCard';
import {useSearchParams} from 'react-router-dom'

function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('')
  const [searchParams, setSearchParams] = useSearchParams('')

  useEffect(() => {
    setIsLoading(true);
    getReviews(category).then((reviewsData) => {
      setReviews(reviewsData);
      setIsLoading(false);
    }) 
  }, [category])
  
  useEffect(() => {
    const paramsCategory = searchParams.get('category') || '';
    setCategory(paramsCategory);
  }, [searchParams])
  
const handleCategoryClick = (category) => {
  setSearchParams({category: category})
}

  return(
    <div>
    {isLoading ? <p className='loadingReviews' key="loading">Loading Reviews</p> : <>
      <ul className="card-container">
        <div className="homeCategoryButtons"> 
        <button className="categoryButton" onClick={() =>handleCategoryClick('')}>All</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('strategy')}>Strategy</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('hidden-roles')}>hidden-roles</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('dexterity')}>dexterity</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('push-your-luck')}>push-your-luck</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('roll-and-write')}>roll-and-write</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('deck-building')}>deck-building</button>
      <button className="categoryButton" onClick={() =>handleCategoryClick('engine-building')}>engine-building</button>


       </div >
      
       
      
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.review_id}/>
        })}
      </ul>
    </>}
    </div>
  )
}

export default Home;

