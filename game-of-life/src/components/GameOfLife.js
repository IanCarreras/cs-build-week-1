import React, { Component } from 'react'
import Grid from './Grid'
import './GameOfLife.css'

class GameOfLife extends Component {
    constructor(){
        super()
        this.size = 20
        this.rows = 5
        this.cols = 5
        // this.grid = this.makeEmptyGrid()
        this.state = {
            grid: this.makeEmptyGrid(),
            cells: [],
            running: false,
            interval: 100,
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

    // state = {
    //     cells: [],
    //     running: false,
    //     interval: 100,
    //     possibleNeighbors: [
    //         [0,1],
    //         [0,-1],
    //         [1,0],
    //         [1,1],
    //         [1,-1],
    //         [-1,0],
    //         [-1,1],
    //         [-1,-1]
    //     ] 
    // }

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
        console.log(this.state.grid)
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
        console.log(this.state.running)
        this.setState({ running: true})
        console.log(this.state.running)
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
        let newGrid = this.makeEmptyGrid()
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                let neighbors = this.calculateNeighbors(this.state.grid, x, y)
                if (this.state.grid[y][x]){
                    if (neighbors === 2 || neighbors === 3){
                        newGrid[y][x] = 1
                    } else {
                        newGrid[y][x] = 0
                    }
                } else {
                    if (!this.state.grid[y][x] && neighbors === 3){
                        newGrid[y][x] = 1
                    }
                }
            }
        }
        this.setState({ grid: newGrid })
        this.setState({ cells: this.makeCells() })
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
        this.setState({ neighbors}) 
    }

    handleIntervalChange = (e) => {
        this.setState({ interval: e.target.value })
    }

    handleClear = () => {
        this.state.grid = this.makeEmptyGrid()
        this.setState({ cells: this.makeCells() })
    }

    render(){
        const { interval, running } = this.state
        return (
            <div>
                <Grid 
                    grid={this.state.grid}
                    cellSize={this.size}
                    rows={this.rows}
                    cols={this.cols}
                    makeCells={this.makeCells}
                    running={this.state.running}
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