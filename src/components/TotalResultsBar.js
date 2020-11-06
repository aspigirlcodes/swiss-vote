import React from "react";

import { drawResultsBar } from "../helpers"


class TotalResultsBar extends React.Component {
    
    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        drawResultsBar(this.ctx, this.props.results)
         
    }
    
    componentDidUpdate() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        drawResultsBar(this.ctx, this.props.results)
    }
    
    
    render(){
        const totalYes = this.props.results ? this.props.results.reduce((acc, val) => acc + val.yes, 0) : 0
        const totalNo = this.props.results ? this.props.results.reduce((acc, val) => acc + val.no, 0) : 0
        return (
            <div>
                
                <canvas height={100} width={840} ref="canvas"></canvas>
                <div style={{width: 800, paddingLeft: 20}}>
                <span>Yes: {totalYes && (totalYes / (totalYes + totalNo) * 100).toFixed(2)},</span>    
                <span style={{float: "right"}}>No: {totalNo && (totalNo /(totalYes + totalNo) * 100).toFixed(2)}</span> 
                
                </div>
            </div>
            
        );
    }
  
}

export default TotalResultsBar;
