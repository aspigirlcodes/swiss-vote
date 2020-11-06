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


function drawResultsBar(ctx, results){
  if (results){
      const totalWidth = 800
      const totalYes = results.reduce((acc, val) => acc + val.yes, 0) 
      const totalNo = results.reduce((acc, val) => acc + val.no, 0)
      const yesFactor = totalYes / (totalYes + totalNo)
      const noFactor = totalNo / (totalYes + totalNo) 
      drawRectangle(ctx, 20,20, totalWidth * yesFactor, 60, "green")
      drawRectangle(ctx, 20 + totalWidth* yesFactor, 20, totalWidth * noFactor, 60, "red");
  }
}

function drawRectangle(ctx, x,y,width,height, color){
  ctx.beginPath()
  ctx.rect(x,y,width,height)
  ctx.fillStyle = color
  ctx.fill()
}


export { drawCanvas, drawResultsBar };
