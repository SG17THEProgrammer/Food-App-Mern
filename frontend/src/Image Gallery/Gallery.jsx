import React, { useEffect, useState } from 'react'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle'
import Card from './Card'
// import Menu from './Menu'
import './style.css'
import Category from './Category'
import { useSelector } from 'react-redux'
import FormatPrice from '../Helpers/FormatPrice'
import { useAuth } from '../components/Auth'
import Pagination from '../components/Pagination'

const Gallery = ({ heading }) => {
    const [page , setPage] = useState(1)
    
    const productData = useSelector((state) => state.product.productList)
    // console.log("hi", productData)
    
    const productCartItem = useSelector((state) => state.product.cartItem);
    // console.log(productCartItem)  

    //Rather than creating different buttons for each categories we used set (which consist of only unique values) so that whenver a new categories comes in your api it will fetch it 
    const allCategories = [...new Set(productData.map((curElem) => {
        return curElem.category
    })), 'AllCategories']
    
    // console.log("1", allCategories)
    
    //... (spread operator ) iss liye use kiya so that values direct array mein aa jaaye 
    // nhi use krenge toh set ke andar set phir usme enteries aaynegi 

    // console.log(allCategories);
    
    const [items, setItems] = useState(productData);
    const [category, setCategory] = useState(allCategories);
   

    const filterItem = (parameter) => { //parameter mein Breakfast , Lunch , .... yeh sab pass hote rahenge 
        if (parameter === 'AllCategories') {
            setItems(productData)
            return;
        }
        const updatedItems = productData.filter((curElem) => {
            return curElem.category === parameter
        })
        setItems(updatedItems);
    }
    // console.log(items)
  
   

   
    
    return (
        <>
            {/* <h1 style={{ textAlign: 'center', marginTop: '5px' }}>Order Your Favourite Dish</h1>
            <hr /> */}

            <Category allCategories={allCategories} filterItem={filterItem} category={category} heading={heading}  productData={productData} setItems={setItems}/>
          

            <div className='mainDiv'>              
            {items==0?productData.slice(page*5-5,page*5).map((elem)=>{
                return(
                <Card
                 key={elem._id}
                    id={elem._id}
                    name={elem.name}
                    category={elem.category}
                    price={elem.price}
                    image={elem.image}
                    rating={elem.rating}
                    />
                )
            })
            :items.slice(page*5-5,page*5).map((elem)=>{
                return(
                <Card
                 key={elem._id}
                    id={elem._id}
                    name={elem.name}
                    category={elem.category}
                    price={elem.price}
                    image={elem.image}
                    rating={elem.rating}
                    />
                )
            })
            }
            </div>
            <Pagination page={page} setPage={setPage} items={items.length}></Pagination>

            {/* <div className='mainDiv'>
            {
                filterSearchItems.map((elem)=>{
                return(
                <Card
                 key={elem._id}
                    id={elem._id}
                    name={elem.name}
                    category={elem.category}
                    price={elem.price}
                    image={elem.image}/>
                )
            })
            }              
            </div> */}


        </>
    )
}

export default Gallery