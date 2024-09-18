import React, { useState } from 'react';
import '../../assets/style/SearchFlight.css';
import Plane from '../../assets/images/plane.png';

const SearchFlight = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleShowFlights = () => {
    console.log('Flights are being searched for:', { location, destination, departureDate, returnDate });
  };

  return (
    <div className="book-your-flights">
      <div className='search-top'>
        <div className='title'>
          <img alt="airplane" className='flight-icon' src={Plane}></img>
          <h2>BOOK YOUR FLIGHT</h2>
        </div>

        <div className='trip-type'>
          <button className='left'>Round Trip</button>
          <button className='right'>One Way</button>
        </div>
      </div>
      <div className='search-wrap'>
        <div className='location-wrap'>
          <div className='w100'>
            <label>From</label>
            <input className='left-radius' type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className='w100'>
            <label>To</label>
            <input className='right-radius' type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
        </div>
        <div className='date-wrap'>
          <div className='w100'>
            <label>Depart</label>
            <input className='left-radius' type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          </div>
          <div className='w100'>
            <label>Return</label>
            <input className='right-radius' type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        </div>
      </div>

      <button className='show-flight' onClick={handleShowFlights}>Show Flights</button>
    </div>
  );
};

export default SearchFlight;