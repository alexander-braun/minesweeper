import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import '../../styles/gamefield.css'
import Gridelement from './Gridelement'
import setGrid from '../../actions/setGrid'
import Gamestat from './Gamestate'
import { v4 as uuidv4 } from 'uuid'
import setRevealedArr from '../../actions/setRevealedArr'
import setRevealed from '../../actions/setRevealed'
import setMinecount from '../../actions/setMinecount'
import setFlagcount from '../../actions/setFlagCount'


function Gameboard(props) {
  let [minecounter, setMinecounter] = useState(10)
  const { difficulty } = props

  let [gridL, setGridL] = useState(9)
  let [gridH, setGridH] = useState(9)
    
  
  const generateGridArray = useCallback((gridL = 9, gridH = 9) => {

    const grid =[]
  
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
      if(!grid[random1][random2][2]) {
        grid[random1][random2][2] = true
      } else i--
    }

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
  }, [minecounter])

  let grid = generateGridArray(gridL, gridH)
  let arr = new Array(difficulty * difficulty).fill(false)

  const generateGrid = () => {
    if(grid === undefined) return
    if(grid.length !== gridH) return
    if(grid[0].length !== gridL) return

    const gridArray = []
    let counter = 0
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
        gridArray.push(
            <Gridelement 
              value={[grid[i][j][0], grid[i][j][1]]} 
              mine={grid[i][j][2]}
              minesAround={grid[i][j][3]} 
              key={uuidv4()}
              position={counter}
              gridL={grid[0].length}
              gridH={grid.length}
              grid={grid}
            />
        )
        counter++
      }
    }
    return gridArray  
  }

  useEffect(() => {
    let counter
    if(difficulty <= 9) {
      setMinecounter(10)
      counter = 10
    } else if(difficulty <= 16) {
      setMinecounter(40)
      counter = 40
    } else if(difficulty <= 30) {
      setMinecounter(99)
      counter = 99
    }

    props.setFlagcount(counter)
    props.setMinecount(counter)

  }, [grid])

  useEffect(() => {
    
    if(difficulty === 9) {
      setGridL(9)
      setGridH(9)
    } else if(difficulty === 16) {
      setGridL(16)
      setGridH(16)
    } else if(difficulty === 30) {
      setGridL(30)
      setGridH(16)
    }

    props.setGrid(grid)
    props.setRevealedArr(arr)  

  }, [difficulty])



  return (
      <div className="board">
        <div className="gameboard">
          <Gamestat gridL={gridL} gridH={gridH} setGrid={setGrid} genGrid={generateGridArray} gridSize={difficulty} />
          <div className="game" style={{gridTemplateColumns:`repeat(${gridL}, 30px)`, gridTemplateRows:`repeat(${gridH}, 30px)`}}>
            {
              generateGrid(gridL, gridH)
            }
          </div>
        </div>
      </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  minecount: state.minecount,
  difficulty: state.difficulty
})

const mapActionsToProps = {
  setGrid,
  setRevealedArr,
  setRevealed,
  setMinecount,
  setFlagcount
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gameboard))