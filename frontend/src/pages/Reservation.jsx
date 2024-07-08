import React, { useEffect, useState } from 'react';
import '../css/Reservation.css';
import Navbar from '../components/navbar';
import { FaArrowDown } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useAuth } from '../components/Auth';
const Reservation = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        entryIn: '',
        entryOut: '',
        tables: '',
        members: '',
        email: '',
        phone: ''
    });

    const [reservationData, setReservationData] = useState(true)

    if (reservationData && user) {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            entryIn: '',
            entryOut: '',
            tables: '',
            members: '',

        });
        setReservationData(false);
    }


    const sendEmail = async (e) => {
        try {
            const res = await fetch('http://localhost:8001/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservationData: formData })

            })

            const data = await res.json();
            console.log(data)


        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8001/reservation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            //console.log(response);

            const res = await response.json();
            //console.log(res)

            if (response.ok) {
                 setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            entryIn: '',
            entryOut: '',
            tables: '',
            members: '',

        });
                toast.success(res.message[0])
                sendEmail();
            }
            else {
                toast.error(res.message[0])
            }

        } catch (error) {
            //console.log(error)
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div id="booking" className="section" style={{ marginBottom: "100px", marginTop: "40px" }}>
                <div className="section-center">
                    <div className="container" style={{ backgroundColor: "#F8C794" }}>
                        <div className="row">
                            <div className="booking-form">
                                <div className="form-header">
                                    <h1>Book Your Seat</h1>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name" style={{ color: "#ff8846", marginLeft: "20px", textTransform: "uppercase", marginBottom: "-5px" }}>Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="" style={{ color: "#ff8846", marginLeft: "20px", textTransform: "uppercase", marginBottom: "-5px" }}>Email</label>

                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Enter your Email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <span className="form-label">Email</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="" style={{ color: "#ff8846", marginLeft: "20px", textTransform: "uppercase", marginBottom: "-5px" }}>Phone No.</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="Enter your Phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                                <span className="form-label">Phone</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="" style={{ color: "#ff8846", marginLeft: "20px", textTransform: "uppercase", marginBottom: "-5px" }}>No. of Tables</label>
                                                <select
                                                    className="form-control"
                                                    required
                                                    name="tables"
                                                    value={formData.tables}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" hidden style={{ backgroundColor: "#B2B2B2" }}>No of Tables</option>
                                                    <option value="1" style={{ backgroundColor: "#B2B2B2" }}>1</option>
                                                    <option value="2" style={{ backgroundColor: "#B2B2B2" }}>2</option>
                                                    <option value="3" style={{ backgroundColor: "#B2B2B2" }}>3</option>
                                                    <option value="3" style={{ backgroundColor: "#B2B2B2" }}>4</option>
                                                    <option value="3" style={{ backgroundColor: "#B2B2B2" }}>5</option>
                                                </select>
                                                {/* <span className="select-arrow"></span> */}
                                                <FaArrowDown style={{ position: "absolute", left: "80%", bottom: "12px", color: "silver" }} />
                                                <span className="form-label">tables</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4" style={{ width: "220px" }}>
                                            <div className="form-group">
                                                <label htmlFor="" style={{ color: "#ff8846", marginLeft: "20px", textTransform: "uppercase", marginBottom: "-5px" }}>No. of Members</label>

                                                <select
                                                    className="form-control"
                                                    required
                                                    name="members"
                                                    value={formData.members}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" hidden style={{ backgroundColor: "#B2B2B2" }}>No of Members</option>
                                                    <option value="1" style={{ backgroundColor: "#B2B2B2" }}>1</option>
                                                    <option value="2" style={{ backgroundColor: "#B2B2B2" }}>2</option>
                                                    <option value="3" style={{ backgroundColor: "#B2B2B2" }}>3</option>
                                                </select>
                                                {/* <span className="select-arrow"></span> */}
                                                <FaArrowDown style={{ position: "absolute", left: "80%", bottom: "12px", color: "silver" }} />
                                                <span className="form-label">members</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="datetime-local"
                                                    required
                                                    name="entryIn"
                                                    value={formData.entryIn}
                                                    onChange={handleChange}
                                                />
                                                <span className="form-label">Entry In</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="datetime-local"
                                                    required
                                                    name="entryOut"
                                                    value={formData.entryOut}
                                                    onChange={handleChange}
                                                />
                                                <span className="form-label">Entry Out</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-btn">
                                        <button className="submit-btn">Book Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
