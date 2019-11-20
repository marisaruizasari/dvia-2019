
var imgs = [];

function preload() {
  for (var i=0; i<3; i++) {
    imgs[i] = loadImage(`Eye_images/eb/eb${i}.png`);
    console.log('success')
  }

  base = loadImage("Eye_Images/base.png");
  fur = loadImage("Eye_Images/fur.png");
  lashes = loadImage("Eye_Images/lashes.png")
}

function setup() {
  // set the width & height of the sketch
  var w = 800
  var h = 440

  createCanvas(w, h);
  angleMode(DEGREES);
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())
  imageMode(CORNER)


}


function draw() {

var cl = clock();

var season = 150*cl.season;
var mnth = cl.progress.month
var month = 10*cl.month
var moon = cl.moon;
var yr = cl.progress.year;



// var hr = cl.progress.hour;
// var mn = 60 * cl.progress.min;
// var sc = cl.progress.sec;
// var dyWidth = width * cl.progress.day
// var dyHeight = height * cl.progress.day
// var mnthHeight = height * cl.progress.month
// var mnthWidth = width * cl.progress.month
// var szn = cl.progress.season;
// var wkdy = cl.progress.weekday;


background(255);

image(base, 0, 0, width,height);


push()
image(fur, 0,0, width+season,height);
pop()

// image(imgs[1], 0,0, width,height);

push()
tint(255, 255*mnth);
image(lashes, 0,0, width, height);

tint(255, 255*moon);
image(imgs[2], 0,0, width,height);

tint(255, 255*yr);
image(imgs[0], 0,0, width,height);

pop()

stroke("#7DEBFF");
strokeWeight(3);
line(227, 340, 227, 340+month);


}



// for (var i=0; i<5; i++) {
//    image(imgs[i], random(width), random(height));
//  }
