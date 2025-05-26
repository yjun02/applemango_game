import React, { useEffect, useState } from 'react';
import '../styles/GameBoard.css';

const ROWS = 10; // 세로 10줄
const COLS = 17; // 가로 17칸

function generateRandomGrid() {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const number = Math.floor(Math.random() * 9) + 1;
            grid.push({ row, col, number });
        }
    }
    return grid;
}

const GameBoard = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        setGrid(generateRandomGrid());
    }, []);

    return (
        <div className='game-board'>
            {grid.map(({ row, col, number }) => (
                <div className='board-cell' key={`${row}-${col}`} data-row={row} data-col={col}>
                    {number}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
