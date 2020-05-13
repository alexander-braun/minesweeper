import React, { useState, useEffect } from 'react'
import '../../styles/gamefield.css'
import Gridelement from './Gridelement'
import setGrid from '../../actions/setGrid'
import Gamestat from './Gamestate'
import { v4 as uuidv4 } from 'uuid'
import setRevealedArr from '../../actions/setRevealedArr'
import setMinecount from '../../actions/setMinecount'
import setFlagcount from '../../actions/setFlagCount'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const generateGridArray = (gridL = 9, gridH = 9, minecounter = 10) => {

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
}

const generateGrid = (grid, gridSize) => {
  if(grid === undefined) return

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
            gridSize={gridSize}
          />
      )
      counter++
    }
  }
  return gridArray  
}

function Gameboard(props) {
  let [minecounter, setMinecounter] = useState(10)
  let [gridL, setGridL] = useState(9)
  let [gridH, setGridH] = useState(9)
  const difficulty = useSelector(state => state.difficulty)
  const dispatch = useDispatch()
  let [arr, setArr] = useState(new Array(difficulty * difficulty).fill(false))
  let grid = generateGridArray(gridL, gridH, minecounter)

  const setCounter = () => {
    if(!difficulty) return
    
    if(difficulty <= 9) {
      return 10
    } else if(difficulty <= 16) {
      return 40
    } else if(difficulty <= 30) {
      return 99
    }
  }

  let [counter, setCount] = useState(setCounter())
  let [gridSize, updateGridsize] = useState()

  useEffect(() => {
    dispatch(setFlagcount(setCounter()))
    dispatch(setMinecount(setCounter()))

    setCount(setCounter())
    setMinecounter(setCounter())
    setArr(new Array(difficulty * difficulty).fill(false))

    grid = generateGridArray(gridL, gridH, minecounter)

  }, [difficulty, dispatch, gridL, gridH])

  useEffect(() => {
    
    if(difficulty === 9) {
      setGridL(9)
      setGridH(9)
      updateGridsize('30px')
    } else if(difficulty === 16) {
      setGridL(16)
      setGridH(16)
      updateGridsize('25px')
    } else if(difficulty === 30) {
      setGridL(30)
      setGridH(16)
      updateGridsize('20px')
    }

    dispatch(setRevealedArr(arr))

  }, [difficulty, dispatch, arr, grid, minecounter])


  return (
      <div className="board">
        <div className="gameboard">
          <Gamestat counter={counter} setArr={setArr} gridL={gridL} gridH={gridH} setGrid={setGrid} genGrid={generateGridArray} gridSize={difficulty} />
          <div className="game" style={{gridTemplateColumns:`repeat(${gridL}, ${gridSize})`, gridTemplateRows:`repeat(${gridH}, ${gridSize})`}}>
            {
              generateGrid(grid, gridSize)
            }
          </div>
        </div>
      </div>
  )
}

export default React.memo(Gameboard)