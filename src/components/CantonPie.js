import React from "react"
import { drawPie } from "../helpers"



class CantonPie extends React.Component {
    
    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        const cantonNumber = this.props.results ? this.props.results.length : 0
        const acceptedNumber = this.props.results ? this.props.results.reduce((acc, val) => acc + (val.yes > val.no ? 1: 0), 0) : 0
        drawPie(this.ctx, acceptedNumber, cantonNumber, this.props.size, this.props.margin)
         
    }
    
    componentDidUpdate() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const cantonNumber = this.props.results ? this.props.results.length : 0
        const acceptedNumber = this.props.results ? this.props.results.reduce((acc, val) => acc + (val.yes > val.no ? 1: 0), 0) : 0
        drawPie(this.ctx, acceptedNumber, cantonNumber, this.props.size, this.props.margin)
        
        
    }
    
    
    render(){
        const cantonNumber = this.props.results ? this.props.results.length : 0
        const acceptedNumber = this.props.results ? this.props.results.reduce((acc, val) => acc + (val.yes > val.no ? 1: 0), 0) : 0
        return (
            <div class="dashboard-component">
                <h2>Cantons Accepted</h2>
                <canvas height={this.props.size + 2* this.props.margin} width={this.props.size + 2 * this.props.margin} ref="canvas"></canvas>
                <div>
                    {acceptedNumber} / {cantonNumber}
                </div>
            </div>
            
        );
    }
  
}

export default CantonPie;
