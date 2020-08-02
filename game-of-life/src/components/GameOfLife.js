import React, { Component } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

class GameOfLife extends Component {
    constructor(){
        super()
        this.size = 20
        this.rows = 15
        this.cols = 15
        this.state = {
            generation: 0,
            grid: this.makeEmptyGrid(),
            cells: [],
            running: false,
            interval: 50,
            possibleNeighbors: [
                [0,1],
                [0,-1],
                [1,0],
                [1,1],
                [1,-1],
                [-1,0],
                [-1,1],
                [-1,-1]
            ] 
        }

        this.makeEmptyGrid = this.makeEmptyGrid.bind(this)
        this.makeCells = this.makeCells.bind(this)
        this.startGame = this.startGame.bind(this)
        this.stopGame = this.stopGame.bind(this)
        this.runGeneration = this.runGeneration.bind(this)
        this.calculateNeighbors = this.calculateNeighbors.bind(this)
    }

    makeEmptyGrid(){
        let grid = []
        for (let y = 0; y < this.rows; y++){
            grid[y] = []
            for (let x = 0; x < this.cols; x++){
                grid[y][x] = 0
            }
        }
        return grid
    }

    makeCells(x, y){
        let cells = this.state.grid.map((row, i) => {
            if (i === x){
                return row.map((col, j) => {
                    if (j === y){
                        return col === 0 ? 1 : 0
                    } else {
                        return col
                    }
                })
            } else {
                return row
            }
        })
        this.setState({ grid: cells }) 
    }

    startGame = () => {
        this.setState({ running: true})
        this.runGeneration()
    }

    stopGame = () => {
        this.setState({ running: false})
        if (this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler)
            this.timeoutHandler = null
        }
    }

    runGeneration(){
        this.setState({ generation: this.state.generation + 1 })
        let newGrid = this.makeEmptyGrid()
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                let neighbors = this.calculateNeighbors(this.state.grid, x, y)
                if (this.state.grid[x][y] === 1){
                    if (neighbors === 2 || neighbors === 3){
                        newGrid[x][y] = 1
                    } else {
                        newGrid[x][y] = 0
                    }
                } else {
                    if (this.state.grid[x][y] === 0 && neighbors === 3){
                        newGrid[x][y] = 1
                    }
                }
            }
        }
        this.setState({ grid: newGrid })
        this.timeoutHandler = window.setTimeout(() => {
            this.runGeneration()
        }, this.state.interval)
    }

    calculateNeighbors(board, x, y) {
        let neighbors = 0
        this.state.possibleNeighbors.forEach(dir => {
            const nX = dir[0] + x
            const nY = dir[1] + y
            if (nX >= 0 && nX < this.cols && nY >=0 && nY < this.rows && board[nX][nY]) {
                neighbors ++
            }
        })
        return neighbors
    }

    handleIntervalChange = (e) => {
        this.setState({ interval: e.target.value })
    }

    handleClear = () => {
        this.state.grid = this.makeEmptyGrid()
        this.setState({ cells: this.makeCells() })
    }

    render(){
        const { interval, running, grid } = this.state
        return (
            <div>
                <h3>Generation: {this.state.generation}</h3>
                <Grid 
                    grid={grid}
                    cellSize={this.size}
                    rows={this.rows}
                    cols={this.cols}
                    makeCells={this.makeCells}
                    running={running}
                />
                <div className='controls'>
                    {this.state.running ?
                        <button onClick={() => this.stopGame()}>Stop</button> :
                        <button onClick={() => this.startGame()}>Start</button>
                    }
                </div>
            </div>

        ) 
    } 
}


export default GameOfLife