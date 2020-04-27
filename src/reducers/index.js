import { combineReducers } from 'redux'
import grid from './grid'
import mines from './mines'


export default combineReducers({
    grid,
    mines
})