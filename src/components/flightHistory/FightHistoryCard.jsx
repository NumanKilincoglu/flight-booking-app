import { React, useState } from 'react';
import '../../assets/style/FlightHistoryCard.css';
import { calculateDuration } from '../../utils/util.js';

const FlightHistoryCard = ({ flight }) => {
    const {
        flightName,
        flightNumber,
        airlineName,
        scheduleDateTime,
        actualOffBlockTime,
        expectedTimeGateOpen,
        expectedTimeBoarding,
        estimatedLandingTime,
        prefixIATA,
        aircraftRegistration,
        departureCode,
        route: { destinations },
        aircraftType
    } = flight;

    const [detailsVisible, setDetailsVisible] = useState(false);

    const departureTime = new Date(scheduleDateTime || actualOffBlockTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(estimatedLandingTime || expectedTimeGateOpen || expectedTimeBoarding).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const flightDuration = calculateDuration(estimatedLandingTime || expectedTimeBoarding, scheduleDateTime);
    const [arrivalCode] = destinations;

    const totalSlots = 5;
    const filledPackages = flight.farePackage?.length || 0;
    const emptySlots = totalSlots - filledPackages;

    const emptyPackages = Array(emptySlots).fill({ packageName: '', price: '' });
    const allPackages = [...flight.farePackage || [], ...emptyPackages];

    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    return (
        <div className="flight-history-card">
            <div className='history-card-content'>
                <div className="history-left-section">
                    <div className='airline-detail'>
                        <div className='logo-wrap'>
                            <img src={`https://pics.avs.io/200/50/${prefixIATA}.png`} alt={prefixIATA} className="airline-logo" />
                        </div>
                        <div className="airline-info">
                            <div className='time-info'>
                                <p>{departureTime}</p>
                                <p>&nbsp;-&nbsp;</p>
                                <p>{arrivalTime}</p>
                            </div>
                            <div>
                                <div className="airline-sub-info">
                                    <div className="gray-bold">{airlineName || prefixIATA}</div>
                                    <button onClick={toggleDetails} className="flight-details-btn">Flight Details
                                        <span className='dropdown-arrow'></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="middle-section">
                    <div className="stop-info">
                        <div className="gray-bold">{destinations?.length + ' Stop' || 'nonstop'}</div>
                        <div className="gray-light-bold">{flightDuration}</div>
                    </div>
                    <div className="location-info">
                        <div className="airport-codes">
                            <span className='gray-bold'>{departureCode}</span>
                            <span className='gray-bold'>&nbsp;to&nbsp;</span>
                            <span className='gray-bold'>{arrivalCode}</span>
                        </div>
                        <div className="gray-light-bold">{flightName}</div>
                    </div>
                </div>

                <div className="history-right-section">
                    {allPackages.map((pkg, index) => (
                        <div key={index} className={`flight-package ${pkg.packageName ? '' : 'package-empty'}`}>
                            {pkg.packageName ? (
                                <>
                                    <div className="price">${pkg.price}</div>
                                    <div className="package-name">{pkg.packageName}</div>
                                </>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

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
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {aircraftType.iataMain}</p>
                    </div>
                    <div className='flight-details'>
                        <h5 className='bold-text'>Flight</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Number: </strong> {flightNumber}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {aircraftType.iataMain}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightHistoryCard;
