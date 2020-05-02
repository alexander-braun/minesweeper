import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/gamefield.css'
import Gridelement from './Gridelement'
import setGrid from '../actions/setGrid'
import Gamestat from './Gamestate'
import { v4 as uuidv4 } from 'uuid'
import setRevealedArr from '../actions/setRevealedArr'
import setRevealed from '../actions/setRevealed'
import setMinecount from '../actions/setMinecount'
import setFlagcount from '../actions/setFlagCount'
import BoardHead from './BoardHead'
import setGameState from '../actions/setGameState'

function Gameboard(props) {

  let gridSize = props.difficulty

  const generateGridArray = () => {
    let gridL
    let gridH

    if(gridSize === 9) {
      gridL = 9
      gridH = 9
    } else if(gridSize === 16) {
      gridL = 16
      gridH = 16
    } else if(gridSize === 30) {
      gridL = 30
      gridH = 16
    }

    const grid =[]

    // Minecounter according to classic ms
    let minecounter = 0
    gridSize === 9 ? minecounter = 10 : gridSize === 16 ? minecounter = 40 : minecounter = 99

    //create general grid with x, y coordinates
    //determine if mine or not
    //set revealed to false

    for(let i = 0; i < gridH; i++){
      grid.push([])
      for(let j = 0; j < gridL; j++) {
        grid[i].push([i, j, false]) // X, Y, MINE, MINECOUNT
      }
    }

    for(let i = 0; i < minecounter; i++) {
      let random1 = Math.floor(Math.random() * Math.floor(gridH))
      let random2 = Math.floor(Math.random() * Math.floor(gridL))
      grid[random1][random2][2] = true
    }

    props.setMinecount(minecounter)

    //push number of mines to end of array
    for(let i = 0; i < gridH; i++) {
      for(let j = 0; j < gridL; j++) {
        let minecount = 0
        for(let x = -1; x <= 1; x++) {
          for(let y = -1; y <= 1; y++) {
            let cell = grid[i][j]
            if(cell[0] + x >= 0 && 
              cell[1] + y >= 0 && 
              cell[0] + x <= (gridH - 1) && 
              cell[1] + y <= (gridL - 1) ) {
                if(grid[cell[0] + x][cell[1] + y][2]) minecount++
            }
          }
        }
        grid[i][j].push(minecount)
      }
    }
    return grid
  }
 
  useEffect(() => {

    if(gridSize === 9) {
      setGridL(9)
      setGridH(9)
    } else if(gridSize === 16) {
      setGridL(16)
      setGridH(16)
    } else if(gridSize === 30) {
      setGridL(30)
      setGridH(16)
    }

    // Determine Gridlength an -height
    props.setGrid(generateGridArray())  
    props.setRevealedArr(new Array(props.difficulty * props.difficulty).fill(false))  
    props.setGameState('start')
     
  }, [props.difficulty, gridSize])

  let [gridL, setGridL] = useState(9)
  let [gridH, setGridH] = useState(9)

  const generateGrid = () => {
    
    let gridL
    let gridH

    if(gridSize === 9) {
      gridL = 9
      gridH = 9
    } else if(gridSize === 16) {
      gridL = 16
      gridH = 16
    } else if(gridSize === 30) {
      gridL = 30
      gridH = 16
    }

    if(props.grid.length !== gridH) return
    if(props.grid[0].length !== gridL) return

    const gridArray = []
    let counter = 0
    for(let i = 0; i < gridH; i++) {
      for(let j = 0; j < gridL; j++) {
        gridArray.push(
          <Gridelement  value={[props.grid[i][j][0], props.grid[i][j][1]]} 
                        mine={props.grid[i][j][2]}
                        minesAround={props.grid[i][j][3]} 
                        key={uuidv4()}
                        position={counter}
                        gridL={gridL}
                        gridH={gridH}
          />
        )
        counter++
      }
    }
    return gridArray  
  }

  props.setFlagcount(props.minecount)

  return (
    <div className="board">
      <BoardHead genGrid={generateGridArray}/>
      <div className="gameboard">
        <Gamestat genGrid={generateGridArray} gridSize={props.difficulty} />
        <div className="game" style={{gridTemplateColumns:`repeat(${gridL}, 30px)`, gridTemplateRows:`repeat(${gridH}, 30px)`}}>
          {
            generateGrid()
          }
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  minecount: state.minecount,
  difficulty: state.difficulty,
  gameState: state.gameState
})

const mapActionsToProps = {
  setGrid,
  setRevealedArr,
  setRevealed,
  setMinecount,
  setFlagcount,
  setGameState
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gameboard))
