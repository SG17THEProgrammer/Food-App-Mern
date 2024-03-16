import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import GridView from './GridView';

const MallMenuOtherProducts = ({heading}) => {
    const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
    const productCartItem = useSelector((state) => state.product.cartItem);

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(productCartItem));
    }, [productCartItem])
  return (
    <>
    <h5 className='heading' style={{margin:"90px 0 30px 30px " , fontSize:"28px"}}>{heading}</h5>
        <div className="gridDiv" style={{marginLeft:"20px" , display:"grid" , gridTemplateColumns:"repeat(5,1fr)"}}>
                    {
                      mallproductData.map((val) => {
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
    </>
  )
}

export default MallMenuOtherProducts