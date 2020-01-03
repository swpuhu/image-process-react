import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './container/Header';
import Left from './container/Left';
import Main from './container/Main';
import Right from './container/Right';
import Footer from './container/Footer';
function App () {
    return (
        <Provider store={ store }>
            <div className="App">
                <Header/>
                <Left/>
                <Main/>
                <Right/>
                <Footer/>
            </div>
        </Provider>
    );
}

export default App;
