import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'

function Gamestat(props) {

  const faces = ['☹️','😃']
  return (
    <div id="game_header">
        <div id="flagcounter" className="brightred">010</div>
        <div id="gameface">🙂</div>
        <div id="time" className="brightred">111</div>
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

export default connect(mapStateToProps, mapActionsToProps)(Gamestat)