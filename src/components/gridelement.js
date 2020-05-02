import React, {useState,useEffect } from 'react'
import { connect } from 'react-redux'
import setGameState from '../actions/setGameState'
import setRevealed from '../actions/setRevealed'
import setRevealedArr from '../actions/setRevealedArr'
import ff from './minecalcs'
import updateFlagcount from '../actions/updateFlagcount'

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
  }

  handleClick = (e) => {
    let gamestate = this.props.gameState
    // Game already lost or won ? don't do anything
    if(gamestate === 'lost' || gamestate === 'win') return

    // If game still on start now on running after first click
    gamestate !== 'running' && this.props.setGameState('running')

    // If Gridelement is a mine set Game to lost and reveal all mines
    if(this.props.mine) {
      this.props.setGameState('lost')
      this.props.setRevealed(this.props.position)
      this.revealAllMines()
      return
    }

    this.setState({
      clicked: true
    })

    // If no mines around do a floodfill from floodfill revealing module
    if(this.props.minesAround === 0) {
      ff.setAll(this.props.value[0], this.props.value[1], this.props.grid, this.props.revealed)
      this.props.setRevealedArr(ff.returnFloodFill())
      this.checkForWin()
      this.props.setRevealed(this.props.position)
      return
    } else if(this.props.minesAround !== 0) {
      this.props.setRevealed(this.props.position)
    }
  }

  checkForWin = () => {
    if(this.props.revealed.length - this.props.minecount === this.countRevealed()) {
      this.revealAllMines()
      return this.props.setGameState('win')  
    }
    return false
  }

  revealAllMines = () => {
    ff.setAll(null, null, this.props.grid, this.props.revealed)
    this.props.setRevealedArr(ff.revealAllMines())
  }

  setDisplay = () => {
    if(this.props.gameState === 'lost' && this.props.mine) return '*'
    if(this.state.flag && this.props.mine && this.props.revealed[this.props.position]) return ''
    if(this.props.gameState === 'win' && this.props.mine) {
      this.setState({
        flag: true
      })
      return ''
    } 
    if(this.props.mine && !this.state.flag) return '*'
    if(this.props.minesAround === 0) return ''
    if(this.props.minesAround !== 0) return this.props.minesAround    
  }

  preventDefault = e => {
    e.preventDefault()

    if(this.props.flagCount <= 0) {
      if(!this.state.flag) {
        return
      }
    }

    // If revealed 
    if(this.props.gameState === 'lost' || this.props.gameState === 'win' || this.props.revealed[this.props.position]) return

    // If revealed in dom
    let element = document.getElementById([this.props.value[0], this.props.value[1]].toString())
    if(element.classList.contains('revealed')) return

    if(!this.state.flag) {
      this.props.updateFlagcount(-1)  
    } else if(this.state.flag) {
      this.props.updateFlagcount(1)
    }

    this.setState({
        flag: !this.state.flag
    })
  }

  countRevealed = () => {
    let counter = 0
    for(let i = 0; i < this.props.revealed.length; i++) {
        this.props.revealed[i] && counter++
    }
    return counter
  }

  componentDidUpdate() {
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
    if(this.state.flag && !this.props.revealed[this.props.position]) {
      return <div className="flag">🚩</div>
    } else if(this.props.gameState === 'win' && this.props.revealed[this.props.position] && this.props.mine) {
      return <div className="flag">🚩</div>
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

  render() {
    return (
      <div id={this.props.value ? this.props.value.toString() : ''} className={this.genWrapperClassname()}>
        <button 
          onContextMenu={this.preventDefault}
          className={this.genButtonClassname()} 
          style={{width:'100%', height: '100%'}} 
          onClick={e => this.handleClick(e)}
        >
          {
            this.props.revealed[this.props.position] && this.setDisplay()
          }
        </button>
        {
            this.genFlag()
        }
        {
          this.props.mine && !this.state.flag ? <div className="white"></div> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState,
  revealed: state.revealed,
  minecount: state.minecount,
  flagCount: state.flagCount
})

const mapActionsToProps = {
  setGameState,
  setRevealed,
  setRevealedArr,
  updateFlagcount
}

export default connect(mapStateToProps, mapActionsToProps)(Gridelement)