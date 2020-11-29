import React, { useContext, useRef, useEffect } from "react"
import ResultContext from "../context"
import {drawCorrelation} from "../helpers"


function CorrelationGraph(){
    const {selectedVote} = useContext(ResultContext)
    const canvasRef = useRef()

    useEffect(()=>{
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawCorrelation(ctx, selectedVote, 800, 20 )
    })


    return(
        <div className="dashboard-component">
            <h2>Correlation Graph</h2>
            <canvas width={840} height={840} ref={canvasRef}>

            </canvas>
        </div>
    )
}




export default CorrelationGraph
