import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { IoGrid } from "react-icons/io5";
import { HiViewList } from "react-icons/hi";
import "../css/FoodMall.css"
import { useSelector } from 'react-redux';
import Gallery from '../Image Gallery/Gallery';
import Card from '../Image Gallery/Card';
import FormatPrice from '../Helpers/FormatPrice';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import GridView from '../components/GridView';
import ListView from '../components/ListView';

const FoodMall = () => {

  const mallproductData = useSelector((state) => state.mallproduct.mallproductList)
  console.log(mallproductData)

  const productCartItem = useSelector((state) => state.product.cartItem);


  const allCategories = [...new Set(mallproductData.map((curElem) => {
    return curElem.category
  })), 'AllCategories']

  const [items, setItems] = useState(mallproductData);


  const filterItem = (parameter) => { //parameter mein Breakfast , Lunch , .... yeh sab pass hote rahenge 
    if (parameter === 'AllCategories') {
      setItems(mallproductData)
      return;
    }
    const updatedItems = mallproductData.filter((curElem) => {
      return curElem.category === parameter
    })
    setItems(updatedItems);
  }

  const filterSearch = (parameter) => { //parameter mein search input  mein jo likhenge wo pass hoga 
    // if(parameter===''){
    //   <h5>No product found</h5>  
    // } 
    const updtdItems = mallproductData.filter((curElem) => {
      return curElem.name.toLowerCase().includes(parameter)
    })
    setItems(updtdItems);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(productCartItem));
  }, [productCartItem])


  const [search, setSearch] = useState({
    text: "",
  })

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSearch({
      ...search,
      [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
    });
    filterSearch(search.text)
  }

  useEffect(() => {
    filterSearch(search.text)

  }, [search.text])

  const [grid, setGrid] = useState(true)

  const toggleLayout = () => {
    setGrid(!grid)
  }

  const [value, setValue] = useState()

  const sorting = (e) => {
    // let option = document.getElementById('sort')  
    // let sortVal = option.options[option.selectedIndex].value;
    // console.log(sortVal)
    let sortVal = e.target.value;
    setValue(sortVal)
  }

  let filterData = [];
  const sortData = (value) => {
    let newData;
    items == 0 ? newData = [...mallproductData] : newData = [...items]
    switch (value) {
      case 'highest':
        filterData = newData.sort((a, b) => { return b.price - a.price });
        break;
      case 'lowest':
        filterData = newData.sort((a, b) => a.price - b.price);
        break;
      case 'a-z':
        filterData = newData.sort((a, b) => { return a.name.localeCompare(b.name) });
        break;
      case 'z-a':
        filterData = newData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'highToLow':
        filterData = newData.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowToHigh':
        filterData = newData.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setItems(filterData);

  }

  useEffect(() => {
    sortData(value)
  }, [value])





  // const priceArr = mallproductData.map((item) => {
  //   return item.price
  // })

  // // console.log(Math.max(...priceArr))
  // const maxPrice = Math.max(...priceArr)
  // const minPrice = Math.min(...priceArr)

  // const [sliderValue, setSliderValue] = useState({
  //   price: maxPrice
  // });

  
  
  // const updatePriceFilter = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name)
  //   console.log(value)
  //   setSliderValue({
  //     ...sliderValue,
  //     [name]: value
  //   });
  //   setItems(sortedProducts)
  // };
  
  // const sortedProducts = items==0?mallproductData.filter(curElem => parseFloat(curElem.price) <= parseFloat(sliderValue.price)):items.filter(curElem => parseFloat(curElem.price) <= parseFloat(sliderValue.price))
  
  // console.log(sortedProducts)

  // useEffect(() => {
  // }, [sliderValue.price])

  function refreshPage() {
    window.location.reload(false);
  }

 
  return (
    <>
      <Navbar></Navbar>
      <div className="otrdiv">
        <div className="leftdiv">
          <input type="text" placeholder='Search' name="text" value={search.text} className='inp2' onChange={handleInput} />
          <br /><br /><br />

          <h5>Category</h5>

          {
            allCategories.map((curElem, index) => {
              return <>
                <div key={index} className='outerCatDiv'>
                  <button className="btn" style={{ margin: "10px 0 10px 0 " }} key={index} onClick={() => filterItem(curElem)} >{curElem}</button>
                </div>
              </>

            })
          }
          <br /><br />

          <h5>Price Range</h5>
          {/* <p>
            <FormatPrice price={sliderValue.price}></FormatPrice>
          </p>
          <input type="range" name="price" min={minPrice} max={parseFloat(maxPrice)} value={sliderValue.price} onChange={updatePriceFilter} /> */}

          <br /><br />
          <button className='butn' style={{ backgroundColor: "#FF407D" }} onClick={refreshPage}> Clear Filters</button>
          <br /><br />
          <NavLink to="/mallmenu/65eaf51419af9568d7dbad7b">
          <button className='butn blinking-button blink' > Mall Menu<sup className='sup'>New</sup></button>
          </NavLink>


        </div>
        <div className="rightdiv">
          <div className="righttopdiv">
            <div>

              <button className='active btn' onClick={toggleLayout}>        <IoGrid />
              </button>
              <button className='active btn' onClick={toggleLayout}>        <HiViewList />
              </button>

            </div>
            {items.length === 0 ? <p style={{ fontSize: "20px" }}>{mallproductData.length} total products</p> :
              <p style={{ fontSize: "20px" }}>{items.length} total products</p>}

            {/* <label for="cars">Choose a car:</label> */}

            <select className='inp2' id='sort' defaultValue="Select your filter" onChange={sorting}>
              <option value="#">Select your filter </option>
              <option value="lowest" >Price(lowest)</option>
              <option value="highest" >Price(highest)</option>
              <option value="a-z"   >a-z</option>
              <option value="z-a"  >z-a</option>
              <option value="highToLow"  >Rating(high-low)</option>
              <option value="lowToHigh"  >Rating(low-high)</option>
            </select>

          </div>
          {/* if items==0 then we'll show all the mall products and for the different layouts we have grid and list view  */}
          {/* checking for if items==0 and setting desired layout   */}
          <div className="rightbottomdiv">
            {
              items == 0 ?
                grid ?
                  <div className="gridDiv">
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
                  :
                  mallproductData.map((val) => {
                    const { id, name, image, category, price, _id, rating, description } = val;
                    return (
                      <ListView
                        key={id}
                        name={name}
                        image={image}
                        category={category}
                        price={price}
                        rating={rating}
                        id={_id}
                        description={description}>

                      </ListView>
                    )
                  })
                :

                grid ?
                  <div className="gridDiv">
                    {
                      items.map((val) => {
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
                      })}
                  </div>
                  :
                  items.map((val) => {
                    const { id, name, image, category, price, _id, rating, description } = val;
                    return (
                      <ListView
                        key={id}
                        name={name}
                        image={image}
                        category={category}
                        price={price}
                        rating={rating}
                        id={_id}
                        description={description}>

                      </ListView>
                    )
                  })
            }
          </div>


        </div>

      </div>
      <Footer></Footer>
    </>
  )

}

export default FoodMall