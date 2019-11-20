var colors = ['#073040','#155959','#9AD9C2','#F8A63D', '#BC602A']

var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}


function setup() {
  // set the width & height of the sketch

  createCanvas(1200, 500);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())
  img = loadImage('icons.png');

}


function draw() {

var cl = clock();
// var dyWidth = width * cl.progress.day
// var dyHeight = height * cl.progress.day
var col = colorForProgress(cl.progress.season);
var hr = 250 + 50 * cl.progress.hour;
var mnthHeight = windowHeight * cl.progress.month
var weekWidth = windowWidth * cl.progress.week
// var yr = cl.year
var moon = 30 * cl.moon
var szn = cl.season
var diam = 100 * cl.progress.second;
var dy = width * cl.progress.day;
var sec = cl.progress.sec;
var mn = 250 * cl.progress.min;
// var wkdy = cl.weekday
x = mouseX

background(255);

// (1) background color - season progress
push();
fill(col);
noStroke();
rect(0,0,1200,500);
pop();


// (2,3) Jitters width of jitter range - week progress, diameter of ellipses - moon cycle progress
class Jitter {
  constructor() {
    this.x = random(weekWidth);
    this.y = mnthHeight;
    this.diameter = moon;
    this.speed = 1;
  }

  move() {
    this.x;
    this.y;
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

var color1 = color(40, 92, 245);
var color2 = color(255, 122, 29);

setGradient(0, 250, windowWidth, 80, color2, color1, "X");

// (4) image moves up and down within an hour
image(img, 350, hr, img.width, img.height);

// White dot moves right to left throughout day
fill('255');
noStroke();
ellipse(dy, 330, 15, 15);

fill('#FFCC31');
bug1 = new Jitter();
bug1.move();
bug1.display();

bug2 = new Jitter();
bug2.move();
bug2.display();

bug3 = new Jitter();
bug3.move();
bug3.display();

// line moves up and down throughout the minute
noFill();
strokeWeight(2);
stroke(255);
line(0, 0, 1200, mn);

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
