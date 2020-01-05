import Normal from './filter/Normal';
import Blend from './filter/Blend';
import glUtil from './glUtil';
class RenderContext {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        let projectionMat = glUtil.createProjection(canvas.width, canvas.height, 1);
        let gl = canvas.getContext('webgl', {
            preMultipleAlpha: false
        });

        let buffer = gl.createBuffer();
        let points = new Float32Array([
            0, 0, 0, 0,
            canvas.width, 0, 1.0, 0.0,
            canvas.width, canvas.height, 1.0, 1.0,
            canvas.width, canvas.height, 1.0, 1.0,
            0.0, canvas.height, 0.0, 1.0,
            0.0, 0.0, 0.0, 0.0
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);


        
        let filters = {
            normal: new Normal(gl, projectionMat),
            blend: new Blend(gl, projectionMat),
        }


        this.canvas = canvas;
        this.gl = gl;
        this.filters = filters;
        this.points = points;
        this.projectionMat = projectionMat;
    }   


    render(layers) {

    }
}

export default RenderContext;