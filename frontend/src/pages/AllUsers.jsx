import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/Auth';
import { Badge, Container, Table } from "react-bootstrap";
import axios from "axios";
import Loader from '../components/Loader';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const AllUsers = ({deleteUser}) => {
    const {allUsers} = useAuth()
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
                        {allUsers && allUsers.length > 0 ? allUsers.map((user,index) => (
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
                                <MdDelete style={{ color: "black" ,fontSize:"25px"}} title='Remove Account' onClick={() => deleteUser(user._id)} />
                                <p onClick={() => deleteUser(user._id)} title='Remove Account'>Delete</p>
                                </td>
                                <td style={{textAlign:"center"}}>
                                <NavLink to={`/editUser/${user._id}`}><FaEdit  style={{ color: "black" ,fontSize:"22px"}}/>
                                <p style={{ color: "black" ,textDecoration:"underline"}}>Update</p>
                                </NavLink>
                                </td>
                            </tr>
                        )) : ""}
                    </tbody>
                </Table>
                {allUsers && allUsers.length > 0 ? "" : <h1 className="text-center pt-3" style={{ color: "crimson" }}>No Users Found</h1>}
            </Container>
        </div>
    )
}

export default AllUsers