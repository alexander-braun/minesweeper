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


function Gameboard({difficulty, grid, minecount, setGrid, setRevealedArr, setRevealed, setMinecount, setFlagcount}) {
  let [minecounter, setMinecounter] = useState(10)
  const diff = difficulty

  let [gridL, setGridL] = useState(9)
  let [gridH, setGridH] = useState(9)
    
  
  const generateGridArray = useCallback((gridL = 9, gridH = 9) => {

    const newGrid =[]
  
    //create general grid with x, y coordinates
    //determine if mine or not
    //set revealed to false

    for(let i = 0; i < gridH; i++){
      newGrid.push([])
      for(let j = 0; j < gridL; j++) {
        newGrid[i].push([i, j, false]) // X, Y, MINE, MINECOUNT
      }
    }

    for(let i = 0; i < minecounter; i++) {
      let random1 = Math.floor(Math.random() * Math.floor(gridH))
      let random2 = Math.floor(Math.random() * Math.floor(gridL))
      if(!newGrid[random1][random2][2]) {
        newGrid[random1][random2][2] = true
      } else i--
    }

    //push number of mines to end of array
    for(let i = 0; i < gridH; i++) {
      for(let j = 0; j < gridL; j++) {
        let minecount = 0
        for(let x = -1; x <= 1; x++) {
          for(let y = -1; y <= 1; y++) {
            let cell = newGrid[i][j]
            if(cell[0] + x >= 0 && 
              cell[1] + y >= 0 && 
              cell[0] + x <= (gridH - 1) && 
              cell[1] + y <= (gridL - 1) ) {
                if(newGrid[cell[0] + x][cell[1] + y][2]) minecount++
            }
          }
        }
        newGrid[i][j].push(minecount)
      }
    }
    return newGrid
  }, [minecounter])

  let [newGrid] = useState(generateGridArray(gridL, gridH))
  let arr = new Array(diff * diff).fill(false)

  const generateGrid = () => {
    if(newGrid === undefined) return
    if(newGrid.length !== gridH) return
    if(newGrid[0].length !== gridL) return

    const gridArray = []
    let counter = 0
    for(let i = 0; i < newGrid.length; i++) {
        for(let j = 0; j < newGrid[0].length; j++) {
        gridArray.push(
            <Gridelement 
              value={[newGrid[i][j][0], newGrid[i][j][1]]} 
              mine={newGrid[i][j][2]}
              minesAround={newGrid[i][j][3]} 
              key={uuidv4()}
              position={counter}
              gridL={newGrid[0].length}
              gridH={newGrid.length}
              grid={newGrid}
            />
        )
        counter++
      }
    }
    return gridArray  
  }

  useEffect(() => {
    let counter
    if(diff <= 9) {
      setMinecounter(10)
      counter = 10
    } else if(diff <= 16) {
      setMinecounter(40)
      counter = 40
    } else if(diff <= 30) {
      setMinecounter(99)
      counter = 99
    }

    setGrid(newGrid)
    setFlagcount(counter)
    setMinecount(counter)
    setRevealedArr(arr) 

  }, [grid, diff, setFlagcount, setMinecount, arr, setRevealedArr, newGrid, setGrid])

  useEffect(() => {
    
    if(diff === 9) {
      setGridL(9)
      setGridH(9)
    } else if(diff === 16) {
      setGridL(16)
      setGridH(16)
    } else if(diff === 30) {
      setGridL(30)
      setGridH(16)
    }

  }, [diff, setGrid, setRevealedArr])



  return (
      <div className="board">
        <div className="gameboard">
          <Gamestat gridL={gridL} gridH={gridH} setGrid={setGrid} genGrid={generateGridArray} gridSize={diff} />
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
