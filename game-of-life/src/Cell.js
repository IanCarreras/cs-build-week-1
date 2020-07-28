import React, {useState} from 'react'
import './Cell.css'

const Cell = (props) => {
    const [status, setStatus] = useState('dead')

    const toggle = () => {
        
    }

    return (
        <div className='cell'></div>
    )
}

export default Cell