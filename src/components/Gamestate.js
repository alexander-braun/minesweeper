import React from 'react'
import { connect } from 'react-redux'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'
import Clock from './Clock'
import Counter from './Counter'
import setRevealedArr from '../actions/setRevealedArr'

function Gamestat(props) {

  const faces = ['☹️','🙂', '😎']

  const restartGame = () => {
    props.setGrid(props.genGrid())
    props.setGameState('start')
    props.setRevealedArr(new Array(props.gridSize * props.gridSize).fill(false))
  }

  return (
    <div id="game_header">
        <Counter />
        <div id="gameface" onClick={restartGame}>{props.gameState === 'lost' ? faces[0] : props.gameState === 'win' ? faces[2] : faces[1]}</div>
        <Clock />
    </div>
  )
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState
})

const mapActionsToProps = {
  setGrid,
  setGameState,
  setRevealedArr
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gamestat))