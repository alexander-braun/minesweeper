import React from 'react'


function ButtonEl(props) {
    return (
        <React.Fragment>
            <button 
                onContextMenu={props.preventDefault}
                className={props.genButtonClassname()} 
                style={{width:'100%', height: '100%'}} 
                onClick={props.handleClick}
            >
                { props.revealed && props.setDisplay() }
            </button>
        </React.Fragment>
    )
}

export default React.memo(ButtonEl)
