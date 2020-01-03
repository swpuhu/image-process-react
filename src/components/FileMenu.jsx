import React from 'react';
import DropList from './DropList/DropList';
import store from '../redux/store';
import {init} from '../redux/action';

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
            that.openFiles(this.files);
        }   
    }

    openFiles(files) {
        let first = true;
        for (let file of files) {
            let url = URL.createObjectURL(file);
            let image = new Image();
            image.onload = function () {
                if (first) {
                    store.dispatch(init(image.width, image.height, 1));
                    first = false;
                }
                URL.revokeObjectURL(url);
            }
            image.src = url;
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