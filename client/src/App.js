import React from 'react'
import { connect } from 'react-redux'
import Gameboard from './components/GameBoard/Gameboard'
import Side from './components/Side/Side'

function Gamestat(props) {

  return (
    <React.Fragment>
      <div className="header">Corona-sweeper</div>
      <div className="view">
        <Gameboard />
        <Side />
      </div>
      <audio id="clickNormal" src="./sounds/click.wav"></audio>
      <audio id="clickFlag" src="./sounds/flag.wav"></audio>
      <audio id="winsound" src="./sounds/gameWin.wav"></audio>
      <audio id="audioLoose" src="./sounds/gameOver.wav"></audio>
    </React.Fragment>
    )
}

const mapStateToProps = state => ({

})

const mapActionsToProps = {

}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gamestat))