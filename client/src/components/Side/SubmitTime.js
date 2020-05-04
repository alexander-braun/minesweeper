import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { addPost } from '../../actions/posts'
import setGameState from '../../actions/setGameState'

function SubmitTime({ addPost, time, lvl, posts, setGameState }) {

    const [text, setText] = useState('')

    const handleClick = () => {
        setGameState('start')
    }

    return (
        <React.Fragment>
            <div className="bestlist">
                Submit Time!
            </div>
            <div className="post-form">
                <form className="submit_form" onSubmit={ e=> {
                    e.preventDefault()
                    addPost({ 
                        "user": text,
                        "time": time,
                        "lvl": lvl
                     })
                    setText('')
                    setGameState('start')
                }}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Enter your name"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                    >
                    </textarea>
                    <div className="form_buttons">
                        <input type="submit" className="submitbutton" value="Submit"></input>
                        <button className="return_survivors" onClick={handleClick}>No Thanks!</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

SubmitTime.propTypes = {
    addPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts,
    time: state.time,
    lvl: state.difficulty
})

const mapActionToProps = {
    addPost,
    setGameState
}

export default React.memo(connect(mapStateToProps, mapActionToProps)(SubmitTime))
