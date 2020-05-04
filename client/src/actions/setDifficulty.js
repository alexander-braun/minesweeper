import { SET_DIFFICULTY } from './constants'

const setDifficulty = difficulty => ({
    type: SET_DIFFICULTY,
    difficulty
})

export default setDifficulty