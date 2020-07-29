import React from 'react'
import Cell from './Cell'
import './Grid.css'

const Grid = ({grid, size, rows, cols}) => {
    const width = cols*size
    const height = rows*size
    return <div className='grid'
        style={{
            width: width, 
            height: height,
            margin: '0 auto'
        }}
    >
        {
            grid.map((row, i) => {
                return (
                    <div key={i}>
                        {
                            row.map((col, j) => {
                                console.log(j)
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