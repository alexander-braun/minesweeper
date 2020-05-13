import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

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
                <div className={arr[0] + ' number_element'}></div>
                <div className={arr[1] + ' number_element'}></div>
                <div className={arr[2] + ' number_element'}></div>
            </React.Fragment>
        )
    }, [flagCount])

    let [timeArr, setArr] = useState(setCountArr())

    useEffect(() => {
        setArr(setCountArr())
    }, [revealed, flagCount, setCountArr])

    return (
        <div id="time" className="brightred">
            <div className="foreground_timer">
                {
                    timeArr
                }
            </div>
        </div>
    )
}


export default React.memo(Counter)