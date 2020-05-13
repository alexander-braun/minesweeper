import React from 'react'
import setGameState from '../../actions/setGameState'
import Clock from './Clock'
import Counter from './Counter'
import setFlagcount from '../../actions/setFlagCount'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Gamestat({ gridSize, counter, setArr, gridL, gridH }) {

  const faces = ['🤢','😷', '🙏']

  const dispatch = useDispatch()
  const gameState = useSelector(state => state.gameState)

  const restartGame = () => {
    dispatch(setGameState('start'))
    setArr(new Array(gridL * gridH).fill(false))
    dispatch(setFlagcount(counter))
  }

  return (
    <div id="game_header">
        <Counter />
        <div id="gameface" onClick={restartGame}>{gameState === 'lost' ? faces[0] : gameState === 'win' ? faces[2] : faces[1]}</div>
        <Clock />
    </div>
  )
}

export default React.memo(Gamestat)