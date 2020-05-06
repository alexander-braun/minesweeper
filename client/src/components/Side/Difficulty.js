import React, { useState } from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../../actions/setDifficulty'
import setGrid from '../../actions/setGrid'
import setGameState from '../../actions/setGameState'
import setRevealedArr from '../../actions/setRevealedArr'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { makeStyles } from '@material-ui/core/styles'
import setSound from '../../actions/setSound'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white'
    },
}));

function SelectMenue(props) {
    const classes = useStyles()
    const [sound, switchSound] = useState(true)

    const handleSound = () => {
        switchSound(!sound)
        props.setSound(!sound)
    }

    const soundIcon = () => {
        if(sound) {
            return <VolumeUpIcon />
        } else return <VolumeOffIcon />
    }

    const handleChange = (e) => {
        let difficulty
        e.target.value === 'beginner' ? difficulty = 9 :
        e.target.value === 'intermediate' ? difficulty = 16 : difficulty = 30
        props.setDifficulty(difficulty)
        props.setGameState('start')

        let buttons = document.getElementsByClassName('difficulty_select')

        for(let button of buttons) {
            if(button !== null && button.classList) {
                button.classList.contains('selected') && button.classList.remove('selected')
            }
        }

        let element = document.getElementById(`${e.target.value}_button`)
        element.classList.add('selected')
    }

    return (
        <div className="select-menue">
            <button className="difficulty_select selected" value="beginner" id="beginner_button" onClick={e=> handleChange(e)}>Beginner</button>
            <button className="difficulty_select" value="intermediate" id="intermediate_button" onClick={e=> handleChange(e)}>Intermediate</button>
            <button className="difficulty_select" value="expert" id="expert_button" onClick={e=> handleChange(e)}>Expert</button>
            <div id="sound_icon" className={classes.root} onClick={handleSound}>
                {soundIcon()}
            </div>
            <a href="https://github.com/alexander-braun/coronasweeper" target="blank" className={classes.root} id="github_icon"><GitHubIcon /></a>
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
    setRevealedArr,
    setSound
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SelectMenue))
