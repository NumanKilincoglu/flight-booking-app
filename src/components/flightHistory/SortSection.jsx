import '../../assets/style/SortSection.css';
import React from 'react';
import Info from '../../assets/images/info.png';

const SortSection = ({ avgFare, sortOptions, onSortSelect }) => {

    const handleShowFlights = (event) => {
        const selectedOption = event.target.value.split('|');
        const [value, order] = selectedOption;
        onSortSelect({ value, order });
    };

    return (
        <div className="sort-section">
            <div className="sort-left">
                <div className='sort-label'>
                    <h4 className="sort-label">Sort by:</h4>
                </div>
                <select className="sort-dropdown" onChange={handleShowFlights}>
                    {sortOptions.map((option, index) => (
                        <option key={index} value={`${option.value}|${option.order}`}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className='arrow-down'>
                </div>
            </div>
            <div className="sort-right">
                <img alt='info' className='flight-icon' src={Info}></img>
                <span className="avg-fare">Average Fare: ${avgFare}</span>
            </div>
        </div>
    );
};

export default SortSection;
