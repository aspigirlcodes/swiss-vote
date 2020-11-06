import React from "react";

import { drawResultsBar } from "../helpers"


class TotalResultsBar extends React.Component {
    
    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        drawResultsBar(this.ctx, this.props.results, this.props.width, this.props.height, this.props.margin)
         
    }
    
    componentDidUpdate() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        drawResultsBar(this.ctx, this.props.results, this.props.width, this.props.height, this.props.margin)
    }
    
    
    render(){
        const totalYes = this.props.results ? this.props.results.reduce((acc, val) => acc + val.yes, 0) : 0
        const totalNo = this.props.results ? this.props.results.reduce((acc, val) => acc + val.no, 0) : 0
        return (
            <div class="dashboard-component">
                <h2>Total Results</h2>
                <canvas height={this.props.height + 2 * this.props. margin} width={this.props.width + 2 * this.props.margin} ref="canvas"></canvas>
                <div style={{width: this.props.width, paddingLeft: this.props.margin}}>
                <span>Yes: {totalYes && (totalYes / (totalYes + totalNo) * 100).toFixed(2)},</span>    
                <span style={{float: "right"}}>No: {totalNo && (totalNo /(totalYes + totalNo) * 100).toFixed(2)}</span> 
                
                </div>
            </div>
            
        );
    }
  
}

export default TotalResultsBar;
