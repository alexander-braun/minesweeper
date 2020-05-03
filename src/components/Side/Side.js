import React from 'react'
import Bestlist from './Bestlist'
import Difficulty from './Difficulty'


function Side(props) {
    return (
        <div className="side">
            <Bestlist />
        </div>
    )
}

export default React.memo(Side)
