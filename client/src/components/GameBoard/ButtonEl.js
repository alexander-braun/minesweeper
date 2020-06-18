import React from 'react'
import { GridelementButton } from './styles/elements'

function ButtonEl(props) {
    return (
        <GridelementButton
            onContextMenu={props.preventDefault}
            onClick={props.handleClick}
            revealed={props.revealed}
            propColor={props.genButtonColor()}
        >
            {props.revealed && props.setDisplay()}
        </GridelementButton>
    )
}

export default React.memo(ButtonEl)
