import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';
import ReviewCard from './ReviewCard';
import {useSearchParams} from 'react-router-dom'
import { sortReviews } from '../utils/api';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('')
  const [searchParams, setSearchParams] = useSearchParams('')
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By')

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

  useEffect(() => {
    sortReviews(selectedSortBy, category).then((reviewsData) => {
      setReviews(reviewsData)
    })
  }, [selectedSortBy, category])
  
const handleCategoryClick = (category) => {
  setSelectedSortBy('Sort By Default')
  setSearchParams({category: category})
}

  return(

    <div>
      <div>

      <select
      value={selectedSortBy}
      onChange={(event) => setSelectedSortBy(event.target.value)}
      >
    <option >Sort By Default</option>

    <option value="votes">Votes</option>
    <option value="designer">Designer</option>
    <option value="owner">Owner</option>
    <option value="category">Category</option>
    <option value="created_at">Creation Date</option>
    <option value="title">Title</option>


      </select>
      </div>
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

