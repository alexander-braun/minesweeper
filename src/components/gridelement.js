import React, {useState,useEffect } from 'react'
import { connect } from 'react-redux'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'

function Gridelement(props) {

  const [clicked, setClicked] = useState(false)

  const handleClick = (e) => {

    setClicked(true)

    if(props.gameState === 'lost' || props.gameState === 'win') return

    if(props.mine) {
      props.setGameState('lost')
      props.setGrid(revealAllMines())
      revealElement()
      return
    }
    if(props.minesAround === 0) {
      floodFill(props.value[0], props.value[1], props.grid)
      revealElement()
      checkForWin()
      return
    }
    if(props.minesAround !== 0) {
      revealElement()  
      checkForWin()
      return
    }
  }

  const checkForWin = () => {
    let grid = props.grid
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid.length; j++) {
        if(!grid[i][j][2] && !grid[i][j][3]) {
          return false
        }
      }
    }
    return props.setGameState('win')
  }
  
  const revealAllMines = () => {
    let grid = props.grid
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid.length; j++) {
        if(grid[i][j][2]){
          grid[i][j][3] = true
        } 
      }
    }
    return grid
  }

  const revealElement = () => {
    props.setGrid(props.grid.map(row => {
      return row.map(cell => {
        if(props.value[0] === cell[0] && props.value[1] === cell[1]){
          cell[3] = true
          return cell
        } else return cell
      })
    }))
  }

  const setDisplay = () => {
    if(props.gameState === 'lost' && props.mine) {
      return '*'
    }
    if(props.revealed) {
      if(props.mine) {
        classname = 'mine'
        return '*'
      } 
      else if(props.minesAround === 0) {
        return ''
      } else {
        return props.minesAround.toString()
      }
    }
  }

  const floodFill = (posx, posy, grid) => {

      // If outside board boundaries
      if(posx < 0 || posy < 0 || posx >= grid.length || posy >= grid.length) {
        return

      // If mine or revealed
      } else if(grid[posx][posy][2] || grid[posx][posy][3]) {
        return

      // If has mine around return without new floodfill but mark as revealed
      } else if(grid[posx][posy][5] !== 0){
          grid[posx][posy][3] = true
          props.setGrid(grid)
      } else {

        // Set cell as revealed
        grid[posx][posy][3] = true
        props.setGrid(grid)

        // Floodfill with new values recursively
        floodFill(posx + 1, posy, grid)
        floodFill(posx, posy + 1, grid)
        floodFill(posx - 1, posy, grid)
        floodFill(posx, posy - 1, grid)
        floodFill(posx - 1, posy - 1, grid)
        floodFill(posx - 1, posy + 1, grid)
        floodFill(posx + 1, posy + 1, grid)
        floodFill(posx + 1, posy - 1, grid)
      }
  }

  let classname = 
    props.mine ? clicked ? 'black mine clicked' : 'black mine' : 
    props.minesAround === 1 ? 'blue' : 
    props.minesAround === 2 ? 'green' : 
    props.minesAround === 3 ? 'brightred' :
    props.minesAround === 4 ? 'darkblue' :
    props.minesAround === 5 ? 'darkred' :
    props.minesAround === 6 ? 'mint' :
    props.minesAround === 7 ? 'black' :
    'lightgrey'

  const preventDefault = e => {

    e.preventDefault()

    if(props.gameState === 'lost' || props.revealed || props.gameState === 'win') return

    props.setGrid(props.grid.map(row => {
      return row.map(cell => {
        if(cell[0] === props.value[0] && cell[1] === props.value[1]) {
          cell[4] = !cell[4]
          return cell
        } else return cell
      })
    }))
  }

  const flagActive = () => {
    if(props.grid[props.value[0]][props.value[1]][4]) {
      return true
    } else return false
  }
  

  return (
    <div className={`gridelement ${props.revealed ? 'revealed' : ''}`} value={props.value}>
      <button 
        onContextMenu={preventDefault}
        className={props.revealed ? `revealed ${classname}` : `${classname}`} 
        style={{width:'100%', height: '100%'}} 
        onClick={e => handleClick(e)}>
        {
          setDisplay()
        }
      </button>
      {
        flagActive() && !props.revealed ? <div className="flag">🚩</div> : ''
      }
      {props.mine ? <div className="white"></div> : null}
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

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gridelement))