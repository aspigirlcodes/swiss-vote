import React from "react"
import paths from "./map-paths"; // contains the paths for drawing the map

function drawPath(ctx, { d, fill }) {
  const path = new Path2D(d);
  ctx.fillStyle = fill;
  ctx.fill(path);
  ctx.stroke(path);
}

function getSpecs(path, result) {
  const specifications = {
    d: path.path, // svg path data
    fill: path.fill, // shades of grey for default
    alpha: 1, // default
    yes: null,
    no: null
  };

  if (result) {
    const yes = result.yes;
    const no = result.no;

    if (yes > no) {
      specifications.fill = "#007500"; // green
      specifications.alpha = yes / (yes + no); // % yes
    } else {
      specifications.fill = "#db2f27"; // red
      specifications.alpha = no / (yes + no); // % no
    }
  }

  return specifications;
}

function drawCanvas(ctx, results) {
  ctx.translate(0, - 68.5); // toDo: crop the SVG so that this isn't necessary
  paths.forEach(path => {
    // loop it by path because there isn't always data for each canton
    const canton = path.canton; // get the canton code from the paths array
    const result = results ? results.find(x => x.canton === canton) : null; // get the results that correspond to the canton code
    const specifications = getSpecs(path, result); // { path, fill, alpha, yes, no }

    ctx.globalAlpha = specifications.alpha; // reset the alpha value

    drawPath(ctx, specifications);
  });
  ctx.translate(0, 68.5); // toDo: crop the SVG so that this isn't necessary
}

function drawSvg(results, onclick) {
  const pathElements = paths.map(path => {
    // loop it by path because there isn't always data for each canton
    const canton = path.canton; // get the canton code from the paths array
    const result = results ? results.find(x => x.canton === canton) : null; // get the results that correspond to the canton code
    const specifications = getSpecs(path, result); // { path, fill, alpha, yes, no }
    return <path key={canton} d={specifications.d} stroke="black"
  strokeWidth="1" fill={specifications.fill} fillOpacity={specifications.alpha} onClick={() => onclick(result)}><title>{canton}</title></path>
  })
  return <g transform="translate(0,-68.5)"> {pathElements} </g>
}


function drawResultsBar(ctx, results, width, height, margin){
  if (results){
      const totalYes = results.reduce((acc, val) => acc + val.yes, 0) 
      const totalNo = results.reduce((acc, val) => acc + val.no, 0)
      const yesFactor = totalYes / (totalYes + totalNo)
      const noFactor = totalNo / (totalYes + totalNo) 
      drawRectangle(ctx, margin, margin, width * yesFactor, height, "green")
      drawRectangle(ctx, margin + width* yesFactor, margin, width * noFactor, height, "red");
  }
}

function drawCantonResultsBar(ctx, results, width, height, margin){
  if (results){
      const totalYes = results.yes
      const totalNo = results.no
      const yesFactor = totalYes / (totalYes + totalNo)
      const noFactor = totalNo / (totalYes + totalNo) 
      drawRectangle(ctx, margin, margin, width * yesFactor, height, "green")
      drawRectangle(ctx, margin + width* yesFactor, margin, width * noFactor, height, "red");
  }
}


function drawRectangle(ctx, x,y,width,height, color){
  ctx.beginPath()
  ctx.rect(x,y,width,height)
  ctx.fillStyle = color
  ctx.fill()
}

function drawPie(ctx, yes, total, size, margin){
  const center  = margin + size/2
  ctx.beginPath()
  ctx.moveTo(center,center);
  ctx.lineTo(margin + size, center);
  ctx.arc(center,center, size/2, 0, 2 * Math.PI * yes / total)
  ctx.closePath()
  ctx.fillStyle = "green"
  ctx.fill()
  if (yes < total){
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.lineTo(center + Math.cos(2 * Math.PI * yes/total) * size/2, center + Math.sin(2 * Math.PI * yes / total)*size/2)
      ctx.arc(center,center,size/2 , 2*Math.PI * yes / total, 2* Math.PI)
      ctx.closePath()
      ctx.fillStyle = "red"
      ctx.fill()
  }
  
}


export { drawCanvas, drawSvg, drawResultsBar,drawCantonResultsBar, drawPie };
