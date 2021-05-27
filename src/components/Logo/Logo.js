import React from 'react';
import Tilt from 'react-tilt';
import fgrprint from './fingerprint.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 50, width: 50 }} >
                <div className="Tilt-inner"> 
                    <img alt = 'logo' src = {fgrprint}/> 
                </div>
            </Tilt>
        </div>
        // <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    );
}

export default Logo;