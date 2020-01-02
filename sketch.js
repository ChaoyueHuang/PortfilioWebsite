
var bgcolor = '#fff';
var canvas;
var ball;
var purplesquare;
var bluecircle;
var whitecircle;
var circle1;
var circle2;
var circle3;
var square1;
var square2;
var hollowsquare;
var trianglebig;
var trianglesmall;
var triangle1;
var triangle2;



function windowResized() {
  resizeCanvas(windowWidth,800);
}

function preload() {
  circle1 = loadImage('images/circle1.png');
  circle2 = loadImage('images/circle2.png');
  circle3 = loadImage('images/circle3.png');
  square1 = loadImage('images/squarepurple.png');
  square2 = loadImage('images/squarehollow.png');
  triangle1 = loadImage('images/triangle.png');
  triangle2 = loadImage('images/trianglewhite.png');

}

function setup() {
  smooth();
  canvas = createCanvas(1200,800);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  imageMode(CENTER);

  ball = new Ball();
  bluecircle = new Circle();
  whitecircle = new Circle();
  purplesquare = new Square();
  hollowsquare = new Square();
  trianglebig = new Mover();
  trianglesmall = new Triangle();
}

function draw() {
  background(color(bgcolor));


  var force = ball.attract(trianglebig);
  trianglebig.applyForce(force);
  trianglebig.update();
  trianglebig.displaybig();
  trianglebig.checkEdges();

  push();
  ball.display();
  //ball.move();
  ball.checkEdges();
  pop();

  var f = createVector(0.2,0.03);
  purplesquare.applyForce(f);
  purplesquare.displaypurple();
  purplesquare.move();
  purplesquare.checkEdges();

  var h1 = createVector(0,-0.05);
  var h2 = createVector(-0.05,0);
  hollowsquare.applyForce(h1);
  hollowsquare.applyForce(h2);
  hollowsquare.displayhollow();
  hollowsquare.move();
  hollowsquare.checkEdges();

  var b1 = createVector(0,0.05);
  var b2 = createVector(-0.02,0);
  bluecircle.applyForce(b1);
  bluecircle.applyForce(b2);
  bluecircle.displaybc();
  bluecircle.move();
  bluecircle.checkEdges();

  // var t1 = createVector(0,random(-0.5,0.5));
  // var t2 = createVector(random(-0.5,0.5),0);
  // trianglebig.applyForce(t1);
  // trianglebig.applyForce(t2);
  // trianglebig.displaybig();
  // trianglebig.move();
  // trianglebig.checkEdges();

  var s1 = createVector(0,random(-0.5,0.5));
  var s2 = createVector(random(-0.5,0.5),0);

  //apply friction

  var friction = trianglesmall.velocity.copy();
  friction.normalize();
  var c = -0.01;
  friction.mult(c);
  trianglesmall.applyForce(friction);

  //trianglesmall.applyForce(s1);
  trianglesmall.applyForce(s2);
  trianglesmall.displaysmall();
  trianglesmall.move();
  trianglesmall.checkEdges();

  var w1 = createVector(0,random(-1,1));
  var w2 = createVector(random(-0.5,0.5),0);

  //apply drag

  var drag = whitecircle.velocity.copy();
  drag.normalize();
  var d = -0.1;
  var speed = whitecircle.velocity.mag();
  drag.mult(c*speed*speed);
  whitecircle.applyForce(drag);

  whitecircle.applyForce(w1);
  //whitecircle.applyForce(w2);
  whitecircle.displaywc();
  whitecircle.move();
  whitecircle.checkEdges();


}

class Ball {

  constructor() {
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(2.5, -2);
    this.acceleration = createVector(-1,0);
    this.r = 0.6;
    this.grow = 0.002;
    this.mass = 10;
    this.g = 1;
  }

  attract(m) {
    var force = p5.Vector.sub(this.location, m.location);
    var dis = force.mag();
    dis = constrain(dis, 5, 25);
    force.normalize();
    var strength = (this.g*this.mass*this.mass) / (dis * dis);
    force.mult(strength);
    return force;
  }

  display() {

    scale(this.r);

    // var angle  = 0.0;
    // var increase = 0.3;
    // angle = angle + increase;
    // var c = cos(angle);
    //
    // translate(width / 2, height / 2);
    // rotate(c);

    image(circle1, this.location.x, this.location.y);



    this.r = this.r + this.grow;
    if (this.r > 1) {
      this.grow = -this.grow;
    }
    else if (this.r < 0.6) {
      this.grow = -this.grow;
    }

  }

  move() {

    this.acceleration = p5.Vector.random2D();
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.velocity.limit(3);
  }

  checkEdges() {
      if (this.location.x > width - 100) {
        this.location.x = width - 100;
        this.velocity.x *= -1;
      } else if (this.location.x < 100) {
        this.velocity.x *= -1;
        this.location.x = 100;
      }
      if (this.location.y > height - 100) {
        this.velocity.y *= -1;
        this.location.y = height - 100;
      }
      if (this.location.y < 100) {
        this.velocity.y *= -1;
        this.location.y = 100;
      }
    }

}

class Square {

  constructor() {
    this.location = createVector(width/2-100, height/2-100);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

  }

  displaypurple() {
    image(square1, this.location.x, this.location.y);
  }

  displayhollow() {
    image(square2, this.location.x, this.location.y);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  move() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    //this.velocity.limit(10);

  }

  checkEdges() {
      if (this.location.x > width - 100) {
        this.location.x = width - 100;
        this.velocity.x *= -1;
      } else if (this.location.x < 100) {
        this.velocity.x *= -1;
        this.location.x = 100;
      }
      if (this.location.y > height - 100) {
        this.velocity.y *= -1;
        this.location.y = height - 100;
      }
      if (this.location.y < 100) {
        this.velocity.y *= -1;
        this.location.y = 100;
      }
    }

}

class Circle {

  constructor() {
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

  }

  displaybc() {
    image(circle2, this.location.x, this.location.y);
  }

  displaywc() {
    image(circle3, this.location.x, this.location.y);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  move() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    //this.velocity.limit(10);

  }

  checkEdges() {
      if (this.location.x > width - 100) {
        this.location.x = width - 100;
        this.velocity.x *= -1;
      } else if (this.location.x < 100) {
        this.velocity.x *= -1;
        this.location.x = 100;
      }
      if (this.location.y > height - 100) {
        this.velocity.y *= -1;
        this.location.y = height - 100;
      }
      if (this.location.y < 100) {
        this.velocity.y *= -1;
        this.location.y = 100;
      }
    }

}

class Triangle {

  constructor() {
    this.location = createVector(width/2-200, height/2+200);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

  }

  displaysmall() {
    image(triangle2, this.location.x, this.location.y);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  move() {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(5);

  }

  checkEdges() {
      if (this.location.x > width - 100) {
        this.location.x = width - 100;
        this.velocity.x *= -1;
      } else if (this.location.x < 100) {
        this.velocity.x *= -1;
        this.location.x = 100;
      }
      if (this.location.y > height - 100) {
        this.velocity.y *= -1;
        this.location.y = height - 100;
      }
      if (this.location.y < 100) {
        this.velocity.y *= -1;
        this.location.y = 100;
      }
    }

}

class Mover {
  constructor() {
    this.position = createVector(width/2-150, height/2+50);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    //this.velocity.limit(5);
  }

  displaybig() {
    image(triangle1, this.position.x, this.position.y);
  }

  checkEdges() {
    if (this.position.x > width - 100) {
      this.position.x = width - 100;
      this.velocity.x *= -1;
    } else if (this.position.x < 100) {
      this.velocity.x *= -1;
      this.position.x = 100;
    }
    if (this.position.y > height - 100) {
      this.velocity.y *= -1;
      this.position.y = height - 100;
    }
    if (this.position.y < 100) {
      this.velocity.y *= -1;
      this.position.y = 100;
    }
  }
}
