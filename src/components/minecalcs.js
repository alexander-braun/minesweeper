const MineCalcs = (() => {

    let posx, posy, grid, revealed


    const setPosx = (val) => {
        posx = val
    }

    const setPosy = (val) => {
        posy = val
    }

    const setGrid = (val) => {
        grid = val
    }

    const setRevealed = (val) => {
        revealed = val
    }

    const floodFill = (posx, posy) => {
        // If outside board boundaries
        if(posx < 0 || posy < 0 || posx >= grid.length || posy >= grid.length) {
          return
        // If mine
        } else if(grid[posx][posy][2]) {
          return
        // If already revealed
        } else if(revealed[(posx * grid.length) + posy]) {
          return
        // If has mine around return without new floodfill but mark as revealed
        } else if(grid[posx][posy][3] !== 0){
            revealed[(posx * grid.length) + posy] = true
          return
        } else {
          // Set cell as revealed
          revealed[(posx * grid.length) + posy] = true
    
          // Floodfill with new values recursively
          floodFill(posx + 1, posy)
          floodFill(posx, posy + 1)
          floodFill(posx - 1, posy)
          floodFill(posx, posy - 1)
          floodFill(posx - 1, posy - 1)
          floodFill(posx - 1, posy + 1)
          floodFill(posx + 1, posy + 1)
          floodFill(posx + 1, posy - 1)
        }
    }

    const returnFloodFill = () => {
        floodFill(posx, posy)
        return revealed
    }

    const revealAllMines = () => {
      for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++) {
          if(grid[i][j][2]) {
            revealed[(i * grid.length) + j] = true
          }
        }
      }
      return revealed
    }

    const setAll = (posx, posy, grid, revealed) => {
        setPosx(posx)
        setPosy(posy)
        setGrid(grid)
        setRevealed(revealed)
    }

    return {
        setAll: setAll,
        returnFloodFill: returnFloodFill,
        revealAllMines: revealAllMines
    }
})()

export default MineCalcs