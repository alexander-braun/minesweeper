import React from 'react'
import { connect } from 'react-redux'
import setGameState from '../../actions/setGameState'
import setRevealed from '../../actions/setRevealed'
import setRevealedArr from '../../actions/setRevealedArr'
import ff from './minecalcs'
import updateFlagcount from '../../actions/updateFlagcount'
import ButtonEl from './ButtonEl'

class Gridelement extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        clicked: false,
        flag: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.revealAllMines = this.revealAllMines.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.countRevealed = this.countRevealed.bind(this)
    this.preventDefault = this.preventDefault.bind(this)
    this.genWrapperClassname = this.genWrapperClassname.bind(this)
    this.genButtonClassname = this.genButtonClassname.bind(this)
    this.setDisplay = this.setDisplay.bind(this)
    this.genFlag = this.genFlag.bind(this)
  }

  handleClick = (e) => {

    this.setState({
      clicked: true
    })

    let gamestate = this.props.gameState

    // Game already lost or won ? don't do anything
    if(gamestate === 'lost' || gamestate === 'win') return

    // If game still on start now on running after first click
    gamestate !== 'running' && this.props.setGameState('running')

    // Just playing audio caused bug in chrome and this solution fixed it for whatever reason :/
    let audioNormalClick = document.getElementById('clickNormal')
    let playPromise = audioNormalClick.play()
    if(playPromise !== undefined) {
      playPromise
        .then(_=> {
          console.log('audio played auto')
        })
        .catch(error => {
          console.log('playback prevented')
        })
    }

    if(this.state.flag) {
      this.setState({
        flag: false
      })
      this.props.updateFlagcount(1)
    }

    // If Gridelement is a mine set Game to lost and reveal all mines
    if(this.props.mine) {
      this.props.setGameState('lost')
      this.revealAllMines()

      // Just playing audio caused bug in chrome and this solution fixed it for whatever reason :/
      let audioLoose = document.getElementById('audioLoose')
      let playPromise = audioLoose.play()
      if(playPromise !== undefined) {
        playPromise
          .then(_=> {
            console.log('audio played auto')
          })
          .catch(error => {
            console.log('playback prevented')
          })
      }
      return
    }

    // If no mines around do a floodfill from floodfill revealing module
    if(this.props.minesAround === 0) {
      ff.setAll(this.props.value[0], this.props.value[1], this.props.grid, this.props.revealed, this.props.gridL, this.props.gridH)
      console.log('call floodfill')
      this.props.setRevealedArr(ff.returnFloodFill())
      this.checkForWin()
      return

    } else if(this.props.minesAround !== 0) {
      this.props.setRevealed(this.props.position)
    }
  }

  checkForWin = () => {
    if(this.props.revealed.length - this.props.mineCount === this.countRevealed()) {
      this.revealAllMines()

      // Just playing audio caused bug in chrome and this solution fixed it for whatever reason :/
      let audioWin = document.getElementById('winsound')
      let playPromise = audioWin.play()
      if(playPromise !== undefined) {
        playPromise
          .then(_=> {
            console.log('audio played auto')
          })
          .catch(error => {
            console.log('playback prevented')
          })
      }
      return this.props.setGameState('win')  
    }
    return false
  }

  countRevealed = () => {
    let counter = 0
    for(let i = 0; i < this.props.revealed.length; i++) {
        this.props.revealed[i] && counter++
    }
    return counter
  }

  revealAllMines = () => {
    ff.setAll(null, null, this.props.grid, this.props.revealed, this.props.gridL, this.props.gridH)
    this.props.setRevealedArr(ff.revealAllMines())
  }

  setDisplay = () => {
    if(this.props.gameState === 'lost' && this.props.mine) return '🦠'
    if(this.state.flag && this.props.mine && this.props.revealed[this.props.position]) return ''
    if(this.props.gameState === 'win' && this.props.mine) return ''
    if(this.props.mine && !this.state.flag) return '*'
    if(this.props.minesAround === 0) return ''
    if(this.props.minesAround !== 0) return this.props.minesAround    
  }

  preventDefault = e => {
    e.preventDefault()

    if(this.props.gameState === 'lost' || this.props.gameState === 'win') return

    // If no more flags left and this element doesn't have a flag to take away
    if(this.props.flagCount <= 0 && !this.state.flag) return

    // If revealed 

    if(this.props.revealed[this.props.position]) return

    // Just playing audio caused bug in chrome and this solution fixed it for whatever reason :/
    let audioFlagClick = document.getElementById('clickFlag')
    let playPromise = audioFlagClick.play()
    if(playPromise !== undefined) {
      playPromise
        .then(_=> {
          console.log('audio played auto')
        })
        .catch(error => {
          console.log('playback prevented')
        })
    }

    if(!this.state.flag) {
      this.props.updateFlagcount(-1)  
    } else if(this.state.flag) {
      this.props.updateFlagcount(1)
    }

    this.setState({
      flag: !this.state.flag
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.clicked && 
    this.props.gameState !== 'start' && 
    this.props.gameState !== 'pause' && 
    this.props.revealed[this.props.position] && this.checkForWin()  
  }

  genButtonColor = () => {
    if(this.props.mine) {
      return 'black'
    }

    switch(this.props.minesAround) {
      case 1:
        return 'blue'
      case 2:
        return 'green'
      case 3: 
        return 'brightred'
      case 4: 
        return 'darkblue'
      case 5: 
        return 'darkred'
      case 6:
        return 'mint'
      case 7:
        return 'black'
      default:
        return
    }
  }

  genFlag = () => {
    //💉
    if(this.state.flag && !this.props.revealed[this.props.position]) {
      return <div className="flag"><span role="img" aria-label="flag">💊</span></div>
    } else if(this.props.gameState === 'win' && this.props.revealed[this.props.position] && this.props.mine) {
      return <div className="flag"><span role="img" aria-label="flag">💊</span></div>
    }
  }

  genButtonClassname = () => {
    let classname = []
    if(this.props.revealed[this.props.position]) {
      classname.push('revealed')
      classname.push(this.genButtonColor())
      this.state.clicked && classname.push('clicked')
    }
    return classname.join(' ')
  }

  genWrapperClassname = () => {
    if(this.props.revealed[this.props.position]){
      return 'gridelement revealed'
    } else return 'gridelement'
  }

  componentDidUpdate() {
    if(this.state.flag && this.props.revealed[this.props.position]) {
      this.setState({
        flag: false
      })
      this.props.updateFlagcount(1)
    }
  }

  render() {
    const { value, revealed, position } = this.props
    return (
      <div id={value} className={this.genWrapperClassname()}>
        <ButtonEl 
          preventDefault={this.preventDefault}
          genButtonClassname={this.genButtonClassname}
          handleClick={this.handleClick}
          setDisplay={this.setDisplay}
          position={position}
          revealed={revealed[position]}
        />
        { this.genFlag() }
      </div>
    )
  }
}

//-> OLD WHITE FOR VIRUS { revealed[position] && mine && gameState !== 'win' ? <div className="white"></div> : null }

const mapStateToProps = state => ({
  gameState: state.gameState,
  revealed: state.revealed,
  flagCount: state.flagCount,
  mineCount: state.minecount
})

const mapActionsToProps = {
  setGameState,
  setRevealed,
  setRevealedArr,
  updateFlagcount
}

export default connect(mapStateToProps, mapActionsToProps)(Gridelement)