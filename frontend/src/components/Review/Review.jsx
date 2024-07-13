import React, { useEffect, useState } from 'react'
import '../../css/Review.css'
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { IoTrashBin } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
const Review = ({productId,userName}) => {
    const {user } = useAuth();
    const [reviews, setReviews] = useState();
    //console.log(reviews)
    const myReview = reviews && reviews.length>0 ?reviews.filter(review => review.userName===user.name):""
    //console.log(myReview)
    const otherReview = reviews && reviews.length>0 ?reviews.filter(review => review.userName!=user.name):""
    //console.log(otherReview)
    const getReviews = async () => {
        try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/getReview?productId=${productId}&userName=${userName}`);
                
                const data = await response.json();
                //console.log(data)
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

        const deleteReview = async (reviewId) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/deleteReview/${reviewId}/${productId}`, {
                    method: 'DELETE',
                });
    //console.log(response)
                const data = await response.json();
                if (response.ok) {
                    setReviews(reviews.filter(review => review._id !== reviewId));
                    toast.success('Review deleted successfully');
                    // setTimeout(() =>{
                    //     window.location.reload();
                    // },2000)
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

useEffect(() => {
        getReviews();
    }, [productId, userName]);


    return (
    <div className="floating-review-button">
            <div className="button-text">REVIEwS</div>
            <div className="reviews-popup glowing-border ">
            <div className='myReview '>
            <h5 style={{textDecoration:"underline",margin:"0 0 13px 3px" ,fontFamily:"cursive", fontWeight:"bolder"}}>Your review :  {myReview && myReview.length>0?myReview.length:0} </h5>

            { myReview && myReview.length===0? (
                    <p style={{fontWeight:"900",marginLeft:"5px",fontFamily:"cursive"}}>No reviews found </p>
                ) : (
                    myReview && myReview.map(myReview => (<>
                        <div key={myReview._id} className='review'>
                        <IoTrashBin className='icn' title='Delete Comment' onClick={()=>deleteReview(myReview._id)}/>
                            <p style={{marginBottom:"4px"}}> <b>Rating: {myReview.rating}</b> <FaStar style={{marginTop:"-1px",fontSize:"13px" ,color:"#EF9C66"}} /></p>
                            <p> <b>Comment: </b> {myReview.comment} </p>
                            
                        </div>
                        
                        </>
                    ))
                )}

            </div>
            <div>
            <h5 style={{textDecoration:"underline",margin:"0 0 13px 3px"}}>Other reviews: {otherReview && otherReview.length>0?otherReview.length:0} </h5>
                { otherReview && otherReview.length === 0 ? (
                    <p style={{fontWeight:"900",marginLeft:"5px"}}>No reviews found </p>
                ) : (
                    otherReview && otherReview.map(otherReview => (<>
                        <div key={otherReview._id} className='review'>
                            {/* <p>Review by {review.userName===user.name?"You":review.userName}</p> */}
                            <p>Review by {otherReview.userName}</p>
                            <p style={{marginBottom:"4px"}}>Rating: {otherReview.rating}⭐</p>
                            <p>Comment: {otherReview.comment}</p>
                            
                        </div>
                        
                        </>
                    ))
                )}
            </div>
            </div>
        </div>
  )
}

export default Review