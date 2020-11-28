import React, { useContext, useEffect, useRef } from "react"
import ResultContext from "../context";
import { drawPie } from "../helpers"


function CantonPie({size, margin}){
    const { selectedVote1 } = useContext(ResultContext)
    const result = selectedVote1.results
    const cantonNumber = result ? result.length : 0
    const acceptedNumber = result ? result.reduce((acc, val) => acc + (val.yes > val.no ? 1: 0), 0) : 0
    const canvasRef = useRef()


    useEffect(()=>{
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawPie(ctx, acceptedNumber, cantonNumber, size, margin)
    })

    return (
        <div class="dashboard-component">
            <h2>Cantons Accepted</h2>
            <canvas height={size + 2* margin} width={size + 2 * margin} ref={canvasRef}></canvas>
            <div>
                {acceptedNumber} / {cantonNumber}
            </div>
        </div>
    )
}


export default CantonPie;
