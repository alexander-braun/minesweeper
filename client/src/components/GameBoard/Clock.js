import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import setTimeRed from '../../actions/setTime';
import setGameState from '../../actions/setGameState';
import { TimeAndMinecountWrapper, Timer, TimerNumber } from './styles/elements';

function Clock({ gameState, setTimeRed, setGameState }) {
  let [time, setTime] = useState(0);

  // Update Time and set if finnished or starting
  useEffect(() => {
    if (gameState === 'running') {
      setTimeArr();
      setTimeout(() => {
        setTime((time += 1));
      }, 1000);
    } else if (gameState === 'win') {
      setTimeRed(time);
    } else if (gameState === 'start') {
      setTime(0);
    }
  }, [time, gameState]);

  // Convert time to single numbers for css background
  const setTimeArr = () => {
    // Get the time into an array and unshift 0's in front of it until 3 places are filled
    let nums = time.toString().split('');
    let arr = [];

    if (nums.length === 1) {
      arr.unshift('zero');
      arr.unshift('zero');
    } else if (nums.length === 2) {
      arr.unshift('zero');
    } else if (nums.length > 3) {
      setTime(0);
      setGameState('lost');
    }

    // Push the appropriate number into the array, numbers written out are
    // classnames for the background
    let numEquivalent = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    for (let i = 0; i < nums.length; i++) {
      arr.push(numEquivalent[nums[i]]);
    }

    return (
      <React.Fragment>
        <TimerNumber numb={arr[0]}></TimerNumber>
        <TimerNumber numb={arr[1]}></TimerNumber>
        <TimerNumber numb={arr[2]}></TimerNumber>
      </React.Fragment>
    );
  };

  return (
    <TimeAndMinecountWrapper>
      <Timer>{setTimeArr()}</Timer>
    </TimeAndMinecountWrapper>
  );
}

const mapStateToProps = (state) => ({
  gameState: state.gameState,
});

const mapAcitonsToProps = {
  setTimeRed,
  setGameState,
};

export default React.memo(connect(mapStateToProps, mapAcitonsToProps)(Clock));
