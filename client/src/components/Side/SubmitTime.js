import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/posts'
import setGameState from '../../actions/setGameState'
import { BestlistSubmitHeading, BestlistSubmitFormwrapper, SubmitForm, SubmitFormButtonWrapper, SubmitButton } from './styles/elements'

function SubmitTime({ addPost, time, lvl, setGameState }) {

    const [text, setText] = useState('')

    const handleClick = () => {
        setGameState('start')
    }
    
    return (
        <React.Fragment>
            <BestlistSubmitHeading>
                Submit Your Score!
            </BestlistSubmitHeading>
            <BestlistSubmitFormwrapper>
                <SubmitForm onSubmit={ e=> {
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
                        maxLength="20"
                    >
                    </textarea>
                    <SubmitFormButtonWrapper>
                        <SubmitButton type="submit" value="Submit">Submit!</SubmitButton>
                        <SubmitButton onClick={handleClick}>No Thanks!</SubmitButton>
                    </SubmitFormButtonWrapper>
                </SubmitForm>
            </BestlistSubmitFormwrapper>
        </React.Fragment>
    )
}

SubmitTime.propTypes = {
    addPost: PropTypes.func.isRequired,
    setGameState: PropTypes.func.isRequired
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
