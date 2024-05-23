import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/Pagination.css'

const Pagination = ({page,setPage,items,mallproductData }) => {
  console.log(page)
    const productData = useSelector((state) => state.product.productList)
    const handlePage = (selectedPage) => {
      if (selectedPage >= 1 && selectedPage <= (!mallproductData ?!items ? Math.ceil(productData.length / 5) : Math.ceil(items / 5):Math.ceil(mallproductData.length / 5)) && selectedPage !== page) {
          setPage(selectedPage);
      }
  }
  useEffect(() => {
    handlePage(1)
  },[items])

  
  return (
    <>
       <div className='navigate'>
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <a className={page>1?"page-link ":"page-link disabled"}     onClick={()=>handlePage(page - 1)}>Previous</a>
    </li>
    {!mallproductData?!items?[...Array(Math.ceil(productData.length / 5))].map((_, i) => (
    <li key={i} className={page===i+1?"page-item active":"page-item"}>
        <button className="page-link " onClick={()=>handlePage(i + 1)} >{i + 1}</button>
    </li>
)):[...Array(Math.ceil(items/ 5))].map((_, i) => (
    <li key={i} className={page===i+1?"page-item active":"page-item"}>
        <button className="page-link " onClick={()=>handlePage(i + 1)} >{i + 1}</button>
    </li>
)):!items?[...Array(Math.ceil(mallproductData.length / 5))].map((_, i) => (
    <li key={i} className={page===i+1?"page-item active":"page-item"}>
        <button className="page-link " onClick={()=>handlePage(i + 1)} >{i + 1}</button>
    </li>
)):[...Array(Math.ceil(items/ 5))].map((_, i) => (
    <li key={i} className={page===i+1?"page-item active":"page-item"}>
        <button className="page-link " onClick={()=>handlePage(i + 1)} >{i + 1}</button>
    </li>
))}

    <li className="page-item">
      <a className={!mallproductData?!items?page<productData.length/5?"page-link":"page-link disabled":page<items/5?"page-link":"page-link disabled":!items?page<mallproductData.length/5?"page-link":"page-link disabled":page<items/5?"page-link":"page-link disabled"}  onClick={()=>handlePage(page+ 1)}>Next</a>
    </li>
  </ul>
</div>
    </>
  )
}

export default Pagination