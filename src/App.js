import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Count from './components/Count';
import DropList from './components/DropList/DropList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Count></Count>
        <DropList list={
          [
            {alias: 'hello', value: 'test'},
            {alias: 'world', value: 'test2'}
          ]
        }></DropList>
      </div>
    </Provider>
  );
}

export default App;
