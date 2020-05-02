import { combineReducers } from 'redux'
import grid from './grid'
import mines from './mines'
import gameState from './gamestate'
import revealed from './revealed'
import minecount from './minecount'
import flagCount from './flagCount'
import difficulty from './difficulty'

export default combineReducers({
    grid,
    mines,
    gameState,
    revealed,
    minecount,
    flagCount,
    difficulty
})