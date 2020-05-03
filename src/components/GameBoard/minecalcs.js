const MineCalcs = (() => {

    let posx, posy, grid, revealed, gridL, gridH

    const setGridL = (val) => {
      gridL = val
    }

    const setGridH = (val) => {
      gridH = val
    }

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
      console.log(posx, posy)
      // If outside board boundaries
      if(posx < 0 || posy < 0 || posx >= gridH || posy >= gridL) {
        return
      // If mine
      } else if(grid[posx][posy][2]) {
        return
      // If already revealed
      } else if(revealed[(posx * gridL) + posy]) {
        return
      // If has mine around return without new floodfill but mark as revealed
      } else if(grid[posx][posy][3] !== 0){
          revealed[(posx * gridL) + posy] = true
        return
      } else {
        // Set cell as revealed
        revealed[(posx * gridL) + posy] = true
  
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
      for(let i = 0; i < gridH; i++) {
        for(let j = 0; j < gridL; j++) {
          if(grid[i][j][2]) {
            revealed[(i * gridL) + j] = true
          }
        }
      }
      return revealed
    }

    const setAll = (posx, posy, grid, revealed, gridL, gridH) => {
        setPosx(posx)
        setPosy(posy)
        setGrid(grid)
        setRevealed(revealed)
        setGridL(gridL)
        setGridH(gridH)
    }

    return {
        setAll: setAll,
        returnFloodFill: returnFloodFill,
        revealAllMines: revealAllMines
    }
})()

export default MineCalcs