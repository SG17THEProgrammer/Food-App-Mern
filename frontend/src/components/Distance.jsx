import axios from 'axios';
import React, { useState } from 'react'

const Distance = () => {
    const [startAddress, setStartAddress] = useState('');
    const [endAddress, setEndAddress] = useState('');
    const [distance, setDistance] = useState(null);

    const calculateDistance = async () => {
        try {
            const response = await axios.get('http://localhost:8001/distance', {
                params: {
                    startAddress,
                    endAddress
                }
            });

            setDistance(response.data.distance);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
    <h1>Distance Calculator</h1>
            <input
                type="text"
                placeholder="Start Address"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="End Address"
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
            />
            <button onClick={calculateDistance}>Calculate Distance</button>
            {distance && <h1 style={{color:"black"}}>Distance: {distance} meters</h1>}
    </div>
  )
}

export default Distance