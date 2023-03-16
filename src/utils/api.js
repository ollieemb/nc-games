import axios from 'axios';

const reviewsApi = axios.create({
    baseURL: 'https://be-project-oe2.onrender.com/api' ,
});

export const getReviews = () => {
    return reviewsApi.get('/reviews').then(({data}) => {
        return data.reviews;
    })
}

export const getReviewsID = (review_id) => {
    return reviewsApi.get(`/reviews/${review_id}`).then(({data}) => {
        return data.review;
    })
}

export const getComments = (review_id) =>  {
    return reviewsApi.get(`/reviews/${review_id}/comments`).then(({data}) => {
        return data.comments;
    })
} 

export const voteOnReviewHome = (review_id) => {
    return reviewsApi.patch(`/reviews/${review_id}`, { inc_votes: 1 })
      .then(({ data }) => {
        return data.review;
      });
  };
  
  
  