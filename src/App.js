import React from 'react'
import './styles/gamefield.css'
import Gridelement from './components/gridelement'

function App() {

  const generateGridArray = () => {
    const grid =[]
    for(let i = 0; i < 20; i++){
      grid.push([])
      for(let j = 0; j < 20; j++) {
        grid[i].push([i,j])
      }
    } 
    console.log(grid)
    return grid
  }

  const generateMines = (amount = 10) => {
    const mines = []
    
    for(let i = 0; i < amount; i++) {
      let randomXY = [Math.floor(Math.random() * 21), Math.floor(Math.random() * 21)]  
      mines.push(randomXY)
    }
    return mines
  }

  generateMines()

  return (
    <div className="game">
      {
        generateGridArray().map(gridelement => {
          return generateMines().map(mine => {
            return (
              gridelement[0] === mine[0] && gridelement[1] === mine[1] ? <Gridelement mine={true} pos={gridelement} /> : <Gridelement mine={false} pos={gridelement} />
          )})
        })
      }
    </div>
  )
}

export default App;
