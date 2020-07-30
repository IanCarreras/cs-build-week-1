import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

const GameOfLife = () => {
    const [size, setSize] = useState(20)
    const [rows, setRows] = useState(5)
    const [cols, setCols] = useState(5)
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

    const calculateNeighbors = (board, x, y) => {
        let neighbors = 0
        possibleNeighbors.forEach(dir => {
            const nY = dir[0] + y
            const nX = dir[1] + x
            if (nX >= 0 && nX < cols && nY >=0 && nY < rows && board[nY][nX]) {
                console.log(nX, nY)
                console.log(cells[nX][nY])
                neighbors += cells[nX][nY]
                console.log('neighbors: ', neighbors)
            }
        })
        console.log('neighbors: ', neighbors)
        return neighbors
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
        console.log('running: ', running)
        if (running) {
            setRunning(false)
            return 
        } else if (!running) {
            setRunning(true)
            calculateNeighbors()
            return
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
            // running={running}
        />
        <div className='controls'>
            <button onClick={() => runSimulation()}>{running ? 'stop' : 'start'}</button>
        </div>
    </div>
}



export default GameOfLife