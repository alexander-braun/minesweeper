import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { 
    BestlistHeading, 
    BestlistSurvivors, 
    RecordholderWrapper, 
    RecordholderName, 
    RecordholderTime, 
    RecordholderTimeSign, 
    RecordholderUsername,
    RecordholderDifficulty,
    NoRecordholderWrapper
} from './styles/elements'

function Bestlist({ lvl, getPosts, posts: { posts, loading }}) {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    const [survivorsExist, setSurvivorsExist] = useState(true)

    const generateSurvivors = () => {
        if(posts.length === 0) return
        
        // Get all times and sort them but only if lvl is the same as current difficulty
        let values = Object.values(posts).map(post => {
            if(post['lvl'] === String(lvl)) return post['time']
            else return null
        }).sort().slice(0)

        // If no survivors
        if(values[0] === undefined || values[0] === null) {
            survivorsExist !== false && setSurvivorsExist(false)
            return (
                <NoRecordholderWrapper>No survivors for this difficulty</NoRecordholderWrapper>
            )
        }

        survivorsExist !== true && setSurvivorsExist(true)

        // Create the survivorlist 
        let survivors = []
        for(let value of values) {
            Object.keys(posts).map(index => {
                if(posts[index]['time'] === value) {
                    survivors.push(
                        <RecordholderWrapper key={uuidv4()}>
                            <RecordholderName>
                                <RecordholderUsername>
                                    {values.indexOf(posts[index]['time']) + 1 + '.' + posts[index]['user']}
                                </RecordholderUsername>
                                <RecordholderDifficulty>
                                    {`Lvl ${posts[index]['lvl']}`}
                                </RecordholderDifficulty>
                            </RecordholderName>
                            <RecordholderTime>
                                {posts[index]['time']}
                                <RecordholderTimeSign>
                                    s
                                </RecordholderTimeSign>
                            </RecordholderTime>
                        </RecordholderWrapper>
                    )
                    return null
                } else return null
            })
        }
        return survivors
    }

    return (
        <React.Fragment>
            <BestlistHeading>
                <span role="img" aria-label="fire-emoji">&#128293;&#128293;&#128293;</span>
                <span>Survivors</span>
                <span role="img" aria-label="fire-emoji">&#128293;&#128293;&#128293;</span>
            </BestlistHeading>
            <BestlistSurvivors survivorsExist={survivorsExist}>
                {
                    generateSurvivors()
                }
            </BestlistSurvivors>
        </React.Fragment>
    )
}

Bestlist.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    lvl: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts,
    lvl: state.difficulty
})

const mapActionToProps = {
    getPosts
}

export default React.memo(connect(mapStateToProps, mapActionToProps)(Bestlist))
