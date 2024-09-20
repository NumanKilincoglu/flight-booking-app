import React, { useEffect, useState } from 'react';
import '../assets/style/BookFlightPage.css';
import Card from '../components/booking/Card';
import SearchFlight from '../components/booking/SearchFlight.jsx';
import FlightRecord from '../components/booking/FlightRecord.jsx';
import FlightFilters from '../components/booking/FlightFilters';
import Rental from '../assets/images/car.jpg'
import Hotel from '../assets/images/hotel.jpg'
import Travel from '../assets/images/travel.jpg';

import FlightService from '../services/FlightService';

const cards = [
    { imgSrc: Rental, title: 'CAR RENTALS' },
    { imgSrc: Hotel, title: 'HOTELS' },
    { imgSrc: Travel, title: 'TRAVEL PACKAGES' },
];

const sortOptions = [
    { value: 'lowest-price', label: 'Lowest Price' },
    { value: 'highest-price', label: 'Highest Price' },
    { value: 'duration', label: 'Duration' }
];

const arrivalTimes = [
    { value: '5am-12pm', label: '5:00 AM - 12:00 PM' },
    { value: '12pm-6pm', label: '12:00 PM - 6:00 PM' },
    { value: '6pm-12am', label: '6:00 PM - 12:00 AM' }
];

const stopsOptions = [
    { value: 'nonstop', label: 'Nonstop' },
    { value: '1-stop', label: '1 Stop' },
    { value: '2-stops', label: '2 Stops' }
];

const BookFlight = () => {
    const [newFlights, setFlights] = useState([]);
    const [airLines, setAirLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedAirline, setSelectedAirline] = useState(null);
    const [filters, setFilters] = useState({
        from: '',
        to: '',
        depart: '',
        arrival: '',
        iataCode: ''
    });

    const searchFligths = async () => {

        try {
            setLoading(true);
            const flightData = await FlightService.getFlights({
                params: {
                    from: filters.from,
                    to: filters.to,
                    depart: filters.depart,
                    arrival: filters.arrival,
                    iataCode: filters.iataCode
                }
            });
            console.log(filters);
            setFlights(flightData);
        } catch (error) {
            console.error('Error fetching flights:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowFlights = async (filter) => {
        setFilters(filter);
    };

    useEffect(() => {
        if (filters) {
            searchFligths();
        }
    }, [filters]);

    useEffect(() => {
        const fetchAirlines = async () => {
            try {

                const airlineData = await FlightService.getAirlines({
                    page: page,
                    limit: 10,
                });
                setAirLines((prev) => [...prev, ...airlineData]);
            } catch (error) {
                console.error('Error fetching airlines:', error);
            }
        };

        fetchAirlines();
    }, [page]);

    const handleLoadMoreAirlines = () => {
        setPage((prev) => prev + 1);
    };

    const handleAirlineSelect = (airlineCode) => {
        setSelectedAirline(airlineCode);
        setFilters((prevFilters) => ({
            ...prevFilters,
            iataCode: airlineCode
        }));
    };

    return (
        <div className="book-flight-page">
            <div className="left-section">
                <SearchFlight onSearch={handleShowFlights} />
                <div className='flights-wrap'>
                    {loading && (
                        <div className="overlay">
                            <div className="loading">
                                <div className="spinner"></div>
                                <span>Loading</span>
                            </div>
                        </div>
                    )}
                    {newFlights.length > 0 ? (
                        <div className='flight-list'>
                            {newFlights.map((flight, index) => (
                                <FlightRecord
                                    key={index}
                                    flight={flight}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">No flights available</div>
                    )}
                    <FlightFilters
                        sortOptions={sortOptions}
                        arrivalTimes={arrivalTimes}
                        stopsOptions={stopsOptions}
                        airlines={airLines}
                        airlineLoadMore={handleLoadMoreAirlines}
                        onAirlineSelect={handleAirlineSelect}
                    />
                </div>
            </div>
            <div className="right-section">
                {cards.map((card, index) => (
                    <Card key={index} imgSrc={card.imgSrc} title={card.title} />
                ))}
            </div>
        </div>
    );
};

export default BookFlight;