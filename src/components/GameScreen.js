import React from 'react';
import '../styles/GameScreen.css';
import GameBoard from './GameBoard';

function GameScreen({ onBackToMenu }) {
    return (
        <div className='game-screen'>
            <div className='game-container'>
                <div className='top-bar'>
                    <div className='timer-bar'>
                        <div className='timer-fill' style={{ width: '100%' }}></div>
                    </div>
                    <div className='score-display'>점수: 0</div>
                </div>

                <div className='game-board-placeholder'>{<GameBoard />}</div>

                <div className='bottom-bar'>
                    <button className='reset-button' onClick={onBackToMenu}>
                        메인 화면
                    </button>
                    <button className='bgm-toggle-button'>🔊 BGM On/Off</button>
                </div>
            </div>
        </div>
    );
}

export default GameScreen;
