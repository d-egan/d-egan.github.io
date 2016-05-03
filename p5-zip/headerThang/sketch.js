var system;
var scrollthing = 0.6;

function setup() {
  createCanvas(600, 600);
  system = new ParticleSystem(createVector(width/2, height/50));
  for (var i =0; i < 300; i++) {
  	system.addParticle();
  }
}

function draw() {
  clear()
  //system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function() {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = createVector((floor(random(0, 2))*width), (floor(random(0, 2)*height)));
  //this.position = createVector(random(0, width), random(0, height));
  //this.position = createVector()
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.acceleration = p5.Vector.sub(createVector(width/2, height/2), this.position);
  this.acceleration.normalize();
  this.acceleration.mult(scrollthing); //0.6
  this.velocity.add(this.acceleration);
  this.velocity.normalize();
  this.velocity.mult(5.98);
  this.position.add(this.velocity);
};

function mouseWheel(event){
    
    scrollthing += event.delta;
}
// Method to display
Particle.prototype.display = function() {
  //stroke(200);
  //strokeWeight(2);
  noStroke();
  var distance = dist(this.position.x, this.position.y, width/2, height/2);
  //var dec = color(#89bdd3, 255-distance);
  //fill(127, 200, 40, 255-distance);
  //fill(137,189,211, 255-distance);
  fill(79,79,79, 255-distance);
  ellipse(this.position.x, this.position.y, 55, 55);
};



var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle());
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
  }
};