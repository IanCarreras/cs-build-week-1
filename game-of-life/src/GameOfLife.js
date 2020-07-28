import React, { useState } from 'react'
import Cell from './Cell'
import './GameOfLife.css'

const GameOfLife = () => {
    const [rows, setRows] = useState(25)
    const [cols, setCols] = useState(25)
    const [board, setBoard] = useState([])
    const [cells, setCells] = useState([])

    const createGrid = () => {
        for (let y = 0; y<rows; y++) {
            setBoard(board[y] = [])
            for (let x = 0; x<cols; x++) {
                setBoard(board[y][x] = false)
            }
        }
    }
    
    return <div>
        <Cell />
        <div className='controls'>
            <button onClick={() => createGrid()}>Create Board</button>
        </div>
    </div>
}



export default GameOfLife