import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles/gamefield.css'
import Gridelement from './components/Gridelement'
import setGrid from './actions/setGrid'
import Gamestat from './components/Gamestate'
import { v4 as uuidv4 } from 'uuid'

function App(props) {

  const [gridSize, changeGridsize] = useState(20)
  const probability = 0.1

  const generateGridArray = () => {

    //create general grid with x, y coordinates
    //determine if mine or not
    //set revealed to false

    const grid =[]
    for(let i = 0; i < gridSize; i++){
      grid.push([])
      for(let j = 0; j < gridSize; j++) {
        grid[i].push([i, j, Math.random() < probability]) // X, Y, MINE, MINECOUNT
      }
    } 

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
              let neighbor = [cell[0] + x, cell[1] + y]
              if(neighbor[0] === cell[0] && neighbor[1] === cell[1]) continue
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
    props.setGrid(generateGridArray())  
  }, [])

  const generateGrid = () => {
      const gridArray = []
      for(let i = 0; i < props.grid.length; i++) {
        for(let j = 0; j < props.grid.length; j++) {
          gridArray.push(
            <Gridelement  value={[props.grid[i][j][0], props.grid[i][j][1]]} 
                          mine={props.grid[i][j][2]}
                          minesAround={props.grid[i][j][3]} 
                          key={uuidv4()}
            />
          )
        }
      }
    return gridArray  
  }

  return (
    <div className="gameboard">
      <Gamestat genGrid={generateGridArray} />
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
  setGrid
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(App))
