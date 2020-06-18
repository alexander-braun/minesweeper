import { TOGGLE_MODAL } from './constants'

const toggleModal = modal => ({
    type: TOGGLE_MODAL,
    modal
})

export default toggleModal