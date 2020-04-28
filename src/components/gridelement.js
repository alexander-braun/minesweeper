import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'

function Gridelement(props) {

  const handleClick = (e) => {
    if(props.mine) {
      props.setGameState('lost')
      revealElement()
      return
    }
    if(props.minesAround === 0) {
      floodFill(props.value[0], props.value[1], props.grid)
      revealElement()
    }
    if(props.minesAround !== 0) revealElement()  
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
    if(props.revealed) {
      if(props.mine) return '☀'
      else if(props.minesAround === 0) {
        return ''
      } else return props.minesAround.toString()
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
      } else if(grid[posx][posy][4] !== 0){
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

  return (
    <div className='gridelement' value={props.value}>
      <button 
        className={props.revealed ? 'revealed' : ''} 
        style={{width:'100%', height: '100%'}} 
        onClick={e => handleClick(e)}>
        {
          setDisplay()
        }
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  clicked: state.clicked,
  gameState: state.gameState
})

const mapActionsToProps = {
  setGrid,
  setGameState
}

export default connect(mapStateToProps, mapActionsToProps)(Gridelement)