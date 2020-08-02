import React from 'react'
import Cell from './Cell'
import './Grid.css'

const Grid = ({grid, cellSize, cols, makeCells, running}) => {
    const width = cols*cellSize
    const styleObj = {
        width: width, 
        margin: '0 auto',
        border: '1px solid black',
        display: 'flex'
    }

    return <div className='grid'
    >
        {
            grid.map((row, i) => {
                return (
                    <div key={i} style={styleObj}>
                        {
                            row.map((col, j) => {
                                return <Cell 
                                    key={`${i}-${j}`}
                                    value={grid}
                                    makeCells={makeCells}
                                    x={i}
                                    y={j}
                                    running={running}
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