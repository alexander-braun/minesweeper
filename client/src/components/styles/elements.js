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