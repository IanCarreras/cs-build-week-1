import React, {useState} from 'react'
import './Cell.css'

const Cell = ({value, x, y, updateCells, running}) => {
    const [status, setStatus] = useState(value)

    const toggle = () => {
        if(running){
            return
        }
        if (status === 0){
            setStatus(1)
            return updateCells(x, y, 1)
        } else {
            setStatus(0)
            return updateCells(x, y, 0)
        }
    }

    return (
        <div 
            className='cell' 
            onClick={() => toggle()}
            style={{ backgroundColor: status === 0 ? 'white' : 'black' }}></div>
    )
}

export default Cell