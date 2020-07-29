This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Conway's Game of Life

The Game of Life, created by John Conway, is a cellular automaton.  It's made up of a grid of cells that follow a simple set of rules.  Each cell is either alive or dead and the rules of the game describe how the status of each cell on the grid changes over time.  Each round/generation of the simulation examines the current state of the grid, and then produces a new grid consisting of the old state with the rules applied to it.  The new grid becomes the current state of the simulation, and the process repeats.  

Cellular automaton simulations have been used in biological and chemical areas of research.

Rules for the Game of Life

    - If a cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
    - If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.

