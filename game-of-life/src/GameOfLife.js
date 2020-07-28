import React, { useState } from 'react'
import Cell from './Cell'
import './GameOfLife.css'

const GameOfLife = () => {
    const [rows, setRows] = useState(5)
    const [cols, setCols] = useState(5)
    const [board, setBoard] = useState({})
    const [cells, setCells] = useState([])

    const createGrid = () => {
        setBoard([])
        for (let i = 1; i<=(rows*cols); i++) {
            setBoard(board[i] = false)
        }
        console.log(board)
    }

    const renderGrid = () => {
        console.log(rows*cols)
        for (let i = 0; i<(rows*cols); i++) {
            console.log(i)
            return setCells(cells[i] = <Cell key={i}/>)
        }
    }
    
    return <div>
        <div className='board'>
            {board[1] && renderGrid()}
            {cells}
        </div>
        <div className='controls'>
            <button onClick={() => createGrid()}>Create Board</button>
        </div>
    </div>
}



export default GameOfLife