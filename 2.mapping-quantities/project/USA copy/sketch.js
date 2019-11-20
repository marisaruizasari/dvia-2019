let data;

// preload table data
function preload() {
    data = loadTable(
      'data/AllCountries-Atmospheric.csv',
			'csv',
			'header');
}

// using a p5js table object, return an object having
// the values of the given column, plus the minimum value
// and maximum value from that column
function colValsMinMax(tab, colName) {
  let allVals = data.getColumn(colName);
  let vals = [];

  for (var i=0; i<allVals.length; i++) {
    if (allVals[i] > 0) {
      vals.push(allVals[i]);
    }
  }

    let obj = {
      values: vals,
      min: min(vals),
      max: max(vals),
    }
    return obj;

}

function setup() {
  createCanvas(640, 480);
  // how many rows?
  // console.log(data.getRowCount());
  // what are the columns?
  // console.log(data.columns);


  stroke(255);


}

var padding = 100;

function draw(){

background(255);
    // get values and min/max for china yield
    let chYield = colValsMinMax(data, "China Yield KT");
    // console.log('yield min' + chYield.min);
    // console.log('yield max' + chYield.max);

    //get values and min/max for china death percent
    let chDeath = colValsMinMax(data, "China Death Percent");
    // console.log('death min' + chDeath.min);
    // console.log('death max' + chDeath.max);

    // get values and min/max for china years
    let year = colValsMinMax(data, "China Year");
    // console.log('year min' + year.min);
    // console.log('year max' + year.max);

  //draw
  for (var i = 0; i < data.getRowCount(); i++) {

    // x position is pm2.5; y position is wind speed
    noStroke();
    fill('#4E88A6');
    let ypos = map(chYield.values[i], chYield.min, chYield.max, height-padding, padding);
    let xpos = map(year.values[i], year.min, year.max, padding, width-padding);
    let diameter = 4 + chDeath.values[i] * 10;

    let dot = ellipse(xpos, ypos, diameter, diameter);
    // console.log(year.values[i]+','+chYield.values[i])

    textSize(8);
    fill('#A7B5C4');
    text(`${chYield.values[i]}kt`, xpos + diameter/3 , ypos - diameter/3);

  }


  //vertical axis
  push();
  strokeWeight(.5);
  stroke(0);
  fill('#555C63');
  textAlign(CENTER, CENTER);

  var scaleTicks = 10
  var verticalTickNumber = chYield.max/scaleTicks;
  // console.log(verticalTickNumber);

  let scaledYHeight = map(chYield.max, chYield.min, chYield.max, 0, height-2*padding);
  console.log(scaledYHeight);
  // console.log(height-padding-padding);


  line(padding, padding, padding, height-padding);

  for (var i=0; i<=scaleTicks; i++) {
    strokeWeight(1);
    stroke(0);
    line(padding-5, height-padding-scaledYHeight/scaleTicks*i, padding+5, height-padding-scaledYHeight/scaleTicks*i);
    push();
    noStroke();
    text(chYield.max*i, padding-25, height-padding-scaledYHeight/scaleTicks*i);
    pop();
  }

  //horizontal axis
  line(padding, height-padding, width-padding, height-padding);
  // let scaledWidth = map(year.max, year.min, year.max, 0, width-2*padding);
  let chartWidth = width-2*padding
  var horizontalTicks = chartWidth/year.values.length;

  for(var i=0; i<year.values.length; i++) {
    push();
    noStroke();
    text(year.values[i],padding + i*horizontalTicks+horizontalTicks/2, height-padding+10);
    pop();
    strokeWeight(.5);
    stroke(0);
    line(padding + i*horizontalTicks+horizontalTicks/2, padding-5+height, padding + i*horizontalTicks+horizontalTicks/2, padding+5+height)
  }

  pop();

}










// //vertical axis
// scale = 350;
// line(marginLeft, marginTop, marginLeft, marginTop+graphHeight);
// var verticalTickScale = scale/5;
// textAlign(CENTER, CENTER);
// for (var i=0; i<=25; i++) {
//   line(marginLeft-5, marginTop+graphHeight-20*i, marginLeft+5, marginTop+graphHeight-20*i);
//   for (var j=0; j<6; j++) {
//     text(verticalTickScale*j, marginLeft-25, marginTop+graphHeight-20*j*5);
//   }
// }




// function mousePressed(x, y, yearVar, yieldVar) {
//   // Check if mouse is inside the circle
//   let d = dist(mouseX, mouseY, x, y);
//   if (d < 100) {
//     textSize(8);
//     text(`  ${yearVar}
//     ${yieldVar} kt`, x, y);
//   }
// }
