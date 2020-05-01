import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles/gamefield.css'
import Gridelement from './components/Gridelement'
import setGrid from './actions/setGrid'
import Gamestat from './components/Gamestate'
import { v4 as uuidv4 } from 'uuid'
import setRevealedArr from './actions/setRevealedArr'
import setRevealed from './actions/setRevealed'
import setMinecount from './actions/setMinecount'

function App(props) {

  const [gridSize, changeGridsize] = useState(10)

  const probability = 0.1

  const generateGridArray = () => {

    //create general grid with x, y coordinates
    //determine if mine or not
    //set revealed to false

    const grid =[]
    let minecounter = 0

    for(let i = 0; i < gridSize; i++){
      grid.push([])
      for(let j = 0; j < gridSize; j++) {
        let mine = Math.random() < probability
        mine && minecounter++
        grid[i].push([i, j, mine]) // X, Y, MINE, MINECOUNT
      }
    } 

    props.setMinecount(minecounter)

    //push number of mines to end of array
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid.length; j++) {
        let minecounter = 0
        for(let x = -1; x <= 1; x++) {
          for(let y = -1; y <= 1; y++) {
            let cell = grid[i][j]
            if(cell[0] + x >= 0 && 
              cell[1] + y >= 0 && 
              cell[0] + x <= (gridSize - 1) && 
              cell[1] + y <= (gridSize - 1) ) {
                if(grid[cell[0] + x][cell[1] + y][2]) minecounter++
            }
          }
        }
        grid[i][j].push(minecounter)
      }
    }

    return grid
  }

  useEffect(() => {
    props.setRevealedArr(new Array(gridSize * gridSize).fill(false))
    props.setGrid(generateGridArray()) 
  }, [])

  const generateGrid = () => {
    const gridArray = []
    let counter = 0
    for(let i = 0; i < props.grid.length; i++) {
      for(let j = 0; j < props.grid.length; j++) {
        gridArray.push(
          <Gridelement  value={[props.grid[i][j][0], props.grid[i][j][1]]} 
                        mine={props.grid[i][j][2]}
                        minesAround={props.grid[i][j][3]} 
                        key={uuidv4()}
                        position={counter}
          />
        )
        counter++
      }
    }
    return gridArray  
  }

  return (
    <div className="gameboard">
      <Gamestat genGrid={generateGridArray} gridSize={gridSize} />
      <div className="game" style={{gridTemplateColumns:`repeat(${gridSize}, 30px)`, gridTemplateRows:`repeat(${gridSize}, 30px)`}}>
        {
          generateGrid()
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid
})

const mapActionsToProps = {
  setGrid,
  setRevealedArr,
  setRevealed,
  setMinecount
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(App))
