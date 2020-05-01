import React, {useState,useEffect } from 'react'
import { connect } from 'react-redux'
import setGameState from '../actions/setGameState'
import setRevealed from '../actions/setRevealed'
import setRevealedArr from '../actions/setRevealedArr'
import ff from './floodfill'

function Gridelement(props) {

  const handleClick = (e) => {
    // Game already lost or won ? don't do anything
    if(props.gameState === 'lost' || props.gameState === 'win') return

    // If game still on start now on running after first click
    props.gameState !== 'running' && props.setGameState('running')

    // If Gridelement is a mine set Game to lost and reveal all mines
    if(props.mine) {
      props.setRevealed(props.position)
      props.setGameState('lost')
      revealAllMines()
      return
    }
    if(props.minesAround === 0) {
      props.setRevealed(props.position)
      props.setRevealedArr(ff.setAll(props.value[0], props.value[1], props.grid, props.revealed))
      return
    }

    props.setRevealed(props.position)
  }

  const checkForWin = () => {
    if(props.revealed.length - props.minecount === countRevealed()) {
      revealAllMines()
      console.log(props.revealed)
      return props.setGameState('win')  
    }
    return false
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
            props.setRevealed((i * props.grid.length) + j)

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

  let classname = 
    props.mine ? 'black' : 
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
    if(props.gameState === 'lost' || props.gameState === 'win' || props.revealed[props.position]) return

    // If revealed in dom
    let element = document.getElementById([props.value[0], props.value[1]].toString())
    if(element.classList.contains('revealed')) return

    setFlag(!flag)
  }

  const countRevealed = () => {
    let counter = 0
    for(let i = 0; i < props.revealed.length; i++) {
      props.revealed[i] && counter++
    }
    return counter
  }

  useEffect(() => {

    if(props.revealed.length - props.minecount === countRevealed()) {
      props.gameState !== 'start' && props.gameState !== 'pause' && props.revealed[props.position] && checkForWin()  
    }
    
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
        flag && !props.revealed[props.position] ? <div className="flag">🚩</div> : null
      }
      {props.mine ? <div className="white"></div> : null}
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState,
  revealed: state.revealed,
  minecount: state.minecount
})

const mapActionsToProps = {
  setGameState,
  setRevealed,
  setRevealedArr
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gridelement))