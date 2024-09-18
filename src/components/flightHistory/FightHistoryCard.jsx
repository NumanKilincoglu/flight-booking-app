import React from 'react';
import '../../assets/style/FlightHistoryCard.css';

const FlightHistoryCard = ({ flight }) => {
    const {
        airlineLogo,
        departureTime,
        arrivalTime,
        airlineName,
        stopCount,
        flightDuration,
        departureCode,
        arrivalCode,
        flightCode,
        flightPackages,
    } = flight;

    const totalSlots = 5;
    const filledPackages = flight.flightPackages.length;
    const emptySlots = totalSlots - filledPackages;

    const emptyPackages = Array(emptySlots).fill({ packageName: '', price: '' });
    const allPackages = [...flightPackages, ...emptyPackages];

    return (
        <div className="flight-history-card">
            <div className="history-left-section">
                <div className='airline-detail'>
                    <div className='logo-wrap'>
                        <img src={airlineLogo} alt={airlineName} className="airline-logo" />
                    </div>
                    <div className="airline-info">
                        <div className='time-info'>
                            <p>{departureTime} </p> <p>&nbsp;-&nbsp;</p>  <p> {arrivalTime}</p>
                        </div>
                        <div>
                            <div className="airline-sub-info">
                                <div className="gray-bold">{airlineName}</div>
                                <button className="flight-details-btn">Flight Details
                                    <span className='dropdown-arrow'>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="middle-section">
                <div className="stop-info">
                    <div className="gray-bold">{stopCount}</div>
                    <div className="gray-light-bold">{flightDuration}</div>
                </div>
                <div className="location-info">
                    <div className="airport-codes">
                        <span className='gray-bold'>{departureCode}</span> <span className='gray-bold'>to</span> <span className='gray-bold'>{arrivalCode}</span>
                    </div>
                    <div className="gray-light-bold">{flightCode}</div>
                </div>
            </div>

            <div className="history-right-section">
                {allPackages.map((pkg, index) => (
                    <div key={index} className={`flight-package ${pkg.packageName ? '' : 'empty'}`}>
                        {pkg.packageName ? (
                            <>
                                <div className="price">{pkg.price}</div>
                                <div className="package-name">{pkg.packageName}</div>
                            </>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );

};

export default FlightHistoryCard;
