import { SET_GAME_STATE } from './constants'

const setGameState = gameState => ({
    type: SET_GAME_STATE,
    gameState
})

export default setGameState