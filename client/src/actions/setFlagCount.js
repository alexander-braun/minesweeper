import { SET_FLAGCOUNT } from "./constants"

const setFlagcount = flagCount => {
    return {
        type: SET_FLAGCOUNT,
        flagCount
    }
}

export default setFlagcount