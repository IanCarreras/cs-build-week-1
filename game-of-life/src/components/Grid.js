import React from 'react'
import Cell from './Cell'
import './Grid.css'

const Grid = ({grid, cellSize, rows, cols}) => {
    const width = cols*cellSize
    const height = rows*cellSize
    const styleObj = {
        width: width, 
        height: height,
        margin: '0 auto',
        border: '1px solid black'
    }
    return <div className='grid'
        style={styleObj}
    >
        {
            grid.map((row, i) => {
                return (
                    <div key={i}>
                        {
                            row.map((col, j) => {
                                return <Cell 
                                    key={`${i}-${j}`}
                                />
                            })
                        }
                    </div>
                )
            })
        }
    </div>
}

export default Grid