import { combineReducers } from 'redux'
import grid from './grid'
import mines from './mines'
import gameState from './gamestate'
import revealed from './revealed'

export default combineReducers({
    grid,
    mines,
    gameState,
    revealed
})