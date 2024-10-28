import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <h1>
                Contact Us
            </h1>
        <p>
          Questions: <a href="mailto:rzhang1@ufl.edu">rzhang1@ufl.edu</a><br />
        </p>
        <p>
        Technical Support: <a href="mailto:consult@cise.ufl.edu">consult@cise.ufl.edu</a>
        </p>
        <img src="/assets/UF-logo.svg" alt="Logo" />
      </footer>
    );
};

export default Footer;