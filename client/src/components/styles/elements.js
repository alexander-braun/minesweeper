import styled, { css } from 'styled-components'


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