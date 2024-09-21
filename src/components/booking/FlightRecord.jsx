import { React, useState } from 'react';
import '../../assets/style/FlightRecord.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Departure from '../../assets/images/departures.png';
import Arrival from '../../assets/images/arrivals.png';
import Plane from '../../assets/images/plane.png';
import FlightService from '../../services/FlightService';
import { calculateDuration, formatDate } from '../../utils/util.js';

const FlightRecord = ({ flight }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const {
        flightName,
        flightNumber,
        scheduleDateTime,
        actualOffBlockTime,
        expectedTimeGateOpen,
        expectedTimeBoarding,
        estimatedLandingTime,
        prefixIATA,
        aircraftRegistration,
        departureCode,
        route: { destinations },
        aircraftType,
        farePrice,
        tripType
    } = flight;

    const bookFlight = async () => {

        try {

            const dateLimit = (flight.expectedTimeGateClosing || expectedTimeBoarding || expectedTimeGateOpen)

            if (new Date(dateLimit) < new Date()) {
                return toast.error('Cannot book a flight that has already departed.');
            }

            const response = await FlightService.bookFlight({ data: flight });
            if (!response) return toast.error('Already booked the flight. Plase, check the My Flights page.');
            toast.success('Flight booked successfully!');
        } catch (error) {
            return toast.error('An error occurred.');
        }

    };

    const flightDuration = calculateDuration(estimatedLandingTime || expectedTimeBoarding || actualOffBlockTime, scheduleDateTime)

    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    return (
        <div className="flight-record">
            <div className="top-section">
                <h4>{departureCode}</h4>
                <h4>-</h4>
                <h4>{destinations[0]}</h4>
            </div>
            <div className="details-section">
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Departure}></img>
                        <p className='bold-text gray'>Departure</p>
                    </div>
                    <p className='bold-text dark-gray'>{formatDate(scheduleDateTime)}</p>
                    <p className='bold-text gray'>Airport: {departureCode}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div className="airline">
                    <img
                        alt={prefixIATA}
                        className='airline-icon'
                        src={`https://pics.avs.io/200/50/${prefixIATA}.png`}
                        onError={(e) => e.target.src = ''} />

                    <img alt="airplane" className='flight-icon' src={Plane}></img>
                    <p className='bold-text'>{flightDuration}</p>
                </div>
                <div className='line-wrap'>
                    <div className='line'></div>
                </div>
                <div>
                    <div className='f g5'>
                        <img alt="airplane" className='flight-icon' src={Arrival}></img>
                        <p className='bold-text gray'>Arrival</p>
                    </div>
                    <p className='bold-text dark-gray'> {formatDate(estimatedLandingTime || expectedTimeBoarding || actualOffBlockTime)}</p>
                    <p className='bold-text gray'>Airport: {destinations[0]}</p>
                </div>
            </div>
            <div className="bottom-section">
                <div className="price-info">
                    <p className='price-tag'>Price: ${farePrice || '0'}</p>
                    <p className='bold-text gray'>{tripType}</p>
                </div>
                <button onClick={bookFlight} className="book-flight">Book Flight</button>
            </div>
            <button onClick={toggleDetails} className="check-details">Check the details</button>

            {detailsVisible && (
                <div className="flight-details-section">
                    <div className='flight-details'>
                        <h5 className='bold-text'>Boarding</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Boarding Time: </strong> {new Date(expectedTimeBoarding).toLocaleTimeString()}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Gate Opens: </strong> {new Date(expectedTimeGateOpen).toLocaleTimeString()}</p>
                        <p className='gray bold-text'>
                            <strong className='gray-light-bold'>Landing: </strong>
                            {estimatedLandingTime ? new Date(estimatedLandingTime).toLocaleTimeString() : 'To Be Announced'}
                        </p>
                    </div>
                    <div className='flight-details'>
                        <h5 className='bold-text'>Aircraft</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Registration: </strong> {aircraftRegistration}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {aircraftType?.iataMain}</p>
                    </div>
                    <div className='flight-details'>
                        <h5 className='bold-text'>Flight</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Number: </strong> {flightNumber}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Name: </strong> {flightName}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {aircraftType?.iataMain}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightRecord;
