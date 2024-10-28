import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/assets/UF-logo.svg" alt="Logo" />
            </div>
            <div className="title">
                <p>TA Assignment System</p>
            </div>
        </header>
    );
};

export default Header;