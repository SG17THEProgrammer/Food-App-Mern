import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useSelector } from 'react-redux';
import '../css/AllProducts.css'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import axios from "axios"
import { toast } from 'react-toastify';
import FormatPrice from '../Helpers/FormatPrice';
const AllProducts = () => {

    
    const navigate = useNavigate()
    const productData = useSelector((state) => state.product.productList);
    const mallproductData = useSelector((state) => state.mallproduct.mallproductList)

    
    const [items, setItems] = useState(productData);
    const [mallitems, setmallItems] = useState(mallproductData);

    
    const editProd =(id)=>{
        const productDisplay = productData.filter((elem) => elem._id === id)[0];
        
        navigate(`/edit/${productDisplay._id}`)
    }

    const editMallProd =(id)=>{
        const productDisplay = mallproductData.filter((elem) => elem._id === id)[0];
        
        navigate(`/edit/${productDisplay._id}`)
    }

    const deleteItem = async(id)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/deleteProduct`,{id})
            
            console.log(response)
            setItems(response.data.items);
            toast.success(response.data.msg)
            
            
        } catch (error) {
                console.log(error)
        }
    }

    const deleteMallItem = async(id)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/deleteMallProduct`,{id})

            console.log(response)
            setmallItems(response.data.mallItems)
            toast.success(response.data.msg)
            


        } catch (error) {
                console.log(error)
        }
    }

    
    useEffect(() => {
        setItems(productData);
        setmallItems(mallproductData);
    }, [productData,mallproductData]);

    return (
        <>
            <Navbar></Navbar>
            <div className='allProdDiv'>

                <h2 style={{ textDecoration: "underline" ,fontWeight:"600" }}>All Products </h2>

                <div className='freshfood'>
                    <h4>Freshly prepared food items / Order-to-cook food items</h4>
                    <div className='searchItems'>

                    <h5>Total Items : {items?.length}</h5>
                    <Search productData={items} setItems={setItems}></Search>
                    </div>
                    <div className='tblforFreshfood'>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Edit Product</th>
                                <th>Delete Product</th>
                            </tr>
                            {items?.length>0?items.map((elem,idx)=>{
                                const {name, category, price, description,rating,_id} = elem;
                                return <>
                                <tr>
                                <td>{++idx}</td>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td><FormatPrice price={price}></FormatPrice></td>
                                <td>{description}</td>
                                <td>{rating}</td>
                                <td style={{textAlign:"center",cursor:"pointer"}}><FaEdit onClick={()=>editProd(_id)}/></td>
                                <td style={{textAlign:"center",cursor:"pointer"}}><AiFillDelete onClick={()=>deleteItem(_id)} /></td>
                            </tr>
                                </>
                            }):<tr><td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            </tr>}
                    
                        </table>
                    </div>
                </div>


                <div className='packfood'>
                    <h4>Groceries / Mall Products</h4>
                    <div className='searchItems'>
                    <h5>Total Items : {mallproductData?.length}</h5>
                    <Search mallproductData={mallproductData} setItems={setmallItems} ></Search>
                    </div>
                    <div className='tblforPackfood'>
                    <table>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Edit Product</th>
                                <th>Delete Product</th>
                            </tr>
                            {mallitems?.length>0 ? mallitems?.map((elem,idx)=>{
                                const {name, category, price, description,rating,_id} = elem;
                                return <>
                                <tr>
                                <td>{++idx}</td>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td><FormatPrice price={price}></FormatPrice></td>
                                <td>{description}</td>
                                <td>{rating}</td>
                                <td style={{textAlign:"center",cursor:"pointer"}}><FaEdit onClick={()=>editMallProd(_id)}/></td>
                                <td style={{textAlign:"center",cursor:"pointer"}}><AiFillDelete onClick={()=>deleteMallItem(_id)} /></td>
                            </tr>
                                </>
                            }):<tr><td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            <td>-No item/s found--</td>
                            </tr>}
                    
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AllProducts