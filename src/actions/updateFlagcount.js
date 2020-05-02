import { UPDATE_FLAGCOUNT } from "./constants"

const updateFlagcount = count => ({
    type: UPDATE_FLAGCOUNT,
    count
})

export default updateFlagcount