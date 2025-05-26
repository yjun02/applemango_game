import React, { useState, useEffect } from 'react';
import '../styles/GameScreen.css';
import GameBoard from './GameBoard';

const TIMELIMIT = 120; // 시간제한 설정

function GameScreen({ onBackToMenu }) {
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(100); // 시간 프로그래스바
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (isGameOver) return;

        const startTime = Date.now();

        const step = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const newTimeLeft = Math.max(TIMELIMIT - elapsed, 0);

            const newProgress = (newTimeLeft / TIMELIMIT) * 100;
            setProgress(newProgress);

            if (newTimeLeft <= 0) {
                setIsGameOver(true);
            } else {
                requestAnimationFrame(step);
            }
        };

        step();

        return () => cancelAnimationFrame(step);
    }, [isGameOver]);

    return (
        <div className='game-screen'>
            <div className='game-container'>
                <div className='top-bar'>
                    <div className='timer-bar'>
                        <div className='timer-fill' style={{ width: `${progress}%`, transition: 'none' }}></div>
                    </div>
                    <div className='score-display'>점수: {score}</div>
                </div>

                <div className='game-board-placeholder'>
                    <GameBoard setScore={setScore} isGameOver={isGameOver} />
                </div>

                <div className='bottom-bar'>
                    <button className='reset-button' onClick={onBackToMenu}>
                        메인 화면
                    </button>
                    <button className='bgm-toggle-button'>🔊 BGM On/Off</button>
                </div>
            </div>
            {isGameOver && (
                <div className='game-over-screen'>
                    <div className='final-score'>최종 점수: {score}</div>
                    <button onClick={onBackToMenu}>메인으로</button>
                </div>
            )}
        </div>
    );
}

export default GameScreen;
