import axios from 'axios';

const reviewsApi = axios.create({
    baseURL: 'https://be-project-oe2.onrender.com/api' ,
});

export const getReviews = () => {
    return reviewsApi.get('/reviews').then(({data}) => {
        return data.reviews;
    })
}

