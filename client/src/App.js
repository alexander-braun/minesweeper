import React from 'react'
import { connect } from 'react-redux'
import Gameboard from './components/GameBoard/Gameboard'
import Side from './components/Side/Side'
import Difficulty from './components/Side/Difficulty'

function Gamestat(props) {
  return (
    <React.Fragment>
      {/*<div className="header">Corona-sweeper</div>*/}
      <div className="view">
        <div className="header">Corona-Sweeper</div>
        <Difficulty />
        <Gameboard />
        <Side />
      </div>
      <audio id="audioClickNormal" src="./sounds/click.wav"></audio>
      <audio id="audioClickFlag" src="./sounds/flag.wav"></audio>
      <audio id="audioWin" src="./sounds/gameWin.wav"></audio>
      <audio id="audioLoose" src="./sounds/gameOver.wav"></audio>
    </React.Fragment>
    )
}

const mapStateToProps = state => ({

})

const mapActionsToProps = {

}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gamestat))