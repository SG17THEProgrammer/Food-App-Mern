import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import '../css/Menu/MallMenu.css'

const Star = ({ rating }) => {
  let ratingNum = parseFloat(rating);

  const starRating = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <>
      <span className='star'>
        {ratingNum >= index + 1 ? (
        <FaStar></FaStar>
        ) : ratingNum >= number ? (
          <FaStarHalfAlt></FaStarHalfAlt>
        ) : (
          <FaRegStar></FaRegStar>
        )}
      </span>
      </>
    );
  });


  return (
    <>
  <span > {starRating}</span>
  </>
  )
};

export default Star;
