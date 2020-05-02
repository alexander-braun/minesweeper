import React, { useState } from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../actions/setDifficulty'
import setGrid from '../actions/setGrid'
import setGameState from '../actions/setGameState'
import setRevealedArr from '../actions/setRevealedArr'

function SelectMenue(props) {

    const [defaultVal] = useState('game')

    const handleChange = (e) => {
        let difficulty
        e.target.value=== 'beginner' ? difficulty = 9 :
        e.target.value === 'intermediate' ? difficulty = 16 : difficulty = 30
        props.setDifficulty(difficulty)
    }

    return (
        <div className="select-menue">
            <select className="select-css" onChange={handleChange} value={defaultVal}>
                <option hidden value="game">Game</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
        </div>
    )
}

const mapStateToProps = state => ({
    difficulty: state.difficulty,
    grid: state.grid,
    gameState: state.gameState
})

const mapActionsToProps = {
    setDifficulty,
    setGrid,
    setGameState,
    setRevealedArr
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SelectMenue))
