import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

const GameOfLife = () => {
    const [size, setSize] = useState(20)
    const [rows, setRows] = useState(5)
    const [cols, setCols] = useState(5)
    const [running, setRunning] = useState(false)
    const [generation, setGeneration] = useState(0)
    const [run, setRun] = useState(false)
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

    const createGrid = () => {
        const board = []
        for (let i = 0; i < rows; i++) {
            board[i] = []
            for (let j = 0; j < cols; j++) {
                board[i][j] = 0
            }
        }
        return board
    }
    
    const [grid, setGrid] = useState(createGrid())
    
    const updateCells = (x, y) => {
        const newGrid = grid.map((row, i) => {
            if (i === x) {
                return row.map((col, j) => {
                    if (j === y) {
                        return col === 0 ? 1 : 0
                    } else {
                        return col
                    }
                })
            } else {
                return row
            }
        })
        setGrid(() => newGrid)
    }
    const calculateNeighbors = (board, x, y) => {
        let neighbors = 0
        possibleNeighbors.forEach(dir => {
            const nX = dir[0] + x
            const nY = dir[1] + y
            if (nX >= 0 && nX < cols && nY >=0 && nY < rows && board[nX][nY]) {
                neighbors ++
            }
        })
        return neighbors
    }

    const toggleRunning = () => {
        if (running){
            setRunning(false)
            setRun(false)
        } else {
            setRunning(true)
            runSimulation()
        }
    }
    
    useEffect(() => {
        let run = true

        const changeRun = () => {
            if (run){
                run = false
            } else {
                run = true
            }
        }
        
        setRun(changeRun)

        if (run){
            const runSimulation = () => {
            const tempGrid = createGrid()
            for (let i=0; i<rows; i++){
                for (let j=0; j<cols; j++){
                    let neighbors = calculateNeighbors(grid, i, j)
                    if (neighbors < 2 || neighbors > 3){
                        tempGrid[i][j] = 0 
                    } else if (grid[i][j] === 0 && neighbors === 3){
                        tempGrid[i][j] = 1
                    } else if (grid[i][j] === 1 && neighbors === 3 || grid[i][j] === 1 && neighbors === 2){
                        tempGrid[i][j] = 1
                    }
                }
            }
            setGrid(tempGrid)
            console.log(running)
            if (running){
                setTimeout(() => {
                    runSimulation()
                }, 1000)
            }
        }
    }
}, [running])

    useEffect(() => {
        console.log('use effect: ', grid)
    }, [grid])

    return <div>
        <Grid 
            grid={grid}
            cellSize={size}
            rows={rows}
            cols={cols}
            updateCells={updateCells}
            running={running}
        />
        <div className='controls'>
            <button onClick={() => toggleRunning()}>{running ? 'stop' : 'start'}</button>
        </div>
    </div>
}


export default GameOfLife