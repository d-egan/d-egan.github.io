var system;

function setup() {
    createCanvas(600, 600);
    system = new ParticleSystem(createVector(width/2, width/2));
    for (var i = 0; i < 10; i++){
		system.addParticle();
	}

}

function draw() {
	backgroung(144);

    system.run(); 
}   


var Particle = function() {
	this.acceleration = createVector(0, 0.05);
	this.velocity = createVector(random(-1, 1), random(-1, 0));
	this.position = createVector(random(0, width), random(0, height));
};

Particle.prototype.run = function() {
	this.update();
	this.display();
};

Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
};

Particle.prototype.display = function() {
	stroke(200);
	strokeWeight(2);
	fill(127);
	ellipse(this.position.x, this.position.y, 12, 12);
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