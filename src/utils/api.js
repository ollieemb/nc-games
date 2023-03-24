import axios from 'axios';

const reviewsApi = axios.create({
    baseURL: 'https://be-project-oe2.onrender.com/api' ,
});


export const getReviews = (category) => {
  const params = category ? {category: category} : {};
  return reviewsApi.get(`reviews`, {params}).then(({data}) => {
    return data.reviews
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
  
  
  export const postComment = (newComment, review_id) => {
    const data = {
      username: 'jessjelly',
      body: newComment,
    };
  
    return reviewsApi
      .post(`/reviews/${review_id}/comments`, data)
      .then(({ data }) => {
        return data.comment[0];
      });
  };

  export const sortReviews = (sort_by, category) => {
    let path = `/reviews`;
    return reviewsApi
    .get(path,{
      params: {
        sort_by,
        category
      }
    })
    .then(({data}) => {
      return data.reviews
    })
  }

  