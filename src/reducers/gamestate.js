import { SET_GAME_STATE } from '../actions/constants'

const gameState = (state = 'running', action) => {
    switch(action.type) {
        case SET_GAME_STATE:
            return action.gameState
        default: return state
    }
}

export default gameState