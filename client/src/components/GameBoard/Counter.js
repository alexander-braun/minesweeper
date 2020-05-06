import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

function Counter(props) {

    let flagCount = useSelector(state => state.flagCount)

    const setTimeArr = useCallback(() => {
        let nums = flagCount.toString().split('')
        let arr = []
        if(nums.length === 1) {
            arr.unshift('zero')
            arr.unshift('zero')
        } else if (nums.length === 2) {
            arr.unshift('zero')
        }

        for(let num of nums) {
            switch(num) {
                case '0':
                    arr.push('zero')
                    break
                case '1':
                    arr.push('one')
                    break
                case '2':
                    arr.push('two')
                    break
                case '3':
                    arr.push('three')
                    break
                case '4':
                    arr.push('four')
                    break
                case '5':
                    arr.push('five')
                    break
                case '6':
                    arr.push('six')
                    break
                case '7':
                    arr.push('seven')
                    break
                case '8':
                    arr.push('eight')
                    break
                case '9':
                    arr.push('nine')
                    break
                default:
                    break
            }
        }

        return (
            <React.Fragment>
                <div className={arr[0] + ' number_element'}></div>
                <div className={arr[1] + ' number_element'}></div>
                <div className={arr[2] + ' number_element'}></div>
            </React.Fragment>
        )
    }, [flagCount])

    let [timeArr, setArr] = useState(setTimeArr())

    let revealed = useSelector(state => state.revealed)

    useEffect(() => {
        setArr(setTimeArr())
    }, [revealed, flagCount, setTimeArr])

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