import './assets/style/index.css';
import { Route, Routes } from 'react-router-dom';
import BookFlight from './pages/BookFlight.jsx';
import FlightHistory from './pages/FlightHistory.jsx';
import Navbar from './components/shared/Navbar.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<BookFlight />} />
        <Route path='/flight-history' element={<FlightHistory />} />
      </Routes>
    </div>
  );
}

export default App;
