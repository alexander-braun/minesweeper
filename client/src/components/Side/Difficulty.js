import React, { useState } from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../../actions/setDifficulty'
import setGameState from '../../actions/setGameState'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import setSound from '../../actions/setSound'
import GitHubIcon from '@material-ui/icons/GitHub'
import { SelectMenueWrapper, SelectButton } from './styles/elements'

function SelectMenue(props) {
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
        <SelectMenueWrapper>
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
            <div id="sound_icon" style={{color: 'white'}} onClick={handleSound}>
                {sound ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </div>
            <a href="https://github.com/alexander-braun/coronasweeper" target="blank" style={{color: 'white'}} id="github_icon">
                <GitHubIcon />
            </a>
        </SelectMenueWrapper>
    )
}

const mapStateToProps = state => ({
    difficulty: state.difficulty
})

const mapActionsToProps = {
    setDifficulty,
    setGameState,
    setSound
}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SelectMenue))
