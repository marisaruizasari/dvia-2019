
var colors = ['#4C6C73','#99CCFF','#7C9EA6','#8293A8']

// '#C1D4D9', '#7C9EA6', '#4C6C73', '#011C26'
// '#8293A8', '#E2E3B3', '#DDAB00','#D77C4B'
// '#99CCFF', '#CC99FF'

var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()



}

var img;

function setup() {
  // set the width & height of the sketch
  createCanvas(800, 400);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())
  img = loadImage('icons.png');
}

// '#C1D4D9', '#7C9EA6', '#4C6C73', '#011C26'

function draw() {

var cl = clock();
let color = colorForProgress(cl.progress.min)
background(255);

var hr = height * cl.progress.hour;
var mn = cl.progress.min;
var dy = width * cl.progress.day
var pm = cl.pm

fill(color);
noStroke();
rect(0,0,dy,400);

image(img, 150, hr, img.width, img.height);

fill('#C1D4D9');
if (cl.pm) {
  translate(300,0);
  fill('#4C6C73');
}
ellipse(250,150, 15,15);





}


var cl = clock();
let color = colorForProgress(cl.progress.hour)
