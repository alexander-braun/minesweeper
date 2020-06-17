import React from 'react'
import Bestlist from './Bestlist'
import SubmitTime from './SubmitTime'
import { Sidewrapper } from '../styles/elements'
import { useSelector } from 'react-redux'

function Side() {
    const gameState = useSelector(state => state.gameState)
    const genSide = () => {
        if(gameState === 'win') {
            return (
                <Sidewrapper>
                    <SubmitTime />
                </Sidewrapper>
            )
        } else return (
            <Sidewrapper>
                <Bestlist />
            </Sidewrapper>
        )
    }
    return genSide()
}

export default Side
