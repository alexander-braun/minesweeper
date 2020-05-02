import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gameboard from './components/Gameboard';
import * as serviceWorker from './serviceWorker';
import store from './store'
import { Provider } from 'react-redux'
import BoardHead from './components/BoardHead';

/*
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
*/

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <div className="board">
        <BoardHead />
        <Gameboard />
      </div>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
