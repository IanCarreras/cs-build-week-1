import React, { useState } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

const GameOfLife = () => {
    const [size, setSize] = useState(20)
    const [rows, setRows] = useState(5)
    const [cols, setCols] = useState(5)
    const [grid, setGrid] = useState([])
    const [cells, setCells] = useState([])

    const createGrid = () => {
        const board = []
        for (let i = 0; i < rows; i++) {
            board.push(Array.from(Array(cols), () => 0))
        }
        return setGrid(board)
    }
    
    return <div>
        <Grid 
            grid={grid}
            cellSize={size}
            rows={rows}
            cols={cols}
        />
        <div className='controls'>
            <button onClick={() => createGrid()}>Create Board</button>
        </div>
    </div>
}



export default GameOfLife