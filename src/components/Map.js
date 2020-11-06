import React from "react";
import { drawCanvas } from "../helpers"



class Map extends React.Component {
    
    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        drawCanvas(this.ctx, this.props.results);
    }
    
    componentDidUpdate() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        drawCanvas(this.ctx, this.props.results);
    }
    
    
    render(){
        const { description, results } = this.props;
        return (
            <div class="dashboard-component">
                <h2>Map</h2>
                <canvas height={538} width={840} ref="canvas">
                    {React.cloneElement(this.props.children, { description, results })}
                </canvas>
            </div>
            
        );
    }
  
}

export default Map;
