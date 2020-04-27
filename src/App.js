import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles/gamefield.css'
import Gridelement from './components/gridelement'
import { v4 as uuidv4 } from 'uuid';
import setGrid from './actions/setGrid'
import setMines from './actions/setMines'

function App(props) {

  const [gridSize, changeGridsize] = useState(10)

  const generateGridArray = () => {
    const grid =[]
    for(let i = 0; i < gridSize; i++){
      grid.push([])
      for(let j = 0; j < gridSize; j++) {
        grid[i].push([i,j])
      }
    } 
    return grid
  }

  const generateMines = (amount = 10) => {
    const mines = []
    
    for(let i = 0; i < amount; i++) {
      let randomXY = [Math.floor(Math.random() * (gridSize + 1)), Math.floor(Math.random() * (gridSize + 1))]  
      mines.push(randomXY)
    }
    return mines
  }

  const returnElements = () => {
    return props.grid.map(elem => {
      return elem.map(singleArr => {
        let isMine = props.mines.filter(mine => {
          return singleArr[0] === mine[0] && singleArr[1] === mine[1]
        }).length !== 0
        return <Gridelement key = {uuidv4()}
                            pos = {singleArr}
                            isMine = {isMine}
                            mines = {props.mines}
                />
      })
    })
  }

  useEffect(() => {
    props.setGrid(generateGridArray())
    props.setMines(generateMines())
  }, [])
  
  return (
    <div className="game" style={{gridTemplateColumns:`repeat(${gridSize}, 30px)`, gridTemplateRows:`repeat(${gridSize}, 30px)`}}>
      {
        returnElements()
      }
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  mines: state.mines
})

const mapActionsToProps = {
  setGrid,
  setMines
}

export default connect(mapStateToProps, mapActionsToProps)(App)
