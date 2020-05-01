import React, {useState,useEffect } from 'react'
import { connect } from 'react-redux'
import setGameState from '../actions/setGameState'
import setRevealed from '../actions/setRevealed'
import setRevealedArr from '../actions/setRevealedArr'
import ff from './minecalcs'

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

    this.setState({
      clicked: true
    })

    // If game still on start now on running after first click
    gamestate !== 'running' && this.props.setGameState('running')

    // If Gridelement is a mine set Game to lost and reveal all mines
    if(this.props.mine) {
      this.props.setGameState('lost')
      this.props.setRevealed(this.props.position)
      this.revealAllMines()
      return
    }

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
    if(this.props.mine) return '*'
    if(this.props.minesAround === 0) return ''
    if(this.props.minesAround !== 0) return this.props.minesAround    
  }

  preventDefault = e => {
    e.preventDefault()

    // If revealed 
    if(this.props.gameState === 'lost' || this.props.gameState === 'win' || this.props.revealed[this.props.position]) return

    // If revealed in dom
    let element = document.getElementById([this.props.value[0], this.props.value[1]].toString())
    if(element.classList.contains('revealed')) return

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
    this.state.clicked && this.props.gameState !== 'start' && this.props.gameState !== 'pause' && this.props.revealed[this.props.position] && this.checkForWin()  
  }

  classname = 
    this.props.mine ? 'black' : 
    this.props.minesAround === 1 ? 'blue' : 
    this.props.minesAround === 2 ? 'green' : 
    this.props.minesAround === 3 ? 'brightred' :
    this.props.minesAround === 4 ? 'darkblue' :
    this.props.minesAround === 5 ? 'darkred' :
    this.props.minesAround === 6 ? 'mint' :
    this.props.minesAround === 7 ? 'black' :
    'lightgrey'

  render() {
    return (
      <div id={this.props.value ? this.props.value.toString() : ''} className={`gridelement ${this.props.revealed[this.props.position] ? 'revealed' : ''}`}>
        <button 
          onContextMenu={this.preventDefault}
          className={this.props.revealed[this.props.position] ? `revealed ${this.classname}` : ``} 
          style={{width:'100%', height: '100%'}} 
          onClick={e => this.handleClick(e)}
        >
          {
              this.props.revealed[this.props.position] && this.setDisplay()
          }
        </button>
        {
          this.state.flag && !this.props.revealed[this.props.position] ? <div className="flag">🚩</div> : null
        }
        {
          this.props.mine ? <div className="white"></div> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  grid: state.grid,
  gameState: state.gameState,
  revealed: state.revealed,
  minecount: state.minecount
})

const mapActionsToProps = {
  setGameState,
  setRevealed,
  setRevealedArr
}

export default connect(mapStateToProps, mapActionsToProps)(Gridelement)