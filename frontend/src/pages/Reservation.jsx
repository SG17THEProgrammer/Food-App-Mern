import React, { useState } from 'react';
import '../css/Reservation.css';

const Reservation = () => {
    const [formData, setFormData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        rooms: '',
        adults: '',
        children: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div id="booking" className="section">
            <div className="section-center">
                <div className="container">
                    <div className="row">
                        <div className="booking-form">
                            <div className="form-header">
                                <h1>Make your reservation</h1>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Country, ZIP, city..."
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                    />
                                    <span className="form-label">Destination</span>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="date"
                                                required
                                                name="checkIn"
                                                value={formData.checkIn}
                                                onChange={handleChange}
                                            />
                                            <span className="form-label">Check In</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="date"
                                                required
                                                name="checkOut"
                                                value={formData.checkOut}
                                                onChange={handleChange}
                                            />
                                            <span className="form-label">Check Out</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                required
                                                name="rooms"
                                                value={formData.rooms}
                                                onChange={handleChange}
                                            >
                                                <option value="" hidden>no of rooms</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                            <span className="form-label">Rooms</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                required
                                                name="adults"
                                                value={formData.adults}
                                                onChange={handleChange}
                                            >
                                                <option value="" hidden>no of adults</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                            <span className="form-label">Adults</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                required
                                                name="children"
                                                value={formData.children}
                                                onChange={handleChange}
                                            >
                                                <option value="" hidden>no of children</option>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                            <span className="form-label">Children</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
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
                                            <input
                                                className="form-control"
                                                type="tel"
                                                placeholder="Enter your Phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            <span className="form-label">Phone</span>
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
            <a target="_blank" href="https://gosnippets.com" className="white-mode">MORE</a>
        </div>
    );
};

export default Reservation;
