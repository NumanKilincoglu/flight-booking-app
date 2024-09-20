import React from 'react';
import '../../assets/style/FlightRecord.css';
import Departure from '../../assets/images/departures.png';
import Arrival from '../../assets/images/arrivals.png';
import Plane from '../../assets/images/plane.png';

const FlightRecord = ({ flight }) => {

    const formatDate = (dateString) => {
        if (!dateString) return;
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(date);
    };

    const calculateDuration = (startDate, endDate) => {
        if (!startDate | !endDate) return "0H";

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffMs = Math.abs(end - start);

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${String(diffHours).padStart(2, '0')}h ${String(diffMinutes).padStart(2, '0')}M`;
    };

    return (
        <div className="flight-record">
            <div className="top-section">
                <h4>{'AMS'}</h4>
                <h4>-</h4>
                <h4>{flight.route.destinations[0]}</h4>
            </div>
            <div className="details-section">
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Departure}></img>
                        <p className='bold-text gray'>Departure</p>
                    </div>
                    <p className='bold-text dark-gray'>{formatDate(flight.scheduleDateTime)}</p>
                    <p className='bold-text gray'>Airport: {flight.publicFlightState.flightStates[0]}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div className="airline">
                    <img
                        alt={flight.prefixIATA}
                        className='airline-icon'
                        src={`https://pics.avs.io/200/50/${flight.prefixIATA}.png`}
                        onError={(e) => e.target.src = ''} />

                    <img alt="airplane" className='flight-icon' src={Plane}></img>
                    <p className='bold-text'>{calculateDuration(flight.estimatedLandingTime, flight.scheduleDateTime)}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Arrival}></img>
                        <p className='bold-text gray'>Arrival</p>
                    </div>
                    <p className='bold-text dark-gray'> {formatDate(flight.estimatedLandingTime)}</p>
                    <p className='bold-text gray'>Airport: {flight.route.destinations[0]}</p>
                </div>
            </div>
            <div className="bottom-section">
                <div className="price-info">
                    <p className='price-tag'>Price: {'100$'}</p>
                    <p className='bold-text gray'>{'Round'}</p>
                </div>
                <button className="book-flight">Book Flight</button>
            </div>
            <button className="check-details">Check the details</button>

        </div>
    );
};

export default FlightRecord;
