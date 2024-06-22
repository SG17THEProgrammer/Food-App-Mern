// Import required packages
const OpenRouteService = require('openrouteservice-js');
const axios = require('axios');



// Your OpenRouteService API key
const ORS_API_KEY = '5b3ce3597851110001cf6248aeef118a869a48068f6ec8c9e05efd77';

// const openRouteServiceApiKey = '5b3ce3597851110001cf6248aeef118a869a48068f6ec8c9e05efd77';


// Geocode an address
const geocodeAddress = async (address) => {
    const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
        params: {
            api_key: ORS_API_KEY,
            text: address
        }
    });

    if (response.data.features.length === 0) {
        throw new Error('Address not found');
    }

    return response.data.features[0].geometry.coordinates;
};

// Calculate the distance between two coordinates
const calculateDistance = async (start, end) => {
    try {
        const response = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car', {
            coordinates: [start, end]
        }, {
            headers: {
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const distance = response.data.routes[0].summary.distance; // distance in meters
        return distance;
    } catch (error) {
        throw new Error(`Distance calculation failed: ${error.message}`);
    }
};

// Endpoint to calculate distance
const distance = async (req, res) => {
    const { startAddress, endAddress } = req.query;

    try {
        const startCoords = await geocodeAddress(startAddress);
        const endCoords = await geocodeAddress(endAddress);
        const distance = await calculateDistance(startCoords, endCoords);

        res.json({ distance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {distance}
