import React, { useState } from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../actions/setDifficulty'

function SelectMenue(props) {

    const [defaultVal, setDefaultVal] = useState('game')

    const handleChange = (e) => {
        props.setDifficulty(e.target.value)
        setDefaultVal('game')
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
    difficulty: state.difficulty
})

const mapActionsToProps = {
    setDifficulty
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SelectMenue))
