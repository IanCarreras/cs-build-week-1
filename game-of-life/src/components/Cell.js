import React, {useState} from 'react'
import './Cell.css'

const Cell = ({value, x, y, updateCells, running}) => {
    const [status, setStatus] = useState(value)

    return (
        <div 
            className='cell' 
            onClick={() => updateCells(x, y)}
            style={{ backgroundColor: value[x][y] === 0 ? 'white' : 'black' }}></div>
    )
}

export default Cell