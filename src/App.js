import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './container/Header';
import Left from './container/Left';
import Main from './container/Main';
import Right from './container/Right';
import Footer from './container/Footer';
import util from './util/util';
import {init} from './redux/action';
class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        document.ondragover = (e) => {
            return false;
        };
        document.ondrop = (e) => {
            e.preventDefault();
            console.log(e);
            let files = e.dataTransfer.files;
            if (files.length) {
                util.openFiles(store, files, init);
            }
        }
    }

    componentWillUnmount() {

    }
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header />
                    <Left />
                    <Main />
                    <Right />
                    <Footer />
                </div>
            </Provider>
        );

    }
}

export default App;
