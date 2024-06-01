import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/Auth';
import { Badge, Container, Table } from "react-bootstrap";
import axios from "axios";
import Loader from '../components/Loader';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Popup from '../components/PopUp';
const AllUsers = ({deleteUser}) => {
    const {allUsers} = useAuth()
    const filteredUsers = allUsers.filter(user => user.email !== "shray@gmail.com");
    const [showPopup, setShowPopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
  
    const openPopup = (userId) => {
      setUserToDelete(userId);
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      setUserToDelete(null);
    };
  
    const handleDelete = () => {
      deleteUser(userToDelete);
      closePopup();
    };
    return (
        <div>
            <Container fluid style={{ backgroundColor: "antiquewhite" , margin:"0 0px 100px 0px" , padding:"20px 35px"}}>
                <h1 className="text-center title1" style={{ textDecoration: "underline" }} >All Users</h1>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>    
                            <th>#</th>
                            <th>Date</th>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((user,index) => (
                            <tr>
                              <td style={{textAlign:"center"}}>{++index}</td>
                                <td>{user.date}</td>
                                <td>{user._id}</td>
                                {/* <td>
                                    <Badge bg={`${order.status == "processing" ? "warning" : "success"}`} text="white">
                                        {order.status}
                                    </Badge>
                                </td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td style={{ textAlign:"center"}}>
                                <MdDelete style={{ color: "black" ,fontSize:"25px"}} title='Remove Account' onClick={() => openPopup(user._id)} />
                                <p onClick={() => openPopup(user._id)} title='Remove Account'>Delete</p>
                                </td>
                                <td style={{textAlign:"center"}}>
                                <NavLink to={`/editUser/${user._id}`} title='Update Account'><FaEdit  style={{ color: "black" ,fontSize:"22px"}}/>
                                <p style={{ color: "black" ,textDecoration:"underline"}} title='Update Account'>Update</p>
                                </NavLink>
                                </td>
                            </tr>
                        )) : ""}
                    </tbody>
                </Table>
                {showPopup && (
        <Popup handleDelete={handleDelete} closePopup={closePopup}></Popup>
      )}
                {filteredUsers && filteredUsers.length > 0 ? "" : <h1 className="text-center pt-3" style={{ color: "crimson" }}>No Users Found</h1>}
            </Container>
        </div>
    )
}

export default AllUsers