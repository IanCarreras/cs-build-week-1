import React from 'react';
import GameOfLife from './components/GameOfLife'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Game of Life</h1>
      <p>
        Each box is a cell.  Each adjacent box is a neighbor.<br/>
        Any live cell with fewer than two live neighbors dies, as if by underpopulation.<br/>
        Any live cell with two or three live neighbors lives on to the next generation.<br/>
        Any live cell with more than three live neighbors die, as if by overpopulation.<br/>
        Any dead vell with exactly three live neighbors becomes a live cell, as if by reproduction.
      </p>
      <GameOfLife />
    </div>
  );
}

export default App;
