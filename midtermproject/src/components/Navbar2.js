
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar2.css'; 

const Navbar2 = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item">   
                    <Link to="/products" className="navbar-link">Add Products</Link>
                    <Link to="/category" className="navbar-link">Category Details</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar2;
