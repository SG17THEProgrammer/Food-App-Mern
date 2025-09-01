import React, { useEffect, useState } from 'react'
import Search from '../components/Search';
// import Menu from './Menu'
// import logo from '../images/fork.png'


const Category = ({ filterItem,allCategories , heading ,productData,setItems}) => {
    
    

    return (
        <>
        
        <div className='head'>
        <h2 className='heading' key={2}>{heading}</h2>
        <Search productData={productData} setItems={setItems} ></Search>
        </div>
        <div className="outerCat" key={1}>
            <div className="menu-tab innerCat " key={0}>

                {
                    allCategories.map((curElem ,index) => {
                        return (
                        <div className='outerCatDiv' key={index}>
                        <img src="/images/fork.png" alt="error" className='image1' onClick={() => filterItem(curElem)}></img>
                        <button className="btn btn4" style={{margin:"0 10px"}} key ={index} onClick={() => filterItem(curElem)} >{curElem}</button>
                        </div>
                        )

                    })
                }

            </div>
        </div>

        
        </>
    )
}

export default Category