import React , {useRef} from 'react'
import '../css/Slider.css'
import { useSelector} from 'react-redux'
import CardFeature from './CardFeature'
import Card from '../Image Gallery/Card'
import FormatPrice from '../Helpers/FormatPrice'


const Slider = () => {

  // const productData = useSelector((state)=>state.product.productList)
  // //console.log(productData)

  const mallproductData = useSelector((state)=>state.mallproduct.mallproductList)
  // //console.log(mallproductData)



  const homeProductCakeList = mallproductData.filter((elem)=>elem.category === 'Cake',[])
  // //console.log(homeProductCakeList)


  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <>
     <div key={5}>
        <div className=" maindiv flex w-full items-center " >
          <h2  style={{marginTop:"30px" , textDecoration:"underline"}}>
            Cakes
          </h2>
          <div className="buttonDiv">
            {/* <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
  </button> */}
  <div className='btnInnerDiv'>
  <i className="fa-solid fa-arrow-left itag" onClick={prevProduct} ></i>            
            {/* <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
   </button> */}
<i className="fa-solid fa-arrow-right itag1" onClick={nextProduct}></i>
</div>         
          </div>
        <div  key={3}
          className="slider" style={{scrollBehavior:"smooth"}}  
          ref={slideProductRef}
        >
        {
          homeProductCakeList.map((elem) => {
                return (<>
                  <CardFeature
                  // key={elem.length+1}
                  key={elem._id}
                    id={elem._id}
                    name={elem.name}
                    category={elem.category}
                    price={elem.price}
                    image={elem.image}
                    rating={elem.rating}
                  />
                  </>
                );
              })}

        </div>
      </div>
      </div>

    </>

  )
}

export default Slider