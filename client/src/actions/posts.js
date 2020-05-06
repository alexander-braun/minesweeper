import axios from 'axios'
import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST
} from './constants'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const addPost = formData => async dispatch => {
    if(formData['user'].length > 20) return
    if(formData['lvl'].length > 3) return
    if(formData['time'].length > 4) return
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}