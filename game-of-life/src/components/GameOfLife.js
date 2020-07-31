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

    const calculateNeighbors = (board, x, y) => {
        let neighbors = 0
        possibleNeighbors.forEach(dir => {
            const nX = dir[0] + x
            const nY = dir[1] + y
            if (nX >= 0 && nX < cols && nY >=0 && nY < rows && board[nX][nY]) {
                neighbors ++
            }
        })
        console.log(`board[${x}][${y}]`,board[x][y])
        console.log(neighbors)
        return neighbors
    }

    const updateCells = (x, y, status) => {
        console.log(`x: ${x}, y: ${y}`)
        console.log(grid[x][y])
        const newGrid = grid.map((row, i) => {
            if (i === x) {
                console.log(grid[x])
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
        // let temp = grid
        // temp[y][x] = status
        setCells(() => newGrid)
        console.log(cells)
    }

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

    const runSimulation = () => {
        console.log('start cells: ', cells)
        if (running) {
            setRunning(false)
            return 
        } else if (!running) {
            setRunning(true)
            for (let i=0; i<rows; i++){
                for (let j=0; j<cols; j++){
                    let neighbors = calculateNeighbors(cells, i, j, 0)
                    if (neighbors < 2 || neighbors > 3){
                        cells[i][j] = 0 
                    } else if (cells[i][j] === 0 && neighbors === 3){
                        cells[i][j] = 1
                    }
                }
            }
            console.log('after cells: ', cells)
            setGrid(cells)
            return
        }
    }
    
    useEffect(() => {
        createGrid()
        console.log('use effect: ', cells)
    }, [cells])

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