
// ------------- declare global vars -------------------------------------------->
let china, france, uk, us, ussr, glob;
// let countryVariables = [china, france, uk, us, ussr, glob]

let chinaVals, franceVals, ukVals, usVals, ussrVals, globVals;
// let valVariables = [chinaVals, franceVals, ukVals, usVals, ussrVals, globVals]

let colors = ['#9C4C4F', '#76BDDB', '#59AC8D', '#DE9054', '#BFC951','#0B1F36']
// let colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854','#e41a1c']

// scaling variables
var padding = 100;
var yScaleMax = 180000
var scaleTicks = 10

//data on display
let dataOnView;
let shown = 0;


// ------------- preload data -------------------------------------------->
function preload() {
    // data = loadTable('data/AllCountries-Atmospheric.csv','csv','header');
    china = loadTable('data/China.csv','csv','header');
    france = loadTable('data/France.csv','csv','header');
    uk = loadTable('data/United-Kingdom.csv','csv','header');
    us = loadTable('data/United-States.csv','csv','header');
    ussr = loadTable('data/USSR.csv','csv','header');
    glob = loadTable('data/Global.csv','csv','header');
}


// ------------- function to return data objects -------------------------------------------->
var colVals = function(country) {

    let yields = country.getColumn("Yield KT");
    let years = country.getColumn("Year");
    let deaths = country.getColumn("Death Percent");
    let population = country.getColumn("Population");

      let obj = {
        yields: yields,
        years: years,
        deaths: deaths,
        maxDeaths: max(deaths),
        population: population,
        minPop: min(population),
        maxPop: max(population),
        minYear: min(years),
        maxYear: max(years),
        minYield: min(yields),
        maxYield: max(yields),
      }
      return obj;
}

// ------------- function to draw circles -------------------------------------------->
function drawCircles(country, fillColor) {

  for (var i = 0; i < country.yields.length; i++) {
    // x position is year; y position is yield in kt
    noStroke();
    fill(fillColor);

    let diameter = 4 + Math.sqrt(country.yields[i])/10;
    let yMapYield = map(parseInt(country.deaths[i]), 0, country.maxDeaths, 0, height-2*padding);
    // console.log(yMapYield);
    let ypos = height-padding-yMapYield;
    // let xpos = map(country.year[i], country.minYear, country.maxYear, padding, width-padding);

    let xpos = padding + i*(diameter+20)

    let dot = ellipse(xpos, ypos, diameter, diameter);

    let d = dist(mouseX, mouseY, xpos, ypos);

    if (d<20) {
      textSize(8);
      text(`${country.years[i]}, ${parseFloat(country.deaths[i]).toFixed(2)}%`, xpos+5+diameter/2, ypos);
    }


    textSize(8);
    fill(fillColor);
    // text(`${country.yields[i]}kt`, xpos + diameter/3 , ypos - diameter/3);

  }
}

// // ------------- function to draw bars -------------------------------------------->
//
// function drawBars(country, fillColor) {
//
//   // console.log(country.yields.length);
//   // var horizontalTickWidth = (width-2*padding)/(country.yields.length);
//
//   if (frameCount<5) {
//     console.log(country.population, country.maxPop);
//   }
//
//
//
//   var horizontalTickWidth = 50;
//
//   for (var i = 0; i < country.yields.length; i++) {
//     // x position is year; y position is population
//     noStroke();
//     fill(fillColor);
//
//     let yMapPop = map(country.population[i], 0, country.maxPop, 0, height-(padding*2));
//     // console.log(yMapPop);
//     let deathPercent = (country.deaths[i]/100)*yMapPop;
//     // console.log(deathPercent);
//     let deathBarHeight = height-padding-deathPercent;
//
//
//     let barHeight = height-padding-yMapPop;
//     let barWidth = 20;
//     let xPos = padding+(horizontalTickWidth*i)+(horizontalTickWidth/2)-10;
//
//     // console.log(xPos, i);
//
//
//     rect(xPos, barHeight, barWidth, yMapPop);
//     fill(0);
//     rect(xPos, deathBarHeight, barWidth, deathPercent);
//
//     // console.log(xPos, barHeight, barWidth, yMapPop);
//
//
//   }
// }

// ------------- function to draw axes  -------------------------------------------->

function drawAxes(country) {

  // console.log(country.maxPop)
  //vertical axis
  push();
  strokeWeight(.5);
  stroke(0);
  fill('#555C63');
  textAlign(CENTER, CENTER);

  var scaleTicks = 10
  var verticalTickNumber = country.maxPop/scaleTicks;
  // console.log(verticalTickNumber);

  let scaledYHeight = map(verticalTickNumber, 0, country.maxPop, 0, height-(2*padding));
  // console.log(scaledYHeight);
  // console.log(height-padding-padding);

  line(padding, padding, padding, height-padding);

  for (var i=0; i<=scaleTicks; i++) {
    strokeWeight(1);
    stroke(0);
    line(padding-5, height-padding-(scaledYHeight*i), padding+5, height-padding-(scaledYHeight*i));
    push();
    noStroke();
    text(parseInt(verticalTickNumber*i/1000000), padding-25, height-padding-(scaledYHeight*i));
    pop();
  }

  //horizontal axis
  line(padding, height-padding, padding+(50*country.years.length), height-padding);

  let chartWidth = width-2*padding

  // var horizontalTickWidth = chartWidth/(country.years.length);
  var horizontalTickWidth = (4 + Math.sqrt(country.yields[i])/10) + 20;


  for(var b=0; b<country.years.length; b++) {
    push();
    noStroke();
    text(country.years[b],padding + b*horizontalTickWidth+horizontalTickWidth/2, height-padding+10);
    pop();
    strokeWeight(.5);
    stroke(0);
    line(padding + b*horizontalTickWidth+horizontalTickWidth/2, padding-5+height, padding + b*horizontalTickWidth+horizontalTickWidth/2, padding+5+height)
  }

}

// ------------- function to add country toggle feature -------------------------------------------->

function createToggle(toggleColor) {

  //text widths
  let franceWidth = textWidth("france")+20;
  let chinaWidth = textWidth("china")+20;
  let usWidth = textWidth("united states")+20;
  let ukWidth = textWidth("united kingdom")+20;
  let ussrWidth = textWidth("ussr")+20;
  let globalWidth = textWidth("global")+20;

  textAlign(LEFT, CENTER);
  //France
  fill(toggleColor);
  if (shown != 0) {
    noFill();
  }
  rect(width-padding, padding/2, -franceWidth, 30);
  //China
  fill(toggleColor);
  if (shown != 1) {
    noFill();
  }
  rect(width-padding-franceWidth, padding/2, -chinaWidth, 30);
  //United States
  fill(toggleColor);
  if (shown != 2) {
    noFill();
  }
  rect(width-padding-franceWidth-chinaWidth, padding/2, -usWidth, 30);
  //United Kingdom
  fill(toggleColor);
  if (shown != 3) {
    noFill();
  }
  rect(width-padding-franceWidth-chinaWidth-usWidth, padding/2, -ukWidth, 30);
  //USSR
  fill(toggleColor);
  if (shown != 4) {
    noFill();
  }
  rect(width-padding-franceWidth-chinaWidth-usWidth-ukWidth, padding/2, -ussrWidth, 30);
  //Global
  fill(toggleColor);
  if (shown != 5) {
    noFill();
  }
  rect(width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth, padding/2, -globalWidth, 30);



  //Text labels
  fill(0);
  text("France", width-padding-franceWidth+10, padding/2+15);
  text("China", width-padding-franceWidth-chinaWidth+10, padding/2+15);
  text("United States",width-padding-franceWidth-chinaWidth-usWidth+10, padding/2+15);
  text("United Kingdom",width-padding-franceWidth-chinaWidth-usWidth-ukWidth+10, padding/2+15);
  text("USSR",width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth+10, padding/2+15);
  text("Global",width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth-globalWidth+10, padding/2+15);
}


// ------------- function for mouse click on country toggle -------------------------------------------->

function mouseClicked() {

  //text widths
  let franceWidth = textWidth("france")+20;
  let chinaWidth = textWidth("china")+20;
  let usWidth = textWidth("united states")+20;
  let ukWidth = textWidth("united kingdom")+20;
  let ussrWidth = textWidth("ussr")+20;
  let globalWidth = textWidth("global")+20;

  if (mouseX>width-padding-franceWidth && mouseX<width-padding && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=0;
    console.log("france");
  }
  if (mouseX>width-padding-franceWidth-chinaWidth && mouseX<width-padding-franceWidth && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=1;
    console.log("china");
  }
  if (mouseX>width-padding-franceWidth-chinaWidth-usWidth && mouseX<width-padding-franceWidth-chinaWidth && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=2;
    console.log("united states");
  }
  if (mouseX>width-padding-franceWidth-chinaWidth-usWidth-ukWidth && mouseX<width-padding-franceWidth-chinaWidth-usWidth && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=3;
    console.log("united kingdom");
  }
  if (mouseX>width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth && mouseX<width-padding-franceWidth-chinaWidth-usWidth-ukWidth && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=4;
    console.log("ussr");
  }
  if (mouseX>width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth-globalWidth && mouseX<width-padding-franceWidth-chinaWidth-usWidth-ukWidth-ussrWidth && mouseY>padding/2 && mouseY<padding/2+30) {
    shown=5;
    console.log("global");
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

  //***** create toggle *****
  createToggle('#B1C4C4');

  //***** draw circles *****

  let chinaVals = colVals(china);
  let franceVals = colVals(france);
  let ukVals = colVals(uk);
  let usVals = colVals(us);
  let ussrVals = colVals(ussr);
  let globVals = colVals(glob);

  // console.log(chinaVals);

  let valVariables = [franceVals, chinaVals, usVals, ukVals, ussrVals, globVals]

  dataOnView = valVariables[shown];
  colorShown = colors[shown];

  // for (var i=0; i<valVariables.length; i++) {
  //   drawCircles(valVariables[i],colors[i])
  // }

  drawCircles(dataOnView,colorShown);
  drawAxes(dataOnView);


  // //***** draw vertical axis ******
  // push();
  // strokeWeight(.5);
  // stroke(0);
  // fill('#555C63');
  // textAlign(CENTER, CENTER);
  //
  // var verticalTickNumber = yScaleMax/scaleTicks;
  // // console.log(verticalTickNumber);
  // let scaledYHeight = map(yScaleMax, 0, yScaleMax, 0, height-2*padding);
  // // console.log(scaledYHeight);
  // // console.log(height-padding-padding);
  // line(padding, padding, padding, height-padding);
  // for (var i=0; i<=scaleTicks; i++) {
  //   strokeWeight(1);
  //   stroke(0);
  //   line(padding-5, height-padding-scaledYHeight/scaleTicks*i, padding+5, height-padding-scaledYHeight/scaleTicks*i);
  //   push();
  //   noStroke();
  //   text(verticalTickNumber*i, padding-25, height-padding-scaledYHeight/scaleTicks*i);
  //   pop();
  // }
  //
  // //***** draw horizontal axis *****
  // line(padding, height-padding, width-padding, height-padding);
  // // let scaledWidth = map(year.max, year.min, year.max, 0, width-2*padding);
  // let chartWidth = width-2*padding
  // let horizontalTicks = chartWidth/chinaVals.years.length;
  // // let chartWidthForTicks = chartWidth + horizontalTicks
  //
  //
  // for(var i=0; i<chinaVals.years.length; i++) {
  //   push();
  //   noStroke();
  //   textSize(8);
  //   text(chinaVals.years[i], padding + i*horizontalTicks, height-padding+10);
  //   pop();
  //   strokeWeight(.5);
  //   stroke(0);
  //   line(padding + i*horizontalTicks+horizontalTicks/2, padding-5+height, padding + i*horizontalTicks+horizontalTicks/2, padding+5+height)
  // }
  //
  // pop();

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
