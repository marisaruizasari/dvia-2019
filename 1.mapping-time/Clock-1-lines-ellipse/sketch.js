
var colors = ['#5377A6', '#F2E205']

// var colors = ['#F65427', '#F77860', '#F3948F','#ECABD3', '#D82E2B']

var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()

}

let t = 0;

function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())

}

const radius = 100

function draw() {

var cl = clock();
background(10,10);
var color = colorForProgress(cl.progress.day)

 fill(255);
 if (cl.pm) {
   fill('black');
 }
// make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 50) {
      // starting point of each circle depends on mouse position
      const xAngle = map(10, 0, width/2, -10, 10, true);
      const yAngle = map(10, 20, height/2, -4, 4, true);
      // and also varies based on the particle's location
      const angle = 1000;

      // each particle moves in a circle
      const myX = x + 10 * cos(1 * t + angle);
      const myY = y + 10 * sin(1 * t + angle);

      ellipse(myX, myY, 6); // draw particle
    }
  }



var hour = 50 * cl.progress.hour;
var hr = cl.progress.hour;
var mn = width * cl.progress.min;
var sc = width * cl.progress.sec;

t = t + 2 * hr // update time

noFill();
strokeWeight(10);
stroke(242,92,5);
line(0, 0, mn, mn);

fill(color);
noStroke();
ellipse(sc, 200, 20, 20);

noFill();
strokeWeight(10);
stroke(4,85,91);
line(mn, mn, mn, 0);

stroke(83,119,166);

}
