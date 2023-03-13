import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";
import React from 'react';



const Home = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews().then((reviewsData) => {
            setReviews(reviewsData)
        }) 
    }, [])

return(
 <>
 <form> 
    <input
    type='text'
    placeholder="Search Box to complete"
    />
</form>
 <br/>
<form>
<button>Cat1</button>
<button>Cat2</button>
<button>Cat3</button>
<button>Cat4</button>
</form>

<br/>

<form>
<button>User Profile</button>
</form>

        <ul>
            {reviews.map((review) => {
                return(
            <li key={review.title}>
                <img 
                src={review.review_img_url}
                alt={review.title}
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
                <br/>
                <br/>
                
        </li>
            )
         })}
        </ul>
        
        </>
        
)}

export default Home;

