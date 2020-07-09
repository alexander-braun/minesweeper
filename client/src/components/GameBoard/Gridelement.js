import React from 'react';
import { connect } from 'react-redux';
import setGameState from '../../actions/setGameState';
import setRevealed from '../../actions/setRevealed';
import setRevealedArr from '../../actions/setRevealedArr';
import ff from './minecalcs';
import updateFlagcount from '../../actions/updateFlagcount';
import ButtonEl from './ButtonEl';
import { GridelementWrapper, FlagElement } from './styles/elements';

// Used to generate All sounds in the game
const audioPlay = (audioName, sound) => {
  if (!sound) return;

  // Just playing audio caused bug in chrome and this solution fixed it
  let audio = document.getElementById(audioName);
  let playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => {})
      .catch((error) => {
        console.log('playback prevented');
      });
  }
  return;
};

class Gridelement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      flag: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.revealAllMines = this.revealAllMines.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.countRevealed = this.countRevealed.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.genFlag = this.genFlag.bind(this);
  }

  // Handles all left clicks
  handleClick = (e) => {
    this.setState({
      clicked: true,
    });

    let gamestate = this.props.gameState;

    // Game already lost or won ? don't do anything
    if (gamestate === 'lost' || gamestate === 'win') return;

    // If game still on start, set it to running
    gamestate !== 'running' && this.props.setGameState('running');

    // If there is a flag on this position take it away from state obj and update flagcount
    if (this.state.flag) {
      this.setState({
        flag: false,
      });
      this.props.updateFlagcount(1);
    }

    // If Gridelement is a mine set Game to lost and reveal all mines
    if (this.props.mine) {
      this.props.setGameState('lost');
      this.revealAllMines();
      audioPlay('audioLoose', this.props.sound);
      return;
    }

    // If no mines around do a floodfill and check for win
    if (this.props.minesAround === 0) {
      audioPlay('audioClickNormal', this.props.sound);
      ff.setAll(
        this.props.value[0],
        this.props.value[1],
        this.props.grid,
        this.props.revealed,
        this.props.gridL,
        this.props.gridH
      );
      this.props.setRevealedArr(ff.returnFloodFill());
      this.checkForWin();
      return;
    } else if (this.props.minesAround !== 0) {
      audioPlay('audioClickNormal', this.props.sound);
      this.props.setRevealed(this.props.position);
    }
  };

  checkForWin = () => {
    if (
      this.props.revealed.length - this.props.mineCount ===
      this.countRevealed()
    ) {
      audioPlay('audioWin', this.props.sound);
      this.revealAllMines();
      return this.props.setGameState('win');
    }
    return false;
  };

  // Counts all gridelements that have the property revealed on them
  countRevealed = () => {
    let counter = 0;
    for (let i = 0; i < this.props.revealed.length; i++) {
      this.props.revealed[i] && counter++;
    }
    return counter;
  };

  // If the user clicks on a mine...
  revealAllMines = () => {
    ff.setAll(
      null,
      null,
      this.props.grid,
      this.props.revealed,
      this.props.gridL,
      this.props.gridH
    );
    this.props.setRevealedArr(ff.revealAllMines());
  };

  setDisplay = () => {
    if (this.props.gameState === 'lost' && this.props.mine) return '🦠';
    if (
      this.state.flag &&
      this.props.mine &&
      this.props.revealed[this.props.position]
    )
      return '';
    if (this.props.gameState === 'win' && this.props.mine) return '🦠';
    if (this.props.mine && !this.state.flag) return '🦠';
    if (this.props.minesAround === 0) return '';
    if (this.props.minesAround !== 0) return this.props.minesAround;
  };

  // Handles all right clicks
  preventDefault = (e) => {
    e.preventDefault();

    if (this.props.gameState === 'lost' || this.props.gameState === 'win')
      return;

    // If no more flags left and this element doesn't have a flag to take away
    if (this.props.flagCount <= 0 && !this.state.flag) return;

    // If revealed
    if (this.props.revealed[this.props.position]) return;

    audioPlay('audioClickFlag', this.props.sound);

    // If there is already a flag take the flag away and update flagcount
    if (!this.state.flag) {
      this.props.updateFlagcount(-1);
    } else if (this.state.flag) {
      this.props.updateFlagcount(1);
    }

    // ..update state flag count
    this.setState({
      flag: !this.state.flag,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // Floodfill reveales also elements marked with a flag
    // This prevents the flagcount from beeing too low after it
    if (this.state.flag && this.props.revealed[this.props.position]) {
      this.setState({
        flag: false,
      });
      this.props.updateFlagcount(1);
    }

    //only check for win if the element is clicked
    this.state.clicked &&
      this.props.gameState !== 'start' &&
      this.props.gameState !== 'pause' &&
      this.props.revealed[this.props.position] &&
      this.checkForWin();
  }

  genButtonColor = () => {
    if (this.props.mine) {
      return 'black';
    }

    // minecount determines color
    const colors = [
      'blue',
      'green',
      'brightred',
      'darkblue',
      'darkred',
      'mint',
      'black',
    ];
    return colors[this.props.minesAround];
  };

  genFlag = () => {
    // Return a flag if state.flag OR if game is won and there is a mine here
    if (
      (this.state.flag && !this.props.revealed[this.props.position]) ||
      (this.props.gameState === 'win' &&
        this.props.revealed[this.props.position] &&
        this.props.mine)
    ) {
      return (
        <FlagElement>
          <span role='img' aria-label='flag'>
            &#128138;
          </span>
        </FlagElement>
      );
    }
  };

  render() {
    const { revealed, position, gridSize } = this.props;

    return (
      <GridelementWrapper
        revealed={revealed[position]}
        propWidth={gridSize}
        propHeight={gridSize}
        propFontSize={
          gridSize === '20px'
            ? 'small'
            : gridSize === '23px'
            ? 'medium'
            : 'large'
        }
      >
        <ButtonEl
          preventDefault={this.preventDefault}
          genButtonColor={this.genButtonColor}
          handleClick={this.handleClick}
          setDisplay={this.setDisplay}
          revealed={revealed[position]}
        />
        {this.genFlag()}
      </GridelementWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  gameState: state.gameState,
  revealed: state.revealed,
  flagCount: state.flagCount,
  mineCount: state.minecount,
  sound: state.sound,
  difficulty: state.difficulty,
});

const mapActionsToProps = {
  setGameState,
  setRevealed,
  setRevealedArr,
  updateFlagcount,
};

export default connect(mapStateToProps, mapActionsToProps)(Gridelement);
