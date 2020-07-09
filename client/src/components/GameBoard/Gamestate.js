import React from 'react';
import setGameState from '../../actions/setGameState';
import Clock from './Clock';
import Counter from './Counter';
import setFlagcount from '../../actions/setFlagCount';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GameHeader, Face } from './styles/elements';

function Gamestat({ counter, setArr, gridL, gridH }) {
  const faces = ['🤢', '😷', '🙏'];
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);

  // Reset the revealed states, flagcount and restarts the game
  const restartGame = () => {
    dispatch(setGameState('start'));
    setArr(new Array(gridL * gridH).fill(false));
    dispatch(setFlagcount(counter));
  };

  return (
    <GameHeader>
      <Counter />
      <Face onClick={restartGame}>
        {gameState === 'lost'
          ? faces[0]
          : gameState === 'win'
          ? faces[2]
          : faces[1]}
      </Face>
      <Clock />
    </GameHeader>
  );
}

export default React.memo(Gamestat);
