import React, { useEffect, useState } from 'react';
import '../../assets/style/SearchFlight.css';
import Plane from '../../assets/images/plane.png';
import FlightService from '../../services/FlightService';
import Departure from '../../assets/images/departures.png';
import Arrival from '../../assets/images/arrivals.png';

const SearchFlight = ({ onSearch }) => {
  const [filter, setFilter] = useState({
    from: 'AMS',
    to: '',
    depart: '',
    arrival: '',
    iataCode: '',
    page: 0
  });

  const [toDestinations, setToDestination] = useState([]);
  const [filteredToDestinations, setFilteredToDestinations] = useState([]);
  const [showToDropdown, setShowToDropdown] = useState(false);


  useEffect(() => {
    const fetchToDestinations = async () => {
      if (filter.to) {
        try {
          const flightData = await FlightService.getDestinations({ search: filter.to });
          setToDestination(flightData);
        } catch (error) {
          console.error('Error fetching to destinations:', error);
        }
      }
    };

    fetchToDestinations();
  }, [filter.to]);

  useEffect(() => {
    if (filter.to && toDestinations.length) {
      setFilteredToDestinations(toDestinations);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }
  }, [filter.to, toDestinations]);

  useEffect(() => {
    if (toDestinations.length) {
      setFilteredToDestinations(toDestinations);
      setShowToDropdown(true);
    } else {
      setShowToDropdown(false);
    }

  }, [toDestinations]);

  const handleToDestination = (selectedDestination, event) => {
    event.stopPropagation();
    setFilter(prev => ({ ...prev, to: selectedDestination.iata }));
    setShowToDropdown(false);
  };

  const handleShowFlights = () => {
    onSearch(filter);
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
            <div className='input-container left-radius'>
              <img alt='arrival' src={Departure} />
              <input
                className='left-radius'
                type="text"
                value={'AMS'}
                onChange={(e) => setFilter(prev => ({ ...prev, from: e.target.value }))}
                disabled
              />
            </div>

          </div>
          <div className='w100'>
            <label>To</label>
            <div className="input-container right-radius">
              <img alt='arrival' src={Arrival} />
              <input
                className="right-radius"
                type="text"
                value={filter.to}
                onChange={(e) => setFilter(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            {showToDropdown && (
              <ul className="dropdown-menu">
                {filteredToDestinations.map((dest, index) => (
                  <li
                    key={index}
                    onClick={(e) => handleToDestination(dest, e)}
                    className="dropdown-item"
                  >
                    {`${dest?.publicName?.english} (${dest?.iata || ''})`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='date-wrap'>
          <div className='w100'>
            <label>Depart</label>
            <div className='input-container left-radius'>
              <input
                type="date"
                value={filter.depart}
                onChange={(e) => setFilter(prev => ({ ...prev, depart: e.target.value }))}
              />
            </div>
          </div>
          <div className='w100'>
            <label>Return</label>
            <div className='input-container right-radius'>
              <input
                type="date"
                value={filter.arrival}
                onChange={(e) => setFilter(prev => ({ ...prev, arrival: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <button className='show-flight' onClick={handleShowFlights}>Show Flights</button>
    </div>
  );
};

export default SearchFlight;
