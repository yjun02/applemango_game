import React, { useState } from 'react';
import '../styles/GameScreen.css';
import GameBoard from './GameBoard';

function GameScreen({ onBackToMenu }) {
    const [score, setScore] = useState(0); // ← 상태 추가

    return (
        <div className='game-screen'>
            <div className='game-container'>
                <div className='top-bar'>
                    <div className='timer-bar'>
                        <div className='timer-fill' style={{ width: '100%' }}></div>
                    </div>
                    <div className='score-display'>점수: {score}</div> {/* ← 여기 표시 */}
                </div>

                <div className='game-board-placeholder'>
                    <GameBoard setScore={setScore} /> {/* ← props로 전달 */}
                </div>

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
