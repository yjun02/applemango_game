import React, { useEffect, useState, useRef } from 'react';
import SelectionBoxPortal from './SelectionBoxPortal';
import '../styles/GameBoard.css';

const ROWS = 10;
const COLS = 17;

function generateRandomGrid() {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
        const rowData = [];
        for (let col = 0; col < COLS; col++) {
            rowData.push(Math.floor(Math.random() * 9) + 1);
        }
        grid.push(rowData);
    }
    return grid;
}

const GameBoard = ({ setScore }) => {
    const [grid, setGrid] = useState([]);
    const [dragStartCoord, setDragStartCoord] = useState(null);
    const [dragEndCoord, setDragEndCoord] = useState(null);
    const [selectedCells, setSelectedCells] = useState(new Set());
    const boardRef = useRef(null);

    useEffect(() => {
        setGrid(generateRandomGrid());
    }, []);

    const getScreenBoxStyle = () => {
        if (!dragStartCoord || !dragEndCoord) return null;

        const x1 = Math.min(dragStartCoord.x, dragEndCoord.x);
        const y1 = Math.min(dragStartCoord.y, dragEndCoord.y);
        const x2 = Math.max(dragStartCoord.x, dragEndCoord.x);
        const y2 = Math.max(dragStartCoord.y, dragEndCoord.y);

        return {
            left: `${x1}px`,
            top: `${y1}px`,
            width: `${x2 - x1}px`,
            height: `${y2 - y1}px`,
        };
    };

    const isDraggingRef = useRef(false);

    useEffect(() => {
        const handlePointerDown = (e) => {
            e.preventDefault();
            isDraggingRef.current = true;
            setDragStartCoord({ x: e.clientX, y: e.clientY });
            setDragEndCoord({ x: e.clientX, y: e.clientY });
        };

        const handlePointerMove = (e) => {
            if (!isDraggingRef.current) return;
            e.preventDefault();
            setDragEndCoord({ x: e.clientX, y: e.clientY });
        };

        const handlePointerUp = (e) => {
            if (!isDraggingRef.current) return;
            e.preventDefault();

            let sum = 0;
            selectedCells.forEach((key) => {
                const [r, c] = key.split(',').map(Number);
                sum += grid[r][c];
            });

            if (sum === 10 && selectedCells.size > 0) {
                setScore((prev) => prev + selectedCells.size);
                setGrid((prevGrid) => {
                    const newGrid = prevGrid.map((row) => [...row]);
                    selectedCells.forEach((key) => {
                        const [r, c] = key.split(',').map(Number);
                        newGrid[r][c] = 0;
                    });
                    return newGrid;
                });
            }

            isDraggingRef.current = false;
            setDragStartCoord(null);
            setDragEndCoord(null);
            setSelectedCells(new Set());
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [selectedCells, grid, setScore]);

    // 선택 셀 계산 (드래그 좌표 → 셀 중심 포함 여부)
    useEffect(() => {
        if (!dragStartCoord || !dragEndCoord || !boardRef.current) {
            if (selectedCells.size > 0) {
                setSelectedCells(new Set());
            }
            return;
        }

        const rect = boardRef.current.getBoundingClientRect();
        const cellWidth = rect.width / COLS;
        const cellHeight = rect.height / ROWS;

        const x1 = Math.min(dragStartCoord.x, dragEndCoord.x);
        const y1 = Math.min(dragStartCoord.y, dragEndCoord.y);
        const x2 = Math.max(dragStartCoord.x, dragEndCoord.x);
        const y2 = Math.max(dragStartCoord.y, dragEndCoord.y);

        const selected = new Set();

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                // 셀 중심의 절대 좌표 계산
                const cx = rect.left + col * cellWidth + cellWidth / 2;
                const cy = rect.top + row * cellHeight + cellHeight / 2;

                if (cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2) {
                    selected.add(`${row},${col}`);
                }
            }
        }

        const isSame = selected.size === selectedCells.size && [...selected].every((cell) => selectedCells.has(cell));

        if (!isSame) {
            setSelectedCells(selected);
        }
    }, [dragStartCoord, dragEndCoord, selectedCells]);

    return (
        <div className='game-board' ref={boardRef}>
            {/* grid 렌더링 */}
            {grid.map((row, rowIndex) =>
                row.map((number, colIndex) => {
                    const key = `${rowIndex},${colIndex}`;
                    const isSelected = selectedCells.has(key);
                    return (
                        <div key={key} className={`board-cell ${isSelected ? 'selected' : ''}`}>
                            {number}
                        </div>
                    );
                })
            )}

            {/* 드래그 박스 */}
            {dragStartCoord && dragEndCoord && <SelectionBoxPortal style={getScreenBoxStyle()} />}
        </div>
    );
};

export default GameBoard;
