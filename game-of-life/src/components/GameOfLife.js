import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

const GameOfLife = () => {
    const [size, setSize] = useState(20)
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(10)
    const [grid, setGrid] = useState([])
    const [running, setRunning] = useState(false)
    
    const cells = grid
    const possibleNeighbors = [
        [0,1],
        [0,-1],
        [1,0],
        [1,1],
        [1,-1],
        [-1,0],
        [-1,1],
        [-1,-1]
    ] 

    const calculateNeighbors = () => {

    }

    const setCells = (x, y, status) => {
        cells[x][y] = status
        console.log(cells)
    }

    const createGrid = () => {
        const board = []
        for (let i = 0; i < rows; i++) {
            board.push(Array.from(Array(cols), () => 0))
        }
        return setGrid(board)
    }

    const runSimulation = () => {
        if (running) {
            setRunning(false)
            return 
        } else if (!running) {
            setRunning(true)

        }
    }
    
    useEffect(() => {
        createGrid()
    }, [])

    return <div>
        <Grid 
            grid={grid}
            cellSize={size}
            rows={rows}
            cols={cols}
            setCells={setCells}
            running={running}
        />
        <div className='controls'>
            <button onClick={() => runSimulation()}>{running ? 'stop' : 'start'}</button>
        </div>
    </div>
}



export default GameOfLife