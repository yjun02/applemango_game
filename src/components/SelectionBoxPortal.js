import React from 'react';
import ReactDOM from 'react-dom';

const SelectionBoxPortal = ({ style }) => {
    return ReactDOM.createPortal(
        <div className='selection-box' style={{ ...style, position: 'fixed', pointerEvents: 'none', zIndex: 1000 }} />,
        document.body
    );
};

export default SelectionBoxPortal;
