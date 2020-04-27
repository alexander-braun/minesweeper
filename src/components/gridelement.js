import React, {useState} from 'react'
import { connect } from 'react-redux'

function Gridelement(props) {

  const [buttonDisplay, updateButtonDisplay] = useState('')

  const countMinesNearby = () => {
    if(props.isMine) return
    const position = props.pos
    let minecount = 0
    const surrounding = []
    //Account for Rows
    for(let i = -1; i <= 1; i++) {
      //Account for Columns
      for(let j = -1; j <= 1; j++) {
        if(position[0] + i > 9 || 
          position[1] + j > 9 || 
          (position[0] === (position[0] + i) && position[1] === (position[1] + j)) ||
          position[0] + i < 0 || 
          position[1] + j < 0
          ) continue
        let surroundingElem = [position[0] + i, position[1] + j]
        surrounding.push(surroundingElem)
      }
    }

    let mines = surrounding.map(element => {
      return props.mines.map(mine => {
        return element[0] === mine[0] && element[1] === mine[1]
       })
    })

    for(let i = 0; i < mines.length; i++) {
      mines[i].includes(true) && minecount++
    }
    return minecount
  }

  const handleClick = () => {
    if(props.isMine) return updateButtonDisplay('M')
    else return updateButtonDisplay(countMinesNearby())
  }

  return (
    <div className="gridelement">
      <button onClick={handleClick} style={{width:'100%', height: '100%'}}>
        {
          countMinesNearby()
        }
      </button>
    </div>
  )
}

const mapStateToProps = ({
  
})

export default connect()(Gridelement)