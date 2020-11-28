import React, { useRef, useContext, useEffect } from "react";
import ResultContext from "../context"
import { drawResultsBar, drawCantonResultsBar, shortenDescription } from "../helpers"


function TotalResultsBar({index, width, height, margin}){
    const {selectedVote, selectedCanton} = useContext(ResultContext);
    const {results, description} = selectedVote[index]
    const totalYes = results ? results.reduce((acc, val) => acc + val.yes, 0) : 0
    const totalNo = results ? results.reduce((acc, val) => acc + val.no, 0) : 0
    const cantonResults = results ? results.find(result => result.canton === selectedCanton) : null
    const canvasRef = useRef()
    const cantonCanvas = useRef()

    useEffect(()=>{
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawResultsBar(ctx, results, width, height, margin)
        if (cantonCanvas.current){
            const cantonCtx = cantonCanvas.current.getContext("2d");
            cantonCtx.clearRect(0, 0, cantonCtx.canvas.width, cantonCtx.canvas.height);
            drawCantonResultsBar(cantonCtx, cantonResults, width, height, margin)
        }
        
    })

    return (
        <div className="dashboard-component">
            <h2>Total Results ({shortenDescription(description)})</h2>
            <canvas height={height + 2 * margin} width={width + 2 * margin} ref={canvasRef}></canvas>
            <div style={{width: width, paddingLeft: margin}}>
            <span>Yes: {totalYes && (totalYes / (totalYes + totalNo) * 100).toFixed(2)},</span>    
            <span style={{float: "right"}}>No: {totalNo && (totalNo /(totalYes + totalNo) * 100).toFixed(2)}</span> 
            
            </div>
                {selectedCanton &&
                    <div>
                        <h2>{selectedCanton} Results</h2>
                        <canvas height={height + 2 * margin} width={width + 2 * margin} ref={cantonCanvas}></canvas>
                        <div style={{width: width, paddingLeft: margin}}>
                        <span>Yes: {cantonResults && (cantonResults.yes / (cantonResults.yes + cantonResults.no) * 100).toFixed(2)},</span>    
                        <span style={{float: "right"}}>No: {selectedCanton && (cantonResults.no /(cantonResults.yes + cantonResults.no) * 100).toFixed(2)}</span> 
                        
                        </div>

                    </div>
                    
                }
        </div>
        
    );

}


export default TotalResultsBar;
