import React from 'react';
import DropList from './DropList/DropList';
import store from '../redux/store';
import {init} from '../redux/action';
import util from '../util/util';

class FileMenu extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.multiple = true;
        let that = this;
        this.input.onchange = function () {
            util.openFiles(store, this.files, init);
        }   
    }

    componentWillUnmount() {
        this.input.onchange = null;
        this.input = null;
    }

    render() {
        let list = [
            {
                alias: '打开文件',
                onClick: () => {
                    this.input.click();
                }
            },
            {
                alias: '保存文件',
                onClick: () => {
                    console.log('save file');
                }
            }
        ]
        return (
            <div>
                <DropList list={list} name={"文件"}/>
            </div>
        )
    }
}

export default FileMenu;