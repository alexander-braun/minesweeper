import React from 'react'
import { connect } from 'react-redux'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white'
    },
}));

function SoundOnOff(props) {
    const classes = useStyles()
  return (

    <React.Fragment>
        <div className={classes.root}>
            <VolumeOffIcon />
        </div>
    </React.Fragment>
    )
}

const mapStateToProps = state => ({

})

const mapActionsToProps = {

}

export default React.memo(connect(mapStateToProps, mapActionsToProps)(SoundOnOff))