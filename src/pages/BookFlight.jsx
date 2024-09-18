import React from 'react';
import '../assets/style/BookFlightPage.css';
import Card from '../components/booking/Card';
import SearchFlight from '../components/booking/SearchFlight';
import Rental from '../assets/images/car.jpg'
import Hotel from '../assets/images/hotel.jpg'
import Travel from '../assets/images/travel.jpg'
const BookFlight = () => {

    const cards = [
        { imgSrc: Rental, title: 'CAR RENTALS' },
        { imgSrc: Hotel, title: 'HOTELS' },
        { imgSrc: Travel, title: 'TRAVEL PACKAGES' },
    ];

    return (
        <div className="book-flight-page">
            <div className="left-section">
                <SearchFlight />
                <div className='flights-wrap'>
                    <div className='flight-list'>

                    </div>
                    <div className='flight-filters'>

                    </div>
                </div>
            </div>
            <div className="right-section">
                {cards.map((card, index) => (
                    <Card key={index} imgSrc={card.imgSrc} title={card.title} />
                ))}
            </div>
        </div>
    );
};

export default BookFlight;