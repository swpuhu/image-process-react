import React from "react";
import Canvas from "../components/Canvas";
class Main extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="main">
                <Canvas />
            </div>
        );
    }
}

export default Main;
