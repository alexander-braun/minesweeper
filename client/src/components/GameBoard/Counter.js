import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { TimeAndMinecountWrapper, Timer, TimerNumber } from './styles/elements'

function Counter() {

    let flagCount = useSelector(state => state.flagCount)
    let revealed = useSelector(state => state.revealed)

    const setCountArr = useCallback(() => {
        let nums = flagCount.toString().split('')
        let arr = []
        if(nums.length === 1) {
            arr.unshift('zero')
            arr.unshift('zero')
        } else if (nums.length === 2) {
            arr.unshift('zero')
        }

        let numEquivalent = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        for(let i = 0; i < nums.length; i++) {
            arr.push(numEquivalent[nums[i]])
        }

        return (
            <React.Fragment>
                <TimerNumber numb={arr[0]}></TimerNumber>
                <TimerNumber numb={arr[1]}></TimerNumber>
                <TimerNumber numb={arr[2]}></TimerNumber>
            </React.Fragment>
        )
    }, [flagCount])

    let [timeArr, setArr] = useState(setCountArr())

    useEffect(() => {
        setArr(setCountArr())
    }, [revealed, flagCount, setCountArr])

    return (
        <TimeAndMinecountWrapper>
            <Timer>
                {
                    timeArr
                }
            </Timer>
        </TimeAndMinecountWrapper>
    )
}


export default React.memo(Counter)