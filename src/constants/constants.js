import Rental from '../assets/images/car.jpg'
import Hotel from '../assets/images/hotel.jpg'
import Travel from '../assets/images/travel.jpg';

const HistorySortOptions = [
    { value: 'farePrice', label: 'Lowest Price', order: 'ASC' },
    { value: 'farePrice', label: 'Highest Price', order: 'DESC' },
    { value: 'scheduleDate', label: 'Earliest Flight', order: 'ASC' },
    { value: 'scheduleDate', label: 'Latest Flight', order: 'DESC' },
    { value: 'flightName', label: 'Flight Name', order: 'ASC' },
    { value: 'airlineCode', label: 'Airline', order: 'ASC' },
];

const StopsOptions = [
    { value: 'nonstop', label: 'Nonstop' },
    { value: '1-stop', label: '1 Stop' },
    { value: '2-stops', label: '2 Stops' }
];

const FlightSortOptions = [
    { value: 'airlineCode', label: 'Airline' },
    { value: 'scheduleDate', label: 'Flight Date' },
    { value: 'scheduleTime', label: 'Flight Time' }
];

const FlightArrivalTimes = [
    { value: '5am-12pm', label: '5:00 AM - 12:00 PM' },
    { value: '12pm-6pm', label: '12:00 PM - 6:00 PM' },
    { value: '6pm-12am', label: '6:00 PM - 12:00 AM' }
];

const Cards = [
    { imgSrc: Rental, title: 'CAR RENTALS' },
    { imgSrc: Hotel, title: 'HOTELS' },
    { imgSrc: Travel, title: 'TRAVEL PACKAGES' },
];

export { HistorySortOptions, StopsOptions, FlightSortOptions, FlightArrivalTimes, Cards };