import React from 'react'
import Bestlist from './Bestlist'
import { connect } from 'react-redux'
import SubmitTime from './SubmitTime'

function Side(props) {

    const genSide = () => {
        if(props.gameState === 'win') {
            return (
                <div className="side">
                    <SubmitTime />
                </div>
            )
        } else return (
            <div className="side">
                <Bestlist />
            </div>
        )
    }

    return genSide()
}

const mapStateToProps = state => ({
    time: state.time,
    gameState: state.gameState
})

export default React.memo(connect(mapStateToProps)(Side))
