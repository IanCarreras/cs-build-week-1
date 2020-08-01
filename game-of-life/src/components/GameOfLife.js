import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

const GameOfLife = () => {
    const [size, setSize] = useState(20)
    const [rows, setRows] = useState(5)
    const [cols, setCols] = useState(5)
    const [running, setRunning] = useState(false)
    
    const [cells, setCells] = useState([])
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

    const start = () => {
        
    }
    
    const runSimulation = () => {
        console.log('start cells: ', cells)
        if (running) {
            setRunning(false)
            return 
        } else if (!running) {
            const tempGrid = createGrid()
            setRunning(true)
            for (let i=0; i<rows; i++){
                for (let j=0; j<cols; j++){
                    let neighbors = calculateNeighbors(grid, i, j)
                    console.log('\n')
                    if (neighbors < 2 || neighbors > 3){
                        console.log(`grid[${i}][${j}]: `, tempGrid[i][j])
                        console.log('neighbors: ', neighbors)
                        tempGrid[i][j] = 0 
                        console.log(tempGrid)
                    } else if (grid[i][j] === 0 && neighbors === 3){
                        console.log(`grid[${i}][${j}]: `, tempGrid[i][j])
                        console.log('neighbors: ', neighbors)
                        tempGrid[i][j] = 1
                        console.log(tempGrid)
                    } else if (grid[i][j] === 1 && neighbors === 3 || grid[i][j] === 1 && neighbors === 2){
                        tempGrid[i][j] = 1
                    }
                }
            }
            console.log('after cells: ', tempGrid)
            setGrid(tempGrid)
            return
        }
    }
    
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
            <button onClick={() => runSimulation()}>{running ? 'stop' : 'start'}</button>
        </div>
    </div>
}


export default GameOfLife