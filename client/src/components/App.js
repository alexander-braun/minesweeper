import React from 'react'
import Gameboard from './GameBoard/Gameboard'
import Side from './Side/Side'
import Difficulty from './Side/Difficulty'
import { Header, View } from './styles/elements'

function Gamestat(props) {
  return (
    <React.Fragment>
      <View>
        <Header>Corona-Sweeper</Header>
        <Difficulty />
        <Gameboard />
        <Side />
      </View>
      <audio id="audioClickNormal" src="./sounds/click.wav"></audio>
      <audio id="audioClickFlag" src="./sounds/flag.wav"></audio>
      <audio id="audioWin" src="./sounds/gameWin.wav"></audio>
      <audio id="audioLoose" src="./sounds/gameOver.wav"></audio>
    </React.Fragment>
    )
}

export default Gamestat