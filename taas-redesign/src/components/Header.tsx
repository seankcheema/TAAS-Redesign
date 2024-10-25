import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="./assets/UF-logo" alt="Logo" />
            </div>
            <div className="title">
                <h1>TA Assignment System</h1>
            </div>
        </header>
    );
};

export default Header;