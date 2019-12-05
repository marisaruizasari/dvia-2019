
// ------------- declare global vars -------------------------------------------->
let table;

// let china, france, uk, us, ussr, glob;
// // let countryVariables = [china, france, uk, us, ussr, glob]
//
// let chinaVals, franceVals, ukVals, usVals, ussrVals, globVals;
// // let valVariables = [chinaVals, franceVals, ukVals, usVals, ussrVals, globVals]
//
// let colors = ['#9C4C4F', '#76BDDB', '#59AC8D', '#DE9054', '#BFC951','#0B1F36']
// // let colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854','#e41a1c']

var padding = 100;
var yScaleMax = 180000
var scaleTicks = 10

// ------------- preload data -------------------------------------------->
function preload() {
    // data = loadTable('data/AllCountries-Atmospheric.csv','csv','header');
    china = loadTable('data/China.csv','csv','header');
    france = loadTable('data/France.csv','csv','header');
    uk = loadTable('data/United-Kingdom.csv','csv','header');
    us = loadTable('data/United-States.csv','csv','header');
    ussr = loadTable('data/USSR.csv','csv','header');
    glob = loadTable('data/Global.csv','csv','header');

    table = loadTable("../data/all_month.csv", "csv", "header");
}


// ------------- function to return data objects -------------------------------------------->
var colVals = function(table) {

    let time = table.getColumn("time");
    let lat = table.getColumn("latitude");
    let long = table.getColumn("longitude");
    let depth = table.getColumn("depth");
    let mag = table.getColumn("mag");
    let magErr = table.getColumn("magError")
    let place = table.getColumn("place");


      let obj = {
        time: time,
        lat: lat,
        long: long,
        depth: depth,
        mag: mag,
        magErr: magErr,
        place: place,
        minDepth: min(depth),
        maxDepth: max(depth),
        minMag: min(mag),
        maxMag: max(mag),
        minMagErr: min(magErr),
        maxMagErr: max(magErr)
      }

      return obj;
}

// ------------- function to draw circles -------------------------------------------->
function drawCircles(country, fillColor) {

  for (var i = 0; i < country.yields.length; i++) {
    // x position is year; y position is yield in kt
    noStroke();
    fill(fillColor);
    let yMapYield = map(parseInt(country.yields[i]), 0, yScaleMax, 0, height-2*padding);
    // console.log(yMapYield);
    let ypos = height-padding-yMapYield;
    let xpos = map(country.years[i], country.minYear, country.maxYear, padding, width-padding);
    let diameter = 4 + Math.sqrt(country.deaths[i])*3;

    if (country.yields[i]>0) {
      let dot = ellipse(xpos, ypos, diameter, diameter);

      let d = dist(mouseX, mouseY, xpos, ypos);

      if (d<20) {
        textSize(8);
        text(`${country.years[i]}, ${parseInt(country.yields[i])} kt`, xpos+5+diameter/2, ypos);
      }
    }

    textSize(8);
    fill(fillColor);
    // text(`${country.yields[i]}kt`, xpos + diameter/3 , ypos - diameter/3);

  }
}

// ------------- setup -------------------------------------------->
function setup() {
  // createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);
  background(255);
  stroke(255);
}

// ------------- draw -------------------------------------------->

function draw() {

background(255);
  //***** draw circles *****

  let tableVals = colVals(table);

  drawCircles(tableVals,colors[i])



  //***** draw vertical axis ******
  push();
  strokeWeight(.5);
  stroke(0);
  fill('#555C63');
  textAlign(CENTER, CENTER);

  var verticalTickNumber = yScaleMax/scaleTicks;
  // console.log(verticalTickNumber);
  let scaledYHeight = map(yScaleMax, 0, yScaleMax, 0, height-2*padding);
  // console.log(scaledYHeight);
  // console.log(height-padding-padding);
  line(padding, padding, padding, height-padding);
  for (var i=0; i<=scaleTicks; i++) {
    strokeWeight(1);
    stroke(0);
    line(padding-5, height-padding-scaledYHeight/scaleTicks*i, padding+5, height-padding-scaledYHeight/scaleTicks*i);
    push();
    noStroke();
    text(verticalTickNumber*i, padding-25, height-padding-scaledYHeight/scaleTicks*i);
    pop();
  }

  //***** draw horizontal axis *****
  line(padding, height-padding, width-padding, height-padding);
  // let scaledWidth = map(year.max, year.min, year.max, 0, width-2*padding);
  let chartWidth = width-2*padding
  let horizontalTicks = chartWidth/chinaVals.years.length;
  // let chartWidthForTicks = chartWidth + horizontalTicks


  for(var i=0; i<chinaVals.years.length; i++) {
    push();
    noStroke();
    textSize(8);
    text(chinaVals.years[i], padding + i*horizontalTicks, height-padding+10);
    pop();
    strokeWeight(.5);
    stroke(0);
    line(padding + i*horizontalTicks+horizontalTicks/2, padding-5+height, padding + i*horizontalTicks+horizontalTicks/2, padding+5+height)
  }

  pop();

}






// function mousePressed(x, y, yearVar, yieldVar) {
//   // Check if mouse is inside the circle
//   let d = dist(mouseX, mouseY, x, y);
//   if (d < 100) {
//     textSize(8);
//     text(`  ${yearVar}
//     ${yieldVar} kt`, x, y);
//   }
// }
