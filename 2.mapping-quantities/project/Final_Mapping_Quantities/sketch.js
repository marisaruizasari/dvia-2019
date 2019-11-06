
// ------------- declare global vars -------------------------------------------->
let tumblerAble, rangerBaker, albertaLittleBoy, albertaFatMan, dominicMesilla, ivyKing, dominicPamlico, dominicHousatonic;

let data = [];

let kmBlast = ["1.68 mi²","6.72 mi²","10.2 mi²","12.8 mi²","36.2 mi²","106 mi²","415 mi²","688.29 mi²"];
let colors = ['#9C4C4F77', '#76BDDB66', '#59AC8D77', '#DE905477', '#BFC95177','#0B1F3677'];
// let colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854','#e41a1c']

// scaling variables
var padding = 60;
var yScaleMax = 180000
var scaleTicks = 10

//data on display
let dataOnView;
let shown = 2;

var legend;
var hiroshimaImg;

// ------------- preload data -------------------------------------------->
function preload() {

    tumblerAble = loadTable('data/tumbler-able.csv','csv','header');
    rangerBaker = loadTable('data/ranger-baker.csv','csv','header');
    albertaLittleBoy = loadTable('data/alberta-littleBoy.csv','csv','header');
    albertaFatMan = loadTable('data/alberta-fatMan.csv','csv','header');
    dominicMesilla = loadTable('data/dominic1-mesilla.csv','csv','header');
    ivyKing = loadTable('data/ivy-king.csv','csv','header');
    dominicPamlico = loadTable('data/dominic1-pamlico.csv','csv','header');
    dominicHousatonic = loadTable('data/dominic1-housatonic.csv','csv','header');

    legend = loadImage("legend-01.png")
    hiroshimaImg = loadImage("hiroshima.jpg")
}


// ------------- function to add country toggle feature -------------------------------------------->
let yShift = 420;
let buttonWidth = 230;
let buttonHeight = 30;
let textPadding = padding + 15;

function createToggle(toggleColor) {

  textSize(16);
  // let buttonWidth = textWidth("Housatonic: 8300kt")+30;

  let altFill = "#EFEFF0"

  textAlign(LEFT, CENTER);
  //France
  fill(toggleColor);
  if (shown != 0) {
      fill(altFill);
  }
  rect(padding, padding+yShift, buttonWidth, buttonHeight);
  //China
  fill(toggleColor);
  if (shown != 1) {
      fill(altFill);
  }
  rect(padding, padding+yShift+buttonHeight, buttonWidth, buttonHeight);
  //United States
  fill(toggleColor);
  if (shown != 2) {
    fill(altFill)
  }
  rect(padding, padding+yShift+(2*buttonHeight), buttonWidth, buttonHeight);
  //United Kingdom
  fill(toggleColor);
  if (shown != 3) {
    fill(altFill)
  }
  rect(padding, padding+yShift+(3*buttonHeight), buttonWidth, buttonHeight);
  //USSR
  fill(toggleColor);
  if (shown != 4) {
    fill(altFill);
  }
  rect(padding, padding+yShift+(4*buttonHeight), buttonWidth, buttonHeight);
  //Global
  fill(toggleColor);
  if (shown != 5) {
      fill(altFill);
  }
  rect(padding, padding+yShift+(5*buttonHeight), buttonWidth, buttonHeight);
  //Global
  fill(toggleColor);
  if (shown != 6) {
      fill(altFill);
  }
  rect(padding, padding+yShift+(6*buttonHeight), buttonWidth, buttonHeight);
  //Global
  fill(toggleColor);
  if (shown != 7) {
      fill(altFill);
  }
  rect(padding, padding+yShift+(7*buttonHeight), buttonWidth, buttonHeight);


  //Text labels
  fill(0);
  textFont('Roboto Condensed');
  text("Able: 1kt", textPadding+5, textPadding+yShift);
  text("Baker: 8kt", textPadding+5, textPadding+yShift+buttonHeight);
  text("Little Boy: 15kt | HIROSHIMA", textPadding+5, textPadding+yShift+(2*buttonHeight));
  text("Fat Man: 21kt | NAGASAKI", textPadding+5, textPadding+yShift+(3*buttonHeight));
  text("Mesilla: 100kt", textPadding+5, textPadding+yShift+(4*buttonHeight));
  text("King: 500kt", textPadding+5, textPadding+yShift+(5*buttonHeight));
  text("Pamlico: 3880kt", textPadding+5, textPadding+yShift+(6*buttonHeight));
  text("Housatonic: 8300kt", textPadding+5, textPadding+yShift+(7*buttonHeight));
  textStyle(BOLD);
  textSize(18);
  text("Choose a US Nuclear Bomb: ", textPadding, textPadding+yShift-50)
}


// ------------- function for mouse click on country toggle -------------------------------------------->

function mouseClicked() {


  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift && mouseY<padding+yShift+buttonHeight) {
    shown=0;
    console.log("Able");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+buttonHeight && mouseY<padding+yShift+(2*buttonHeight)) {
    shown=1;
    console.log("Baker");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(2*buttonHeight) && mouseY<padding+yShift+(3*buttonHeight)) {
    shown=2;
    console.log("Little Boy");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(3*buttonHeight) && mouseY<padding+yShift+(4*buttonHeight)) {
    shown=3;
    console.log("Fat Man");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(4*buttonHeight) && mouseY<padding+yShift+(5*buttonHeight)) {
    shown=4;
    console.log("Mesilla");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(5*buttonHeight) && mouseY<padding+yShift+(6*buttonHeight)) {
    shown=5;
    console.log("King");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(6*buttonHeight) && mouseY<padding+yShift+(7*buttonHeight)) {
    shown=6;
    console.log("Pamlico");
  }
  if (mouseX>padding && mouseX<padding+buttonWidth && mouseY>padding+yShift+(7*buttonHeight) && mouseY<padding+yShift+(8*buttonHeight)) {
    shown=7;
    console.log("Housatonic");
  }

}



// ------------- setup -------------------------------------------->
function setup() {

  frameRate(10);
  createCanvas(1700, 2000);
  background(255);
  stroke(255);


// pull all info into array of objects for each test, with a nested array of objects for each city
  let allTests = [tumblerAble, rangerBaker, albertaLittleBoy, albertaFatMan, dominicMesilla, ivyKing, dominicPamlico, dominicHousatonic];

  allTests.forEach(test => {

    let cities = test.getColumn("City");
    let deaths = test.getColumn("Deaths");
    let injuries = test.getColumn("Injuries");
    let peopleInPS1 = test.getColumn("People in Ps1");
    let percentDead = test.getColumn("% dead");
    let kT = test.getColumn("KT")[0];
    let testYear = test. getColumn("bombYear")[0];
    let series = test.getColumn("series")[0];
    let shot = test.getColumn("shot")[0];

    let rowCount = test.getRowCount();

    let testObject = {
      testName: shot,
      testYear: testYear,
      series: series,
      shot: shot,
      kT: kT,
      cities: []
    };

    for (var b=0; b<rowCount; b++) {

      let  city = {
        name: cities[b],
        deaths: deaths[b],
        injuries: injuries[b],
        peopleInPS1: peopleInPS1[b],
        percentDead: percentDead[b]
      };

      testObject.cities.push(city);
    }

    // console.log(testObject);
    data.push(testObject);

  });

  console.log(data);


}

// ------------- draw -------------------------------------------->

function draw() {

background(255);

image(legend, padding-8, 720, 245,245)
image(hiroshimaImg, 0,0, 1700,90)
// push();
// fill(200);
// rect(0,0,width,95);
// pop();

dataOnView = data[shown];
// console.log(dataOnView);


//draw site title
push();
textStyle(BOLD);
textAlign(CENTER);
textSize(35);
fill(255);
text("United States Nuclear Bombs: Death Count in Six Major Cities", 830, 45)
pop();

//intro text
push();
textAlign(LEFT);
textStyle(NORMAL);
textSize(14);
fill(0);
text("On August 6th, 1945, the United States dropped a 15 kiloton (kt) Mk-1 atomic bomb over the Japanese city of Hiroshima, instantly destroying roughly 90% of the city. Three days later, the US dropped a 21 kt atomic bomb over the city of Nagasaki. The Hiroshima and Nagasaki bombings represent the only uses of atomic weapons in combat, and together resulted in the deaths of over 200,000 people. Select a US atomic bomb test from the list below to estimate the impact of each bomb's detonation on six of the country's major cities today.", padding, 110, 250, 300);
pop();

//draw toggle buttons
textStyle(NORMAL);
textSize(14);
createToggle("#FFD43F");


//source text
push();
textAlign(LEFT);
textStyle(NORMAL);
textSize(12);
fill(0);
// var jArch = createA('http://www.johnstonsarchive.net/nuclear/tests/', 'Johnstons Archive')
// var nukeMap = createA('https://nuclearsecrecy.com/nukemap/', 'Nuke Map')
text(`This visualization draws from Johnstons Archive data on nuclear testing and the Nuke Map website by Alex Wellerstein. The number of people within the blast radius is calculated using population density data, and represents the number of people in a given area within a 24 hour period. The blast radius represents the area of 1 psi overpressure after the blast.`, padding, 900, 250, 300);
pop();

let cityXPoints = [1350,550,1350,550,950,950];
let cityYPoints = [350,750,750,350,350,750];

let cityLabelY = 150;
let peopleCountLabelY = cityLabelY + 30;
let deathLabelY = cityLabelY + 50;
let percentDeadLabelY = cityLabelY + 80;

//draw city labels
textStyle(BOLD);
textAlign(CENTER);
textSize(20);
text("SAN FRANCISCO", cityXPoints[3], cityYPoints[3]+cityLabelY);
text("CHICAGO", cityXPoints[4], cityYPoints[4]+cityLabelY);
text("NEW YORK", cityXPoints[0], cityYPoints[0]+cityLabelY);

text("LOS ANGELES", cityXPoints[1], cityYPoints[1]+cityLabelY);
text("HOUSTON", cityXPoints[5], cityYPoints[5]+cityLabelY);
text("WASHINGTON DC", cityXPoints[2], cityYPoints[2]+cityLabelY);

push();
textAlign(LEFT);
textSize(30);
text(`Test name: ${dataOnView.testName}`, padding+340,160);
textStyle(NORMAL);
fill(200);
text(`| ${dataOnView.kT} kilotons` , padding+340+20+textWidth(`Test name: ${dataOnView.testName}`),160);
text(`| Test year ${dataOnView.testYear}`, padding+340+30+textWidth(`Test name: ${dataOnView.testName}`)+textWidth(`| ${dataOnView.kT} kilotons`),160);
if (shown != 2) {
  text(`| ${(parseFloat(parseFloat(dataOnView.kT)/15)*100).toFixed(0)}% of the size of the Hiroshima Bomb`,padding+340+40+textWidth(`Test name: ${dataOnView.testName}`)+textWidth(`| ${dataOnView.kT} kilotons`)+textWidth(`| Test year ${dataOnView.testYear}`),160)
}
pop();

push();
textAlign(LEFT);
textSize(15);
text(`Air Blast Radius: ${kmBlast[shown]}`, padding+340,195);
pop();

push();
strokeWeight(.5);
stroke(100);
line(padding+340,180,padding+1550,180);
pop();

// view order top row: 3-SF, 4-Chi, 0-NY
// view order bottom row: 1-LA, 5-Hou, 6-NY

// array order
// 0 - NY
// 1 - LA
// 2 - DC
// 3 - SF
// 4 - Chi
// 5 - Hous

let xTextPositions = [1100,400,1100,400,750,750];
let yTextPositions = [600,900,900,600,600,900];

let centerPoints =  [{city: "ny", mx: cityXPoints[0], my: cityYPoints[0]},{city: "la", mx: cityXPoints[1], my: cityYPoints[1]},{city: "dc", mx: cityXPoints[2], my: cityYPoints[2]},{city: "sf", mx: cityXPoints[3], my: cityYPoints[3]},{city: "chi", mx: cityXPoints[4], my: cityYPoints[4]},{city: "hous", mx: cityXPoints[5], my: cityYPoints[5]}];

// let textColor = ["#7a0177","#006837","#253494","#993404","#bd0026","#54278f"];
let textColor = ["#EE705F","#5679BC","#64C5B8","#BF4E9C","#9CBF3C","#F2974D"];
// let textColor = ["#70A65E","#FFB442","#EB384C","#8352FF","#66D8BB","#A8386C"];

let centerpointRadii = [];

let kTs = [1,8,15,21,100,500,3880,8300]

for (var k=0; k<kTs.length;k++) {
  let logScaleRadius = map(log(kTs[k]), 0,log(8300),0,105);
  centerpointRadii.push(logScaleRadius)
}

if (frameCount<10) {
  console.log(centerpointRadii);
}


// text(dataOnView.cities, padding + 350, padding + 100);

textStyle(NORMAL);

for (var x=0; x<dataOnView.cities.length; x++) {
  push();
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER);
  fill(100);
  text("People in blast range: " + dataOnView.cities[x].peopleInPS1, cityXPoints[x], cityYPoints[x]+peopleCountLabelY);
  text("Deaths: " + dataOnView.cities[x].deaths, cityXPoints[x], cityYPoints[x]+deathLabelY);


  textSize(20);
  textStyle(BOLD);
  fill(textColor[x]);
  text(dataOnView.cities[x].percentDead + "% Killed", cityXPoints[x], cityYPoints[x]+percentDeadLabelY);
  pop();

  ps1Count = parseInt(dataOnView.cities[x].peopleInPS1);
  deathCount = parseInt(dataOnView.cities[x].deaths);


  // console.log(ps1Count)

  // if(frameCount<10){
  //   console.log(ps1Count)
  // }


  var dotCount = map(ps1Count, 0, 11000000, 0, 1500);
  var deathDotCount = map(deathCount, 0, 11000000, 0, 1500)

  let centerPointRadius = centerpointRadii[shown]+20;
  let xCenterPoint = centerPoints[x].mx;
  let yCenterPoint = centerPoints[x].my;

  push();

  // stroke("#F7F0EE");
  // strokeWeight(.15*centerPointRadius);
  // ellipse(xCenterPoint, yCenterPoint, ((2*centerPointRadius)+10)/5);
  // ellipse(xCenterPoint, yCenterPoint, ((2*centerPointRadius)+10)/2);
  // ellipse(xCenterPoint, yCenterPoint, ((2*centerPointRadius)+10)*.75);
  fill(245);
  noFill();
  stroke(50);
  strokeWeight(.75);
  ellipse(xCenterPoint, yCenterPoint, (2*centerPointRadius)+10);
  // line(xCenterPoint,yCenterPoint+centerPointRadius+5,xCenterPoint,yCenterPoint-centerPointRadius-5)
  // line(xCenterPoint-centerPointRadius-5,yCenterPoint,xCenterPoint+centerPointRadius+5,yCenterPoint)
  line(xCenterPoint,yCenterPoint+10,xCenterPoint,yCenterPoint-10)
  line(xCenterPoint-10,yCenterPoint,xCenterPoint+10,yCenterPoint)

  line(xCenterPoint+centerPointRadius+5,yCenterPoint,xCenterPoint+centerPointRadius-5,yCenterPoint)
  line(xCenterPoint-centerPointRadius-5,yCenterPoint,xCenterPoint-centerPointRadius+5,yCenterPoint)

  line(xCenterPoint,yCenterPoint+centerPointRadius+5,xCenterPoint,yCenterPoint+centerPointRadius-5)
  line(xCenterPoint,yCenterPoint-centerPointRadius-5,xCenterPoint,yCenterPoint-centerPointRadius+5)

  fill("#615F5F");
  noStroke();
  // ellipse(xCenterPoint, yCenterPoint, centerPointRadius/8);
  pop();

  for (var z=0; z<dotCount; z++) {


    let xDot = random(xCenterPoint-centerPointRadius,xCenterPoint+centerPointRadius);
    let yDot = random(yCenterPoint-centerPointRadius,yCenterPoint+centerPointRadius);

    strokeWeight(0.5);
    if (z>deathDotCount && dist(xDot,yDot,xCenterPoint,yCenterPoint)<centerPointRadius) {
      fill(230);
      ellipse(xDot,yDot,6)
    } else if (z<=deathDotCount && dist(xDot,yDot,xCenterPoint,yCenterPoint)<centerPointRadius) {
      fill(textColor[x]);
      ellipse(xDot,yDot,6)
    } else if (dist(xDot,yDot,xCenterPoint,yCenterPoint)>centerPointRadius) {
      xDot = random(xCenterPoint-centerPointRadius,xCenterPoint+centerPointRadius)
      yDot = random(yCenterPoint-centerPointRadius,yCenterPoint+centerPointRadius)
    }

  }

};




  // //***** create objects *****
  //
  // let chinaVals = colVals(china);
  // let franceVals = colVals(france);
  // let ukVals = colVals(uk);
  // let usVals = colVals(us);
  // let ussrVals = colVals(ussr);
  // let globVals = colVals(glob);
  //
  // // console.log(chinaVals);
  //
  // let valVariables = [franceVals, chinaVals, usVals, ukVals, ussrVals, globVals]
  //

  // colorShown = colors[shown];
  //
  // //***** create toggle *****
  // createToggle(colorShown);
  // //***** draw circles *****



}
