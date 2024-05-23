import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import GridView from './GridView';
import { useAuth } from './Auth';
import Pagination from './Pagination';

const MallMenuOtherProducts = ({heading}) => {
  const [page , setPage] = useState(1)
  const {user,saveCartItemsToLS}= useAuth()
  const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
    const productCartItem = useSelector((state) => state.product.cartItem);

    useEffect(()=>{
      user?saveCartItemsToLS(productCartItem,user._id):""
    },[productCartItem])
  return (
    <>
    <h5 className='heading' style={{margin:"90px 0 30px 30px " , fontSize:"28px"}}>{heading}</h5>
        <div className="gridDiv" style={{marginLeft:"20px" , display:"grid" , gridTemplateColumns:"repeat(5,1fr)"}}>
                    {
                      mallproductData.slice(page*5-5,page*5).map((val) => {
                        const { id, name, image, category, price, _id, rating } = val;
            
                        return (
                          <GridView
                            key={id}
                            name={name}
                            image={image}
                            category={category}
                            price={price}
                            rating={rating}
                            id={_id}
                          ></GridView>
                        )
                      }
                      )}
                  </div>
                  <Pagination page={page} setPage={setPage} mallproductData ={mallproductData } ></Pagination>

    </>
  )
}

export default MallMenuOtherProducts