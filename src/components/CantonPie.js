import React, { useContext, useEffect, useRef } from "react"
import ResultContext from "../context";
import { drawPie, shortenDescription } from "../helpers"


function CantonPie({index, size, margin}){
    const { selectedVote } = useContext(ResultContext)
    const {results, description} = selectedVote[index]
    const cantonNumber = results ? results.length : 0
    const acceptedNumber = results ? results.reduce((acc, val) => acc + (val.yes > val.no ? 1: 0), 0) : 0
    const canvasRef = useRef()


    useEffect(()=>{
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawPie(ctx, acceptedNumber, cantonNumber, size, margin)
    })

    return (
        <div className="dashboard-component">
            <h2>Cantons Accepted ({shortenDescription(description)})</h2>
            <canvas height={size + 2* margin} width={size + 2 * margin} ref={canvasRef}></canvas>
            <div>
                {acceptedNumber} / {cantonNumber}
            </div>
        </div>
    )
}


export default CantonPie;
