import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import GridView from './GridView';
import { useAuth } from './Auth';
import Pagination from './Pagination';
import Search from './Search';

const MallMenuOtherProducts = ({heading}) => {
  const [page , setPage] = useState(1)
  const {user,saveCartItemsToLS}= useAuth()
  const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
    const productCartItem = useSelector((state) => state.product.cartItem);
    const [items,setItems] = useState()
  console.log(items)
    useEffect(()=>{
      user?saveCartItemsToLS(productCartItem,user._id):""
    },[productCartItem])
  return (
    <>
    <div className='head' style={{marginBottom:"20px"}}>
        <h2 className='heading' key={2}>{heading}</h2>
        <Search mallproductData={mallproductData} setItems={setItems} ></Search>
        </div>

        <div className="gridDiv" style={{marginLeft:"20px" , display:"grid" , gridTemplateColumns:"repeat(5,1fr)"}}>
                    {!items?
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
                      )
                      
                      :items.slice(page*5-5,page*5).map((val) => {
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
                  {!items?<Pagination page={page} setPage={setPage} mallproductData ={mallproductData }></Pagination>:<Pagination page={page} setPage={setPage} mallproductData ={mallproductData } items={items.length}></Pagination>}

    </>
  )
}

export default MallMenuOtherProducts