import React from 'react';
import '../../assets/style/FlightFilters.css';

const FlightFilters = ({ sortOptions, arrivalTimes, stopsOptions, airlines }) => {
    return (
        <div className="flight-filters">
            <div className="filter-section">
                <h4>Sort By</h4>
                <select className="flight-sort-dropdown">
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Arrival Times</h4>
                {arrivalTimes.map(time => (
                    <label key={time.value} className="radio-label">
                        <input type="radio" name="arrival-time" value={time.value} />
                        {time.label}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h4>Stops</h4>
                {stopsOptions.map(stop => (
                    <label key={stop.value} className="radio-label">
                        <input type="radio" name="stops" value={stop.value} />
                        {stop.label}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h4>Airlines</h4>
                {airlines.map(airline => (
                    <label key={airline.value} className="radio-label">
                        <input type="radio" name="airlines" value={airline.value} />
                        {airline.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FlightFilters;
