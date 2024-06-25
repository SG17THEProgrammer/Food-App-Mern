import React, { useState } from 'react'
import '../css/Comments.css'
import { useAuth } from './Auth';
import { toast } from 'react-toastify';
import { useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Comments = ({productId,message}) => {
    const { id } = useParams();

    const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
  console.log(mallproductData)

const productDisplay = mallproductData.filter((elem) => elem._id === id)[0];
console.log(productDisplay)


    const {user} =useAuth()
    const navigate = useNavigate()

    const [review , setReview] = useState({
        rating:0,
        comment:""
    });
    const handleRating = (event) => {
        setReview({
          ...review,
          rating: parseInt(event.target.value, 10)
        });
      };
    
      const handleInput = (event) => {
        const { name, value } = event.target;
        setReview({
          ...review,
          [name]: value
        });
      };

      const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:8001/postReview`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({review:review,userName:user.name  , productId:productId}),
			});
			const resData = await response.json();
			console.log(resData);

			if (response.ok) {
                toast.success(resData.message[0]);
                navigate("/home")
                setTimeout(() =>{
                    window.location.reload(); 
                },2000)
               productDisplay?navigate(`/mallmenu/${productDisplay._id}`): navigate(`/menu/${productId}`)            
       
				setReview({
					rating: 0,
					comment:'',
				});
				
			} else {
				toast.error(resData.message[0]);
			}
		} catch (error) {
			toast.error("Couldn't send the message ");

		}
	};


    return (
        <>
        <h1>{message}</h1>
        <div className="card3" >
            <div className="row">
                <div className="col-2">
                    {/* <img src="https://i.imgur.com/xELPaag.jpg" width="70" className="rounded-circle mt-2" /> */}
                </div>
                <form onSubmit={handleSubmit}>
                <div className="col-10">
                    <div className="comment-box ml-2">
                        <h4>Add a comment</h4>
                        <div className="rating">
                            <input
                                type="radio"
                                name="rating"
                                value="5"
                                id="5"
                                onChange={handleRating}
                            />
                            <label htmlFor="5">☆</label>
                            <input
                                type="radio"
                                name="rating"
                                value="4"
                                id="4"
                                onChange={handleRating}
                            />
                            <label htmlFor="4">☆</label>
                            <input
                                type="radio"
                                name="rating"
                                value="3"
                                id="3"
                                onChange={handleRating}
                            />
                            <label htmlFor="3">☆</label>
                            <input
                                type="radio"
                                name="rating"
                                value="2"
                                id="2"
                                onChange={handleRating}
                            />
                            <label htmlFor="2">☆</label>
                            <input
                                type="radio"
                                name="rating"
                                value="1"
                                id="1"
                                onChange={handleRating}
                            />
                            <label htmlFor="1">☆</label>
                        </div>
                        <div className="comment-area"> <textarea className="form-control" placeholder="what is your view?" rows="4" onChange={handleInput} name='comment' type='text' value={review.comment}></textarea> </div>
                        <div className="comment-btns mt-2">
                            <div className="row">
                                {/* <div className="col-6">
                                    <div className="pull-left"> <button className="btn btn-success btn-sm">Cancel</button> </div>
                                </div> */}
                                <div className="col-5" >
                                    <div className="pull-right"> <button className="     btn-success send btn-sm">Post <i className="fa fa-long-arrow-right ml-2 pr-2"></i></button> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div> 
        </>
    )
}

export default Comments