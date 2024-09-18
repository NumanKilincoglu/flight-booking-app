import React from 'react';
import '../../assets/style/FlightRecord.css';
import Departure from '../../assets/images/departures.png';
import Arrival from '../../assets/images/arrivals.png';
import Plane from '../../assets/images/plane.png';

const FlightRecord = ({ location, destination, departure, airline, duration, arrival, price, travelType }) => {
    return (
        <div className="flight-record">
            <div className="top-section">
                <h4>{location}</h4>
                <h4>-</h4>
                <h4>{destination}</h4>
            </div>
            <div className="details-section">
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Departure}></img>
                        <p className='bold-text gray'>Departure</p>
                    </div>
                    <p className='bold-text dark-gray'>{departure.time}</p>
                    <p className='bold-text gray'>Airport: {departure.airport}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div className="airline">
                    <p className='bold-text'>{airline}</p>
                    <img alt="airplane" className='flight-icon' src={Plane}></img>
                    <p className='bold-text'>{duration}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Arrival}></img>
                        <p className='bold-text gray'>Arrival</p>
                    </div>
                    <p className='bold-text dark-gray'> {arrival.time}</p>
                    <p className='bold-text gray'>Airport: {arrival.airport}</p>
                </div>
            </div>
            <div className="bottom-section">
                <div className="price-info">
                    <p className='price-tag'>Price: {price}</p>
                    <p className='bold-text gray'>{travelType}</p>
                </div>
                <button className="book-flight">Book Flight</button>
            </div>
            <button className="check-details">Check the details</button>

        </div>
    );
};

export default FlightRecord;
