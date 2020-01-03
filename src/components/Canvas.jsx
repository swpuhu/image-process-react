import React from 'react';
import store from '../redux/store';
import {connect} from 'react-redux';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = store.getState();
    }


    componentDidMount() {
        let canvas = this.canvas.current;
        let gl = canvas.getContext('webgl');
        console.log(gl);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="canvas" style={{
                display: this.props.width ? 'block' : 'none'
            }}>
                <canvas ref={this.canvas} width={this.props.width} height={this.props.height}></canvas>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        width: state.init.width,
        height: state.init.height,
        zoom: state.init.zoom
    }
}



export default connect(mapStateToProps)(Canvas);