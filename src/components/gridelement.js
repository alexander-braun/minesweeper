import React, {useState,useEffect } from 'react'
import { connect } from 'react-redux'
import setGameState from '../actions/setGameState'
import setRevealed from '../actions/setRevealed'

function Gridelement(props) {

  const [clicked, setClicked] = useState(false)

  const handleClick = (e) => {
    // Game already lost or won ? don't do anything
    if(props.gameState === 'lost' || props.gameState === 'win') return

    props.setRevealed(props.position)
    // If game still on start now on running after first click
    props.setGameState('running')

    // Element was clicked so is revealed
    setClicked(true)

    // If Gridelement is a mine set Game to lost and reveal all mines
    if(props.mine) {
      props.setGameState('lost')
      revealAllMines()
      return
    }
    if(props.minesAround === 0) {
      floodFill(props.value[0], props.value[1])
      return
    }
  }

  let gridEls = document.getElementsByClassName('gridelement')
  const checkForWin = () => {
    for(let i = 0; i < gridEls.length; i++) {
      if(!gridEls[i].classList.contains('revealed')) {
        if(!gridEls[i].firstChild.classList.contains('black')) {
          return false
        }
      }
    }
    revealAllMines()
    return props.setGameState('win')
  }
  
  const revealAllMines = () => {
    for(let i = 0; i < props.grid.length; i++) {
      for(let j = 0; j < props.grid.length; j++) {

        // If it's a mine get the element
        if(props.grid[i][j][2]) {
          let currentEl = document.getElementById([i,j].toString())

          // If the element is not yet revealed add revealed status
          if(!currentEl.classList.contains('revealed')) {
            currentEl.classList.add('revealed')

            // If there is no flag on the mine just put a mine as innertext
            if(currentEl.children.length === 2) {
              currentEl.firstChild.innerText = '*'
            }
          }
        }
      }
    }
  }

  const setDisplay = () => {
    if(props.mine) return '*'
    if(props.minesAround === 0) return ''
    if(props.minesAround !== 0) return props.minesAround    
  }

  const floodFill = (posx, posy, grid = props.grid) => {
    let currentDomGridEl = document.getElementById([posx,posy].toString())
    // If outside board boundaries
    if(posx < 0 || posy < 0 || posx >= grid.length || posy >= grid.length) {
      return
    // If mine
    } else if(grid[posx][posy][2]) {
      return
    // If already revealed
    } else if(currentDomGridEl.classList.contains('revealed')) {
      return
    // If has mine around return without new floodfill but mark as revealed
    } else if(grid[posx][posy][3] !== 0){
        currentDomGridEl.classList.add('revealed')
        currentDomGridEl.firstChild.classList.add('clicked')
        !props.revealed[(posx * props.grid.length) + posy] && props.setRevealed((posx * props.grid.length) + posy)
    } else {

      // Set cell as revealed
      currentDomGridEl.classList.add('revealed')
      currentDomGridEl.firstChild.classList.add('clicked')
      !props.revealed[(posx * props.grid.length) + posy] && props.setRevealed((posx * props.grid.length) + posy)

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
    props.mine ? clicked ? 'black clicked' : 'black' : 
    props.minesAround === 1 ? 'blue' : 
    props.minesAround === 2 ? 'green' : 
    props.minesAround === 3 ? 'brightred' :
    props.minesAround === 4 ? 'darkblue' :
    props.minesAround === 5 ? 'darkred' :
    props.minesAround === 6 ? 'mint' :
    props.minesAround === 7 ? 'black' :
    'lightgrey'
  
  const [flag, setFlag] = useState(false)
  const preventDefault = e => {
    e.preventDefault()

    // If revealed 
    if(props.gameState === 'lost' || props.gameState === 'win' || clicked) return

    // If revealed in dom
    let element = document.getElementById([props.value[0], props.value[1]].toString())
    if(element.classList.contains('revealed')) return

    setFlag(!flag)
  }

  useEffect(() => {
    props.gameState !== 'start' && props.gameState !== 'pause' && clicked && checkForWin()
  })

  return (
    <div id={props.value.toString()} className={`gridelement ${props.revealed[props.position] ? 'revealed' : ''}`}>
      <button 
        onContextMenu={preventDefault}
        className={props.revealed[props.position] ? `revealed ${classname}` : ``} 
        style={{width:'100%', height: '100%'}} 
        onClick={e => handleClick(e)}>
        {
          props.revealed[props.position] && setDisplay()
        }
      </button>
      {
        flag && !clicked ? <div className="flag">🚩</div> : ''
      }
      {props.mine ? <div className="white"></div> : null}
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState,
  revealed: state.revealed
})

const mapActionsToProps = {
  setGameState,
  setRevealed
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gridelement))