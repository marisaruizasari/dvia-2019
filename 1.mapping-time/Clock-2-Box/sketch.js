
var colors = ['#99CCFF', '#CC99FF']
let angle = 0;


var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}



function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())

}


function draw() {

var cl = clock();
var color = colorForProgress(cl.progress.hour);
background(color);

var hr = 1 * cl.progress.hour;
var mn = cl.progress.min;
var sc = 255 * cl.progress.sec;
var sec = cl.progress.sec;


pointLight(255, 255, sc, 400 * sec);
rectMode(CENTER);
noStroke();
fill(255);
rotateX(angle);
rotateZ(angle);
box(90);


angle += mn;


}
