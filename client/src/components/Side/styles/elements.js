import styled, { css } from 'styled-components'

export const BestlistHeading = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
  font-family: 'mine-sweeper';
  letter-spacing: .1rem;
  cursor: context-menu;
  max-width: 100vw;
  padding-bottom: 5px;
  letter-spacing: .3rem;
  margin: 0 auto;

  @media only screen and (min-width: 700px) {
    font-size: 2.5rem;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 30vw;
    font-size: 20px;
  }
`

export const BestlistSurvivors = styled.div`
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  overflow-y: scroll;
  max-height: 400px;

  ${props => props.survivorsExist === false && css`
    overflow-y: hidden;
  `}

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

  @media only screen and (min-width: 700px) {
    width: 70vw;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 40vw
  }
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
    font-size: 20px;
  }
` 

export const BestlistSubmitFormwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const RecordholderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  min-height: 50px;

  @media only screen and (min-width: 700px) {
    margin-bottom: 2rem;
  }
`

export const RecordholderName = styled.div`
  display: block;
  height: fit-content;
`

export const RecordholderTime = styled.div`
  margin: 10px;
  font-family: 'mine-sweeper';
  font-size: 1rem;
  letter-spacing: .2rem;

  @media only screen and (min-width: 700px) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.5rem;
  }
`

export const RecordholderTimeSign = styled.span`
  font-size: .75rem; 
  margin-left: 2px; 
  color: #c71010;

  @media only screen and (min-width: 700px) {
    font-size: 1.25rem;
  }
`

export const RecordholderUsername = styled.div`
  margin: 10px;
  margin-bottom: 0;
  font-weight: 900;
  font-family: 'mine-sweeper';
  font-size: 1rem;
  text-decoration: underline;
  letter-spacing: .2rem;

  @media only screen and (min-width: 700px) {
    font-size: 1.5rem;
  }
`

export const RecordholderDifficulty = styled.div`
  margin: 10px;
  font-family: 'mine-sweeper';
  font-size: .85rem;
  font-weight: 200;
  letter-spacing: .1rem;
  color: rgb(199, 16, 16);

  @media only screen and (min-width: 700px) {
    font-size: 1.25rem;
  }
`

export const NoRecordholderWrapper = styled.div`
  font-family: 'mine-sweeper';
  font-size: 1rem;
  letter-spacing: .1rem;
  text-align: center;

  @media only screen and (min-width: 700px) {
    font-size: 1.25rem;
  }
`

export const SelectMenueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rem;

  * {
    margin: .75rem 0;
  }

  svg {
    font-size: 2.5rem;
    line-height: 1;
    margin: 0;
  }

  @media only screen and (min-width: 700px) {
    margin-bottom: 5rem;

    * {
      margin: 1.5rem 1rem;
    }

    svg {
      font-size: 4rem;
    }
  }

  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    margin-bottom: 10rem;

    svg {
      font-size: 3rem;
    }
  }
`

export const SelectButton = styled.button`
  font-family: 'mine-sweeper';
  letter-spacing: .3rem;
  font-size: 1.25em;
  color: white;
  background-color: transparent;
  border: none;
  width: fit-content;
  padding: 0;
  text-align: center;
  transition-duration: 200ms;

  :hover {
    color: rgb(199, 16, 16);
    cursor: pointer;
  }

  ${props => props.selected && css`
    color: #00b600;
  `}

  @media only screen and (min-width: 700px) {
    font-size: 1.75rem;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.5rem;
  }
`

export const Sidewrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  margin-left: auto;
  margin-bottom: 10rem;
  margin-right: auto;

  @media only screen and (min-width: 700px) {
    max-width: 70vw;
    margin-right: 5rem;
    margin-left: 5rem;

    ${props => props.submit && css`
      margin-top: -3rem;
    `}
  }

  @media only screen and (min-width: 1200px) {
    max-width: 90vw;
    margin: 0 auto;
    margin-bottom: 10rem;

    ${props => props.submit && css`
      margin-top: -5rem;
    `}
  }
`

export const SubmitForm = styled.form`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
  width: fit-content;
  
  textarea {
    width: 100%;
    padding: 0;
    border: none;
    resize: none;
    font-size: 2rem;
  }
`

export const SubmitFormButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const SubmitButton = styled.button`
  font-weight: 600;
  font-family: 'mine-sweeper';
  background-color: rgb(192, 192, 192);
  border-top: 4px solid white;
  border-left: 4px solid white;
  border-bottom: 4px solid grey;
  border-right: 4px solid grey;
  padding: 5px 15px;

  :last-child {
    margin-left: 10px;
  }
`