import React from 'react'
import '../assets/style/FlightHistoryPage.css';
import FilterSection from '../components/flightHistory/Filters.jsx';
import SortSection from '../components/flightHistory/SortSection.jsx';
import FlightHistoryCard from '../components/flightHistory/FightHistoryCard';

const sortOptions = [
  { value: 'lowest-price', label: 'Lowest Price' },
  { value: 'highest-price', label: 'Highest Price' },
  { value: 'shortest-duration', label: 'Shortest Duration' },
  { value: 'earliest-departure', label: 'Earliest Departure' }
];

const flightDataList = [
  {
    airlineLogo: 'https://www.skyscanner.net/images/airlines/small/H9.png',
    departureTime: '10:30 AM',
    arrivalTime: '1:45 PM',
    airlineName: 'Pegasus',
    stopCount: "1 Stop",
    flightDuration: '3h 15m',
    departureCode: 'JFK',
    arrivalCode: 'LAX',
    flightCode: 'DL 123',
    price: '$350',
    flightPackages: [
      { packageName: 'Main', price: '$350' },
      { packageName: 'Comfort+', price: '$450' },
      { packageName: 'Plus', price: '$550' },
    ],
  },
  {
    airlineLogo: 'https://www.skyscanner.net/images/airlines/small/21.png',
    departureTime: '2:00 PM',
    arrivalTime: '4:30 PM',
    airlineName: 'American Airlines',
    stopCount: "Nonstop",
    flightDuration: '2h 30m',
    departureCode: 'ORD',
    arrivalCode: 'DFW',
    flightCode: 'AA 456',
    price: '$99900',
    flightPackages: [
      { packageName: 'Main', price: '$900' },
      { packageName: 'Comfort+', price: '$800' },
    ],
  },
];

const FlightHistory = () => {
  return (
    <div className="flight-history-page">
      <FilterSection />
      <div className='main-wrap'>
        <SortSection avgFare="$500" sortOptions={sortOptions} />
        <div className="history-list">
          {flightDataList.map((flight, index) => (
            <FlightHistoryCard key={index} flight={flight} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default FlightHistory