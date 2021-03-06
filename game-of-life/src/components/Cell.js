import React from 'react'
import './Cell.css'

const Cell = ({value, x, y, updateCells, running}) => {
    return (
        <div 
            className='cell' 
            onClick={!running ? () => updateCells(x, y) : undefined}
            style={{ backgroundColor: value[x][y] === 0 ? 'white' : 'black' }}></div>
    )
}

export default Cell