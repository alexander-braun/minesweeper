import { SET_FLAGCOUNT } from "./constants"

const setFlagcount = flagCount => ({
    type: SET_FLAGCOUNT,
    flagCount
})

export default setFlagcount