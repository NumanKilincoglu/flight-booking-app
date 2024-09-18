import '../../assets/style/Navbar.css';
import Logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/profile.png';
import Discover from '../../assets/images/earth.png';
import Deals from '../../assets/images/price-tag.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Logo" />
                <h4>Plane Scape</h4>
            </div>
            <div className="navbar-menu">
                <a href="/deals">
                    <img
                        src={Deals}
                        alt="User Avatar"
                        className="nav-icon"
                    />
                    Deals

                </a>
                <a href="/discover">
                    <img
                        src={Discover}
                        alt="User Avatar"
                        className="nav-icon"
                    />
                    Discover
                </a>
                <div className="navbar-user">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="user-avatar"
                    />
                    <span className="user-name">Joane Smith</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;