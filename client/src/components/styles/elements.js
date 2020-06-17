import styled, { css } from 'styled-components'
import img0 from '../../img/d0.svg'
import img1 from '../../img/d1.svg'
import img2 from '../../img/d2.svg'
import img3 from '../../img/d3.svg'
import img4 from '../../img/d4.svg'
import img5 from '../../img/d5.svg'
import img6 from '../../img/d6.svg'
import img7 from '../../img/d7.svg'
import img8 from '../../img/d8.svg'
import img9 from '../../img/d9.svg'

export const Header = styled.div`
  width: fit-content;
  margin-bottom: 2rem;
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;

  color: rgb(255, 255, 255);
  font-family: 'mine-sweeper';
  font-size: 1.75rem;
  letter-spacing: .3rem;

  align-items: center;
  text-align: center;

  @media only screen and (min-width: 1200px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 5rem;
  }
`

export const View = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: fit-content;
`

export const BestlistHeading = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  font-family: 'mine-sweeper';
  letter-spacing: .1rem;
  cursor: context-menu;
  max-width: 100vw;
  padding-bottom: 5px;
  letter-spacing: .3rem;
  margin: 0 auto;

  @media only screen and (min-width: 1200px) {
    max-width: 30vw;
    font-size: 20px;
  }
`

export const BestlistSurvivors = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;
  overflow-y: scroll;
  max-height: 400px;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #00b600; 
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background: #00b600; 
    background: linear-gradient(140deg, #00b600 0%, rgba(255,0,0,1) 100%);
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b30000; 
  }

  @media only screen and (min-width: 1200px) {
    max-width: 30vw
  }
`

export const SelectMenueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 5vh;

  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    margin-bottom: 8vh;
  }
`

export const SelectButton = styled.button`
  margin-left: 1vw;
  margin-right: 1vw;
  font-family: 'mine-sweeper';
  letter-spacing: .3rem;
  font-size: 1rem;
  color: white;
  background-color: transparent;
  border: none;
  width: fit-content;
  padding: 0;
  margin-bottom: 1rem;
  text-align: center;
  transition-duration: 200ms;

  :hover {
    color: rgb(199, 16, 16)
  }

  ${props => props.selected && css`
    color: #00b600;
  `}
`

export const BestlistSubmitHeading = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  font-family: 'mine-sweeper';
  letter-spacing: .1rem;
  cursor: context-menu;
  max-width: 100vw;
  padding-bottom: 5px;
  letter-spacing: .3rem;
  margin: 0 auto;

  @media only screen and (min-width: 1200px) {
    max-width: 30vw;
    font-size: 20px;
  }
` 

export const BestlistSubmitFormwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Sidewrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  margin-left: 2vw;
  margin-bottom: 10vh;
  margin-right: 5vw;

  @media only screen and (min-width: 1200px) {
    max-width: 30vw;
  }
`
export const RecordholderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  margin: 5px;
  min-height: 50px;
`

export const RecordholderName = styled.div`
  display: inline-block;
`

export const RecordholderTime = styled.div`
  margin: 10px;
  font-family: 'mine-sweeper';
  font-size: .65rem;
  letter-spacing: .2rem;
`

export const RecordholderTimeSign = styled.span`
  font-size: .5rem; 
  margin-left: 2px; 
  color: #c71010;
`

export const RecordholderUsername = styled.div`
  margin: 10px;
  font-weight: 900;
  font-family: 'mine-sweeper';
  font-size: .7rem;
  text-decoration: underline;
  margin-bottom: 0px;
  letter-spacing: .2rem;
`

export const RecordholderDifficulty = styled.div`
  margin: 10px;
  margin-top: 5px;
  font-family: 'mine-sweeper';
  font-size: .65rem;
  font-weight: 200;
  letter-spacing: .2rem;
  color: rgb(199, 16, 16);
`

export const NoRecordholderWrapper = styled.div`
  font-family: 'mine-sweeper';
  font-size: .8rem;
  letter-spacing: .3rem;
  text-align: center;
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
    font-size: 1rem;
  `}

  ${props => props.propFontSize === 'medium' && css`
    font-size: 1.25rem;
  `}

  ${props => props.propFontSize === 'large' && css`
    font-size: 1.5rem;
  `}
`

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
export const GameboardWrapper = styled.div`
  border: 1px solid hsla(0,0%,50.2%,.425);
  width: fit-content;
  flex: 0 0 auto;
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
  ${props => console.log(props)}
`