import React, { useState } from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../../actions/setDifficulty'
import setGameState from '../../actions/setGameState'
import setRevealedArr from '../../actions/setRevealedArr'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { makeStyles } from '@material-ui/core/styles'
import setSound from '../../actions/setSound'
import GitHubIcon from '@material-ui/icons/GitHub'
import { SelectMenueWrapper, SelectButton } from '../styles/elements'

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

    const handleChange = (e) => {
        let difficulty
        e.target.value === 'beginner' ? difficulty = 9 :
        e.target.value === 'intermediate' ? difficulty = 16 : difficulty = 30
        props.setDifficulty(difficulty)
        props.setGameState('start')
    }

    return (
        <SelectMenueWrapper className="select-menue">
            <SelectButton 
                value="beginner" 
                onClick={e=> handleChange(e)}
                selected={props.difficulty === 9}
            >
                Beginner
            </SelectButton>
            <SelectButton 
                value="intermediate"
                onClick={e=> handleChange(e)}
                selected={props.difficulty === 16}
            >
                Intermediate
            </SelectButton>
            <SelectButton 
                value="expert"
                onClick={e=> handleChange(e)}
                selected={props.difficulty === 30}
            >
                Expert
            </SelectButton>
            <div id="sound_icon" className={classes.root} onClick={handleSound}>
                {sound ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </div>
            <a href="https://github.com/alexander-braun/coronasweeper" target="blank" className={classes.root} id="github_icon"><GitHubIcon /></a>
        </SelectMenueWrapper>
    )
}

const mapStateToProps = state => ({
    difficulty: state.difficulty
})

const mapActionsToProps = {
    setDifficulty,
    setGameState,
    setRevealedArr,
    setSound
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SelectMenue))
