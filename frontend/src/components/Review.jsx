import React, { useEffect, useState } from 'react'
import '../css/Review.css'
import { toast } from 'react-toastify';

const Review = ({productId,userId}) => {
    const [reviews, setReviews] = useState();

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8001/getReview?productId=${productId}&userId=${userId}`);
                
                const data = await response.json();
                console.log(data)
                if (!response.ok) {
                    setReviews([]);
                }
                else{
                    setReviews(data.reviews);
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

        getReviews();
    }, [productId, userId]);


  return (
    <div className="floating-review-button">
            <div className="button-text">REVIEwS</div>
            <div className="reviews-popup">
                { reviews && reviews.length === 0 ? (
                    <p style={{fontWeight:"900"}}>No reviews found </p>
                ) : (
                    reviews && reviews.map(review => (
                        <div key={review._id} className='review'>
                            <p style={{marginBottom:"4px"}}>Rating: {review.rating}⭐</p>
                            <p>Comment: {review.comment}</p>
                            
                        </div>
                    ))
                )}
            </div>
        </div>
  )
}

export default Review