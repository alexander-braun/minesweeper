import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'
import Clock from './Clock'

function Gamestat(props) {

  const faces = ['☹️','🙂', '😎']

  const restartGame = () => {
    props.setGrid(props.genGrid())
    props.setGameState('running')
  }

  return (
    <div id="game_header">
        <div id="flagcounter" className="brightred">
          <div className="background_timer">000</div>
          <div className="foreground_timer">010</div>
        </div>
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
  setGameState
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gamestat))