import React from 'react';
import store from '../redux/store';
import { increment } from '../redux/action';
import { connect } from 'react-redux';


function Count ({ count, click }) {
    return (
        <div>
            <button onClick={ click }>incremnet</button>
            { count }
        </div>

    )

}


const mapStateToProps = (state, ownProps) => {
    return {
        count: state.count
    }
}


const mapDispatchProps = (dispatch) => {
    return {
        click: () => {
            dispatch(increment());
        }
    }
};



export default connect(
    mapStateToProps,
    mapDispatchProps
)(Count);