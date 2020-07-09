import styled from 'styled-components';

export const Header = styled.div`
  width: fit-content;
  margin: 5rem auto 7rem auto;
  color: rgb(255, 255, 255);
  font-family: 'mine-sweeper';
  letter-spacing: 0.3rem;
  align-items: center;
  text-align: center;
  font-size: 3rem;
  line-height: 1.5;

  @media only screen and (min-width: 700px) {
    font-size: 4rem;
    margin-top: 12rem;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 5rem;
    margin-bottom: 1rem;
    margin-top: 10rem;
  }
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
