import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen'; // 다음 단계에서 만들 예정
import './styles/MainMenu.css';

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <div className='App'>
            {isGameStarted ? <GameScreen onBackToMenu={() => setIsGameStarted(false)} /> : <MainMenu onStart={() => setIsGameStarted(true)} />}
        </div>
    );
}

export default App;
