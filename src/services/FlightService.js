import apiInstance from './ApiService.js';

export const getFlights = async (req) => {
    try {
        const response = await apiInstance.get('flights/search', { params: req.params });
        if (!response.data.success || !response?.data?.flights) return []
        return response.data.flights;
    } catch (error) {
        console.log(error)
        return []
    }
};

export const getDestinations = async (req) => {
    try {
        const response = await apiInstance.get('flights/destinations', { params: { search: req.search } });
        if (!response.data.success || !response?.data?.destinations) return []
        return response.data.destinations;
    } catch (error) {
        console.log(error)
        return []
    }
};

export const getAirlines = async (req) => {
    try {
        const response = await apiInstance.get('flights/airlines', { params: { page: req.page, limit: req.limit } });
        if (!response.data.success || !response?.data?.airlines) return []
        return response.data.airlines;
    } catch (error) {
        console.log(error)
        return []
    }
};

const FlightService = {
    getFlights,
    getDestinations,
    getAirlines
}

export default FlightService