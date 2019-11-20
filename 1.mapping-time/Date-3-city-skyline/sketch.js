
var colors = ['#8293A8', '#E2E3B3', '#DDAB00','#D77C4B']

var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()

let system;

}

var img;

function setup() {
  // set the width & height of the sketch
  createCanvas(800, 400);
  angleMode(DEGREES);
  var time = clock();
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())
  push()
  tint(255, 255*time.progress.month);
  system = new ParticleSystem(createVector(width / 2, 0));
  pop()
  img = loadImage('Images/NewYork.png');
}



function draw() {

var cl = clock();
let color = colorForProgress(cl.progress.season)
background(color)

var moon = height * cl.moon;
var mn = cl.moon
var week = width * cl.progress.week;

push()
fill('#FF5D2D');
ellipse(100,moon, 60*mn, 60*mn);
pop()

image(img, week, height/1.8, img.width/10, img.height/10);

system.addParticle();
  system.run();

}


var cl = clock();
let color = colorForProgress(cl.progress.month);

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, .03);
  this.velocity = createVector(random(-2, 2), random(-2, 1));
  this.position = position.copy();
  this.lifespan = 600;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};


// Method to display
Particle.prototype.display = function() {
  stroke(220, this.lifespan*cl.progress.season);
  strokeWeight(4);
  // fill(127, this.lifespan);
  line(this.position.x, this.position.y, this.position.x + cl.progress.season, this.position.y + cl.progress.season);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
