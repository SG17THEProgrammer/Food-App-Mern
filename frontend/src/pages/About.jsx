import React, { useEffect, useState } from 'react'
import '../css/About.css'
import Navbar from '../components/navbar'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import { NavLink, useParams } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { useSelector } from 'react-redux'
import AllUsers from './AllUsers'


const About = () => {

    const { user, getCartItems } = useAuth()
    const productCartItem = useSelector((state) => state.product.cartItem);

   



    const [isReadOnly, setIsReadOnly] = useState(true);
    const [userData, setUserData] = useState(true)

    const [about, setAbout] = useState({
        name: "",
        email: "",
        phone: "",
        image: "",
    })

    if (userData && user) {
        setAbout({
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image,
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        // //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setAbout({
            ...about,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };


    const [update, setUpdate] = useState(false)

    const handleEditClick = () => {
        setIsReadOnly(!isReadOnly);
        setUpdate(!update);
    };


    const deleteUser = async (id) => {
        //console.log(id)
        try {
            const response = await fetch(`http://localhost:8001/about/delete/${id}`, {
                method: 'DELETE'

            });

            const data = await response.json();
            //console.log(data)

            if (response.ok) {
                toast.success("account deleted successfully")
                window.location.reload();
            }
            else {
                //console.log('error')
            }
        }

        catch (error) {
            //console.log("Api not found")
        }
    }
    const updateUser = async (id) => {
        // //console.log(params.id)
        try {
            const response = await fetch(`http://localhost:8001/about/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(about)

            });
            //console.log(response)
            const data = await response.json();
            //console.log(data)

            if (response.ok) {
                toast.success(data.message[0])

            }
            else {
                toast.error(data.message[0])
            }
        }

        catch (error) {
            toast.error("Api not found")
        }
    }

    const handleUploadProfileImage = async (e) => {
        // //console.log(e.target.files[0])
        const about = await ImagetoBase64(e.target.files[0])


        setAbout((prev) => {
            return {
                ...prev,
                image: about
            }
        })

    }
    useEffect(() => {
        getCartItems();
    }, [user, productCartItem])

    return (
        <>
            <Navbar></Navbar>
            <div className='outerDiv1'>
                <div className="page-content page-container" id="page-content" >
                    <div className="padding" >
                        <div className="row d-flex justify-content-center" >
                            <div className="col-xl-6 col-md-12 innerDiv" >
                                <div className="card2 user-card-full" >
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-5 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <h5 style={{ color: "black", marginBottom: "20px " }}>Welcome , {user.name}</h5>
                                                    <img src={about.image} className="img-radius" alt="User-Profile-Image" onChange={handleInput} />
                                                    {update ?
                                                        <div className='labelDiv'>

                                                            <label htmlFor='file' className='label1' style={{ color: "white" }}>Upload</label>
                                                            <input type='file' id='file' className='inp' name='image' accept='image/*' onChange={handleUploadProfileImage} ></input>

                                                        </div> : ""}

                                                </div>
                                                <input className="f-w-600 inp1" value={about.name} name='name' onChange={handleInput} style={{ textAlign: "center", fontSize: "30px" ,marginLeft:"10px"}} type='text' readOnly={isReadOnly}></input>
                                                {/* <p style={{fontSize:"30px"}}> Web Designer</p> */}


                                            </div>
                                        </div>
                                        <div className="col-sm-7" style={{ backgroundColor: "#E1AA74" }}>
                                            <div className="card-block">
                                                {/* {user.email === "shray@gmail.com" ? <NavLink to='/'><i class="fa-solid fa-trash fa-xl" style={{ margin: "10px 50px 0 0 ", color: "black" }} title='Remove Account' onClick={() => deleteUser(user._id)}></i>
                                                </NavLink> : ""} */}
                                                <i className="fa-solid fa-pen-to-square fa-xl" title='Edit Account Details' style={{ marginTop: "10px" }} onClick={handleEditClick}></i>                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600" style={{ fontSize: "35px", color: "#FFF3CF" }}>Your Profile{update? <h5 style={{marginTop:"5px"}}>(Edit Your profile)</h5>:""}</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600" style={{ fontSize: "25px", color: "#FFE4C9" }}>Email</p>
                                                        <input className="text-muted f-w-400 inp1" value={about.email} name='email' onChange={handleInput} readOnly={isReadOnly}></input>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600" style={{ fontSize: "25px", color: "#FFE4C9" }}>Phone</p>
                                                        <input className="text-muted f-w-400 inp1" value={about.phone} name='phone' onChange={handleInput} readOnly={isReadOnly}></input>
                                                    </div>

                                                    <button className='butn' style={{ backgroundColor: "#F4DFC8", marginTop: "260px" }} onClick={() => updateUser(user._id)}>Update </button>

                                                </div>

                                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {user.email === "shray@gmail.com" ?
                <AllUsers deleteUser={deleteUser} ></AllUsers> : ""}
        </>
    )
}

export default About