import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const handleLogin = () => {
        
    };

    return (
        <div>   
            <Header />
            <div className='landing-page'>
                <div className='image-container'>
                    <img src="./assets/mala.png" alt="mala" className='mala-img' />
                    <div className='login-box'>
                        <h3>Log in</h3>
                        <button className='login-btn' onClick={handleLogin}>
                            Log in with GatorLink
                        </button>
                    </div>
                </div>
                <h2>What is the TAAS?</h2>
                <p>
                    The TA Assignment System (TAAS) is a system where students can apply to TA positions within the CISE department and educators can select their TAs for their courses.
                </p>
            </div>
            <div className='footer-container'>
            <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
