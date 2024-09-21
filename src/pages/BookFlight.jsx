import { useEffect, useState, useCallback } from 'react';
import '../assets/style/BookFlightPage.css';
import Card from '../components/booking/Card';
import LoadingScreen from '../components/shared/Loading';
import SearchFlight from '../components/booking/SearchFlight.jsx';
import FlightRecord from '../components/booking/FlightRecord.jsx';
import FlightFilters from '../components/booking/FlightFilters';
import Rental from '../assets/images/car.jpg'
import Hotel from '../assets/images/hotel.jpg'
import Travel from '../assets/images/travel.jpg';
import LoadMore from '../components/flightHistory/LoadMore';
import FlightService from '../services/FlightService';

const cards = [
    { imgSrc: Rental, title: 'CAR RENTALS' },
    { imgSrc: Hotel, title: 'HOTELS' },
    { imgSrc: Travel, title: 'TRAVEL PACKAGES' },
];

const sortOptions = [
    { value: 'airlineCode', label: 'Airline' },
    { value: 'scheduleDate', label: 'Flight Date' },
    { value: 'scheduleTime', label: 'Flight Time' }
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
    const [filters, setFilters] = useState({
        from: '',
        to: '',
        depart: '',
        arrival: '',
        iataCode: '',
        sortBy: 'scheduleTime',
        page: 0
    });

    const getAllFligths = useCallback(async () => {
        try {
            setLoading(true);
            const flightData = await FlightService.searchFlights({
                params: {
                    from: filters.from,
                    to: filters.to,
                    depart: filters.depart,
                    arrival: filters.arrival,
                    iataCode: filters.iataCode,
                    sortBy: filters.sortBy,
                    page: filters.page,
                }
            });
            if (filters.page === 0) {
                setFlights(flightData);
            } else {
                setFlights((prevFlights) => [...prevFlights, ...flightData]);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const handleShowFlights = async (filter) => {
        setFilters(filter);
    };

    useEffect(() => {
        if (filters) {
            getAllFligths();
        }
    }, [filters, getAllFligths]);

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
        setFilters((prevFilters) => ({
            ...prevFilters,
            iataCode: airlineCode
        }));
    };

    const handleSort = (sortCode) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: sortCode
        }));
    };

    const nextPage = () => {
        const previousPage = filters.page;
        setFilters({ page: previousPage + 1 })
    };

    return (
        <div className="book-flight-page">
            <div className="left-section">
                <SearchFlight onSearch={handleShowFlights} />
                <div className='flights-wrap'>
                    {loading && <LoadingScreen />}

                    {newFlights.length > 0 ? (
                        <div className='flight-list-wrap'>
                            {newFlights.map((flight, index) => (
                                <FlightRecord key={index} flight={flight} />
                            ))}
                            <LoadMore onNextPage={nextPage} />
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
                        onSortSelect={handleSort}
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