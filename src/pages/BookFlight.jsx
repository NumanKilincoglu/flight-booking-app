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

const flights = [
    {
        location: 'New York',
        destination: 'Los Angeles',
        departure: { date: '2024-09-20', time: '10:00 AM', airport: 'JFK' },
        airline: 'American Airlines',
        duration: '6h 30m',
        arrival: { date: '2024-09-20', time: '1:30 PM', airport: 'LAX' },
        price: '$250',
        travelType: 'One-way'
    },
    {
        location: 'Chicago',
        destination: 'San Francisco',
        departure: { date: '2024-09-22', time: '2:00 PM', airport: 'ORD' },
        airline: 'Delta',
        duration: '4h 15m',
        arrival: { date: '2024-09-22', time: '4:15 PM', airport: 'SFO' },
        price: '$180',
        travelType: 'Round-trip'
    }
    // Daha fazla veri ekleyebilirsiniz
];

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

const airlines = [
    { value: 'american-airlines', label: 'American Airlines' },
    { value: 'delta', label: 'Delta' },
    { value: 'united', label: 'United' },
    { value: 'southwest', label: 'Southwest' }
];



const BookFlight = () => {

    const [newFlights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightData = await FlightService.getFlights();
                setFlights(flightData);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    console.log(newFlights);

    return (
        <div className="book-flight-page">
            <div className="left-section">
                <SearchFlight />
                <div className='flights-wrap'>
                    <div className='flight-list'>
                        {flights.map((flight, index) => (
                            <FlightRecord
                                key={index}
                                location={flight.location}
                                destination={flight.destination}
                                departure={flight.departure}
                                airline={flight.airline}
                                duration={flight.duration}
                                arrival={flight.arrival}
                                price={flight.price}
                                travelType={flight.travelType}
                            />
                        ))}
                    </div>
                    <FlightFilters
                        sortOptions={sortOptions}
                        arrivalTimes={arrivalTimes}
                        stopsOptions={stopsOptions}
                        airlines={airlines}
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