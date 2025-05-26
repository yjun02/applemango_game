import React from 'react';

function MainMenu({ onStart }) {
    return (
        <div className='main-menu'>
            <h1 className='title'>🥭 애플망고 게임</h1>
            <button className='start-button' onClick={onStart}>
                게임 시작
            </button>
        </div>
    );
}

export default MainMenu;
