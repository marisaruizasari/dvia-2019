function setup() {
  // set the width & height of the sketch
  createCanvas(800, 500);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())


}


function draw() {

var cl = clock();
// var dyWidth = width * cl.progress.day
// var dyHeight = height * cl.progress.day
var mnthHeight = height * cl.progress.month
var mnthWidth = width * cl.progress.month
// var yr = cl.year
var moon = 30 * cl.moon
var szn = cl.season
// var wkdy = cl.weekday
x = mouseX

background(255);

// Jitter

class Jitter {
  constructor() {
    this.x = random(width);
    this.y = mnthHeight;
    this.diameter = moon;
    this.speed = 1;
  }

  move() {
    this.x += szn;
    this.y += szn;
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

var color1 = color(40, 92, 245);
var color2 = color(255, 122, 29);

setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");

// fill('#FF5130');
// noStroke();
// // ellipse(400, -200, 600,600);

fill('#FFBD4E');
noStroke();
ellipse(mnthWidth, mnthHeight, 100, 100);

fill('255');
bug1 = new Jitter();
bug1.move();
bug1.display();

bug2 = new Jitter();
bug2.move();
bug2.display();

bug3 = new Jitter();
bug3.move();
bug3.display();


}





// Gradient
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y+h);
    }
  }
}
