import styled from 'styled-components'


export const Header = styled.div`
  width: fit-content;
  margin-bottom: 2rem;
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;

  color: rgb(255, 255, 255);
  font-family: 'mine-sweeper';
  font-size: 1.5rem;
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

export const BestlistContainer = styled.div`
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