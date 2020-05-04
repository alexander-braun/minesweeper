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
    </React.Fragment>
    )
}

const mapStateToProps = state => ({

})

const mapActionsToProps = {

}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(Gamestat))