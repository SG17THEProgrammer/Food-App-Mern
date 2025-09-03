import React, { useEffect, useState } from 'react'


const Search = ({mallproductData,setItems,productData}) => {
    
    
  const filterSearch = (parameter) => { //parameter mein search input  mein jo likhenge wo pass hoga 
    // if(parameter===''){
    //   <h5>No product found</h5>  
    // } 
    const updtdItems = mallproductData ?mallproductData.filter((curElem) => {
      return curElem.name.toLowerCase().includes(parameter)
    }):productData?.filter((curElem) => {
        return curElem.name.toLowerCase().includes(parameter)
      })
    setItems(updtdItems);
  }


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
    <div>
         <input className='inp2' placeholder='Search' name='text' value={search.text} onChange={handleInput} ></input>
    </div>
  )
}

export default Search