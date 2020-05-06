import { SET_FLAGCOUNT } from "./constants"



const setFlagcount = flagCount => {
    console.log(flagCount)
    return {
        type: SET_FLAGCOUNT,
        flagCount
    }
}

export default setFlagcount