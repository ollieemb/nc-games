import { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';
import ReviewCard from './ReviewCard';
import { useSearchParams } from 'react-router-dom';
import { sortReviews } from '../utils/api';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By Default');

  useEffect(() => {
    setIsLoading(true);
    getReviews(category).then((reviewsData) => {
      setReviews(reviewsData);
      setIsLoading(false);
    });
  }, [category]);

  useEffect(() => {
    const paramsCategory = searchParams.get('category') || '';
    setCategory(paramsCategory);
  }, [searchParams]);

  useEffect(() => {
    if (selectedSortBy === 'Sort By Default') {
      setIsLoading(true);
      getReviews(category).then((reviewsData) => {
        setReviews(reviewsData);
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      sortReviews(selectedSortBy, category).then((reviewsData) => {
        setReviews(reviewsData);
        setIsLoading(false);
      });
    }
  }, [selectedSortBy, category]);

  const handleCategoryClick = (category) => {
    setSelectedSortBy('Sort By Default');
    setSearchParams({ category: category });
  };

  return (
    <div>
      <div className="sortByButtons">
        <h3 className="soryByTitle">Sort By:</h3>
        {/* <button
          className={`sortByButton${selectedSortBy === 'Sort By Default' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('Sort By Default')}
        >
          Default
        </button> */}
        <button
          className={`sortByButton${selectedSortBy === 'votes' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('votes')}
        >
          Votes
        </button>
        <button
          className={`sortByButton${selectedSortBy === 'designer' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('designer')}
        >
          Designer
        </button>
        <button
          className={`sortByButton${selectedSortBy === 'owner' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('owner')}
        >
          Owner
        </button>
        <button
          className={`sortByButton${selectedSortBy === 'category' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('category')}
        >
          Category
        </button>
        <button
          className={`sortByButton${selectedSortBy === 'created_at' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('created_at')}
        >
          Creation Date
        </button>
        <button
          className={`sortByButton${selectedSortBy === 'title' ? ' active' : ''}`}
          onClick={() => setSelectedSortBy('title')}
        >
          Title
        </button>
      </div>
    {isLoading ? <p className='honeycomb' key="loading">Loading Reviews</p> : <>
      <ul className="card-container">
        <div className="homeCategoryButtons"> 
        <h3 className="categoryTitle">Categories:</h3>
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

