import React, { useEffect, useState } from 'react'
// import Menu from './Menu'
// import logo from '../images/fork.png'


const Category = ({ filterItem, filterSearch,allCategories , heading}) => {
    
    const [search, setSearch] = useState({
        text:"",
    })

        const handleInput =(e)=>{
            let name = e.target.name;
            let value = e.target.value;
    
            setSearch({
                ...search,
                [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
            });
            filterSearch(search.text)
        }
        
        useEffect(()=>{
            filterSearch(search.text)

        },[search.text])


    return (
        <>
        
        <h2 className='heading' key={2}>{heading}</h2>
        <input className='inp2' placeholder='Search' style={{position:"absolute", right:"50px",width:"200px", marginTop:"-33px"}} name='text' value={search.text} onChange={handleInput} ></input>
          {/* <i className="fa-solid fa-magnifying-glass"  style={{position:"absolute"  , right:"60px",marginTop:"-29px"}}></i> */}
        <div className="outerCat" key={1}>
            <div className="menu-tab innerCat " key={0}>

                {
                    allCategories.map((curElem ,index) => {
                        return <>
                        <div key={index} className='outerCatDiv'>
                        <img src="/images/fork.png" alt="error" className='image1' ></img>
                        <button className="btn btn4" style={{margin:"0 10px"}} key ={index} onClick={() => filterItem(curElem)} >{curElem}</button>
                        </div>
                        </>

                    })
                }

            </div>
        </div>

        
        </>
    )
}

export default Category