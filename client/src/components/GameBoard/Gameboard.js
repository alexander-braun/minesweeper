import React, { useState, useEffect } from 'react';
import '../../styles/gamefield.css';
import Gridelement from './Gridelement';
import setGrid from '../../actions/setGrid';
import Gamestate from './Gamestate';
import { v4 as uuidv4 } from 'uuid';
import setRevealedArr from '../../actions/setRevealedArr';
import setMinecount from '../../actions/setMinecount';
import setFlagcount from '../../actions/setFlagCount';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GameboardWrapper, GameboardEl, Gamefield } from './styles/elements';

const generateGridArray = (gridL = 9, gridH = 9, minecounter = 10) => {
  const grid = [];

  //create general grid with x, y coordinates
  //determine if mine or not
  for (let i = 0; i < gridH; i++) {
    grid.push([]);
    for (let j = 0; j < gridL; j++) {
      grid[i].push([i, j, false]); // X, Y, MINE, MINECOUNT
    }
  }

  // Generate mines, look if there is already a mine and either put mine to true or go one step back (i--)
  for (let i = 0; i < minecounter; i++) {
    let random1 = Math.floor(Math.random() * Math.floor(gridH));
    let random2 = Math.floor(Math.random() * Math.floor(gridL));
    if (!grid[random1][random2][2]) {
      grid[random1][random2][2] = true;
    } else i--;
  }

  //push number of mines (around x,y coordinate) to end of array
  for (let i = 0; i < gridH; i++) {
    for (let j = 0; j < gridL; j++) {
      let minecount = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          let cell = grid[i][j];
          if (
            cell[0] + x >= 0 &&
            cell[1] + y >= 0 &&
            cell[0] + x <= gridH - 1 &&
            cell[1] + y <= gridL - 1
          ) {
            if (grid[cell[0] + x][cell[1] + y][2]) minecount++;
          }
        }
      }
      grid[i][j].push(minecount);
    }
  }
  return grid;
};

// Construct the gridhtml-elements based on the generated grid
// Takes into account the gridelement width and height based
// on the difficulty setting
const generateGrid = (grid, gridSize) => {
  if (grid === undefined) return;

  const gridArray = [];
  let counter = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      gridArray.push(
        <Gridelement
          value={[grid[i][j][0], grid[i][j][1]]}
          mine={grid[i][j][2]}
          minesAround={grid[i][j][3]}
          key={uuidv4()}
          position={counter}
          gridL={grid[0].length}
          gridH={grid.length}
          grid={grid}
          gridSize={gridSize}
        />
      );
      counter++;
    }
  }
  return gridArray;
};

function Gameboard(props) {
  // minecount set in useeffect below
  let [minecounter, setMinecounter] = useState(10);

  // grid length and height set to default small
  let [gridL, setGridL] = useState(9);
  let [gridH, setGridH] = useState(9);

  const difficulty = useSelector((state) => state.difficulty);
  const dispatch = useDispatch();

  // Setup revealed elements Arr
  let [arr, setArr] = useState(new Array(gridL * gridH).fill(false));
  let grid = generateGridArray(gridL, gridH, minecounter);

  // Flag/Minecounter
  const setCounter = () => {
    if (!difficulty) return;

    if (difficulty === 9) {
      return 10;
    } else if (difficulty === 16) {
      return 40;
    } else if (difficulty === 30) {
      return 99;
    }
  };

  let [counter, setCount] = useState(setCounter());
  let [gridSize, updateGridsize] = useState();

  // First useEffect for dispatching flag- and minecount. Generates the Grid
  useEffect(() => {
    dispatch(setFlagcount(setCounter()));
    dispatch(setMinecount(setCounter()));

    setCount(setCounter());
    setMinecounter(setCounter());
    setArr(new Array(gridL * gridH).fill(false));

    grid = generateGridArray(gridL, gridH, minecounter);
  }, [difficulty, dispatch, gridL, gridH]);

  // Second useEffect for difficulty, gridsize and managing revealed state
  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (difficulty === 9) {
      setGridL(9);
      setGridH(9);
      updateGridsize('30px');
    } else if (difficulty === 16) {
      setGridL(16);
      setGridH(16);
      windowWidth < 1200 ? updateGridsize('23px') : updateGridsize('30px');
    } else if (difficulty === 30) {
      setGridL(30);
      setGridH(16);
      updateGridsize('20px');
      windowWidth < 1200 ? updateGridsize('20px') : updateGridsize('30px');
    }

    dispatch(setRevealedArr(arr));
  }, [difficulty, dispatch, arr, grid, minecounter]);

  return (
    <GameboardWrapper>
      <GameboardEl>
        <Gamestate
          counter={counter}
          setArr={setArr}
          gridL={gridL}
          gridH={gridH}
          setGrid={setGrid}
          genGrid={generateGridArray}
          gridSize={difficulty}
        />
        <Gamefield gridL={gridL} gridSize={gridSize} gridH={gridH}>
          {generateGrid(grid, gridSize)}
        </Gamefield>
      </GameboardEl>
    </GameboardWrapper>
  );
}

export default React.memo(Gameboard);
