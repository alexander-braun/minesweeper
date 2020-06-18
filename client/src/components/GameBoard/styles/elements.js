import styled, { css } from 'styled-components'
import img0 from './img/d0.svg'
import img1 from './img/d1.svg'
import img2 from './img/d2.svg'
import img3 from './img/d3.svg'
import img4 from './img/d4.svg'
import img5 from './img/d5.svg'
import img6 from './img/d6.svg'
import img7 from './img/d7.svg'
import img8 from './img/d8.svg'
import img9 from './img/d9.svg'

export const GridelementButton = styled.button`
  border: none;
  background-color: #c0c0c0;
  border: 3px solid white;
  border-bottom-color: #808080;
  border-right-color: #808080;
  font-weight: 900;
  cursor: pointer;
  color: transparent;
  font-size: inherit;
  width: 100%;
  height: 100%;

  ${props => props.revealed && css`
    font-weight: 900;
    font-family: 'mine-sweeper';
    border: none;
  `}

  ${props => props.propColor === 'blue' && css`
      color: #0000ff;
  `}

  ${props => props.propColor === 'green' && css`
    color: #007b00;
  `}

  ${props => props.propColor === 'brightred' && css`
    color: #ff0000;
  `}

  ${props => props.propColor === 'darkblue' && css`
    color: #00007b;
  `}

  ${props => props.propColor === 'darkred' && css`
    color: #670b04;
  `}

  ${props => props.propColor === 'mint' && css`
    color: #166852;
  `}

  ${props => props.propColor === 'black' && css`
    color: black;
  `}
`

export const TimeAndMinecountWrapper = styled.div`
  font-family: 'digital';
  font-size: 4rem;
  font-weight: 400;
  background-color: black;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  line-height: .8;
  cursor: context-menu;
  width: 70px;
  color: #ff0000;
`

export const Timer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px;
  filter: hue-rotate(90deg) brightness(2);
`

export const TimerNumber = styled.div`
  width: 20.625px;
  height: 39.375px;
  background-size: 100% 100%;

  ${props => props.numb === 'zero' && css`
    background-image: url(${img0});
  `}

  ${props => props.numb === 'one' && css`
    background-image: url(${img1});
  `}

  ${props => props.numb === 'two' && css`
    background-image: url(${img2});
  `}

  ${props => props.numb === 'three' && css`
    background-image: url(${img3});
  `}

  ${props => props.numb === 'four' && css`
    background-image: url(${img4});
  `}

  ${props => props.numb === 'five' && css`
    background-image: url(${img5});
  `}

  ${props => props.numb === 'six' && css`
    background-image: url(${img6});
  `}

  ${props => props.numb === 'seven' && css`
    background-image: url(${img7});
  `}

  ${props => props.numb === 'eight' && css`
    background-image: url(${img8});
  `}

  ${props => props.numb === 'nine' && css`
    background-image: url(${img9});
  `}
`

export const GameboardWrapper = styled.div`
  border: 1px solid hsla(0,0%,50.2%,.425);
  width: fit-content;
  flex: 0 0 auto;
  margin-bottom: 10rem;

  @media only screen and (min-width: 700px) {
    margin-bottom: 10rem;
  }

  @media only screen and (min-width: 1200px) {
    margin-bottom: 10rem;
  }
`

export const GameboardEl = styled.div`
  background: silver;
  width:fit-content;
  height: fit-content;
  display: inline-block;
  border-bottom: 5px solid grey;
  border-right: 5px solid grey;
  border-left: 5px solid white;
  border-top: 5px solid white;
`

export const Gamefield = styled.div`
  background-color: grey;
  display: grid;
  gap: 1px 1px;
  width: fit-content;
  border-left: 5px solid grey;
  border-top: 5px solid grey;
  border-right: 5px solid white;
  border-bottom: 5px solid white;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;

  grid-template-columns: repeat(${props => props.gridL}, ${props => props.gridSize});
  grid-template-rows: repeat(${props => props.gridH}, ${props => props.gridSize});
`

export const GameHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  border-right: 5px solid white;
  border-bottom: 5px solid white;
  border-top: 5px solid grey;
  border-left: 5px solid grey;
`

export const Face = styled.div`
  font-size: 2.75rem;
  border-top: 5px solid white;
  border-left: 5px solid white;
  border-right: 5px solid grey;
  border-bottom: 5px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active:hover {
    border-top: 5px solid grey;
    border-left: 5px solid grey;
    border-right: 5px solid white;
    border-bottom: 5px solid white;
  }
`

export const GridelementWrapper = styled.div`
  background-color: darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${props => props.revealed && css`
    border: 1px solid #808080;
    border-top: none;
    border-left: none;
    font-weight: 900;
    font-family: 'mine-sweeper';
  `} 

  ${props => props.propWidth && css`
    width: ${props => props.propWidth};
  `}

  ${props => props.propHeight && css`
    height: ${props => props.propHeight};
  `}

  ${props => props.propFontSize === 'small' && css`
    font-size: 1.4rem;
  `}

  ${props => props.propFontSize === 'medium' && css`
    font-size: 1.5rem;
  `}

  ${props => props.propFontSize === 'large' && css`
    font-size: 1.9rem;
  `}
`

export const FlagElement = styled.div`
  font-family: 'mine-sweeper';
  font-weight: 900;
  font-size: 80%;
  position: absolute;
  pointer-events: none;
`