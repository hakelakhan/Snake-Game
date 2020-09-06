let scoreBoard;
var scl = 20;
var food;
function setup() {
	createCanvas(600, 600);
	scoreBoard = createDiv('Score = 10');
	scoreBoard.position(20,620);
	scoreBoard.id = 'score';
	scoreBoard.style('color', 'red');

	s = new Snake();
	frameRate(10);
	pickLocation();
}
function draw() {
	background(51);	
	if(s.body.length != s.length)
		s.length = s.body.length;	
	if(s.death()) {
		const prevScore = parseInt(scoreBoard.html().substring(8));
		scoreBoard.html('Game Over!!! Score = ' + prevScore);
		noLoop();
	}
	var newPos = createVector(s.body[0].x + s.xspeed * scl, s.body[0].y + s.yspeed * scl);
			
	if(newPos.x < 0 || newPos.y < 0 || 
	newPos.x > width - scl ||newPos.y > height - scl	)  {
		s.show();
		const prevScore = parseInt(scoreBoard.html().substring(8));
		scoreBoard.html('Game Over!!! Score = ' + prevScore);
		noLoop();
	}

	s.update();
	s.show();
	if(s.eat(food))
		pickLocation();
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}
function pickLocation() {
	var cols = floor(width/ scl);
	var rows = floor(height / scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}
function keyPressed() {
	if(keyCode == UP_ARROW) {
		s.dir(0, -1);
	}
	else if(keyCode == DOWN_ARROW) {
		s.dir(0, 1);
	}
	else if(keyCode == LEFT_ARROW) {
		s.dir(-1, 0);
	}
	else if(keyCode == RIGHT_ARROW) {		
		s.dir(1, 0);
	}
}
function Snake() {
	this.length = 1;
	this.xspeed = 1;
	this.yspeed = 0;
	this.body = [];
	this.body[0] = createVector(0,0);
//	this.body[1] = createVector(20,0);
	this.update = function() {
		
		for(var i = this.body.length; i >0 ; i--) {
				this.body[i] = createVector(this.body[i - 1].x, this.body[i - 1].y);
			}
			this.body.pop();
			this.body[0] = createVector(this.body[0].x + this.xspeed * scl, this.body[0].y + this.yspeed * scl);
			//this.body[0].x = constrain(this.body[0].x, 0, width - scl);
			//this.body[0].y = constrain(this.body[0].y, 0, height - scl);			
		
	}
	this.show = function() {
		fill(255);
		for(var i = 0; i < this.body.length; i++) {
			rect(this.body[i].x, this.body[i].y, scl, scl);
		}
	}
	this.death = function() {
		for(var i = 1; i < this.body.length; i++) {
			if(dist(this.body[0].x, this.body[0].y, this.body[i].x,  this.body[i].y) < 1) {
				return true;
			}
		}
		return false;
	}
	this.eat = function(pos) {
		if(dist(this.body[0].x, this.body[0].y, pos.x,  pos.y) < 1) {
			for(var i = this.body.length; i > 0; i--) {
				this.body[i] = this.body[i - 1];
			}
			this.body[0] = createVector(pos.x + this.xspeed * scl, pos.y + this.yspeed * scl);	
			const prevScore = parseInt(scoreBoard.html().substring(8));
			scoreBoard.html('Score = ' + (prevScore + 10));
			return true;
		}
		else
			return false;
	}
	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}
}
