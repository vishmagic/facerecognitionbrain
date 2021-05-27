import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onFeedSubmit }) => {
    return (
        <div>
            <p className = 'f3'>
                {'This Magic Brain will detect faces in your picture. Feed the brain'}
            </p>
            <div className = 'center'>
                <div className = 'center form pa4 br3 shadow-5'>
                    <input className = 'f4 pa2 w-70 center' type = 'text' onChange = {onInputChange} />
                    <button 
                        className = 'f4 w-30 grow link ph3 pv2 dib white bg-light-purple'
                        onClick = {onFeedSubmit}
                    >Feed</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;