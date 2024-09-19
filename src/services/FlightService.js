import apiInstance from './ApiService.js';

export const getFlights = async (req) => {
    try {
        const response = await apiInstance.get('flights/search', { });
        console.log(response)
        if (!response.data.success || !response?.data?.flights) return []
        return response.data.flights;
    } catch (error) {
        console.log(error)
        return []
    }
};

const FlightService = {
    getFlights
}

export default FlightService