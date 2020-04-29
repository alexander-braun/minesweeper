import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles/gamefield.css'
import Gridelement from './components/Gridelement'
import setGrid from './actions/setGrid'
import setGameState from './actions/setGameState'
import Gamestat from './components/Gamestat'

function App(props) {

  const [gridSize, changeGridsize] = useState(10)
  const probability = 0.1

  const generateGridArray = () => {

    //create general grid with x, y coordinates
    //determine if mine or not
    //set revealed to false

    const grid =[]
    for(let i = 0; i < gridSize; i++){
      grid.push([])
      for(let j = 0; j < gridSize; j++) {
        grid[i].push([i, j, Math.random() < probability, false]) // X, Y, MINE?, REVEALED?
      }
    } 

    //push number of mines to end of array

    grid.map(row => {
      row.map(cell => {
        let minecounter = 0
        for(let i = -1; i <= 1; i++) {
          for(let j = -1; j <= 1; j++) {
            if(cell[0] + i >= 0 && 
              cell[1] + j >= 0 && 
              cell[0] + i <= (gridSize - 1) && 
              cell[1] + j <= (gridSize - 1) ) {
              let neighbor = [cell[0] + i, cell[1] + j]
              if(neighbor[0] === cell[0] && neighbor[1] === cell[1]) continue
              if(grid[cell[0] + i][cell[1] + j][2]) minecounter++
            }
          }
        }
        cell.push(minecounter)
      })
    })
    return grid
  }

  useEffect(() => {
    props.setGrid(generateGridArray())
  }, [])
  
  return (
    <div className="gameboard">
      <Gamestat />
      <div className="game" style={{gridTemplateColumns:`repeat(${gridSize}, 30px)`, gridTemplateRows:`repeat(${gridSize}, 30px)`}}>
        {
          props.grid.map(row => {
            return row.map(cell => {
              return <Gridelement value={[cell[0], cell[1]]} 
                                  mine={cell[2]} 
                                  revealed={cell[3]}
                                  minesAround={cell[4]} />
            })
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState
})

const mapActionsToProps = {
  setGrid,
  setGameState
}

export default connect(mapStateToProps, mapActionsToProps)(App)
