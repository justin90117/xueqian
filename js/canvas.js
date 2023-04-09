const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

function init() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = window.innerHeight * devicePixelRatio;
}

init();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Point {
  constructor() {
    this.r = 6;
    this.x = getRandom(0, cvs.width - this.r / 2);
    this.y = getRandom(0, cvs.height - this.r / 2);
    this.xSpeed = getRandom(-50, 50);
    this.ySpeed = getRandom(-50, 50);
    this.lastDrawTime = null;
  }
  draw() {
    if (this.lastDrawTime) {
      const duration = (Date.now() - this.lastDrawTime) / 1000;
      const xDis = this.xSpeed * duration,
        yDis = this.ySpeed * duration;
      let x = this.x + xDis,
        y = this.y + yDis;
      if (x > cvs.width - this.r / 2) {
        x = 0;
        x = cvs.width - this.r / 2;
        this.xSpeed = -this.xSpeed;
      } else if (x < 0) {
        this.xSpeed = -this.xSpeed;
      }
      if (y > cvs.height - this.r / 2) {
        y = 0;
        y = cvs.height - this.r / 2;
        this.ySpeed = -this.ySpeed;
      } else if (y < 0) {
        this.ySpeed = -this.ySpeed;
      }
      this.x = x;
      this.y = y;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.r
    );
    gradient.addColorStop(0, "rgba(200,200,200,1)");
    gradient.addColorStop(1, "rgba(200,200,200,0)");
    ctx.fillStyle = gradient;
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
  /*draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fillStyle = 'rgb(200,200,200)';
        ctx.fill();
    }*/
}
/*class Graph{
    constructor(pointNumber=40,maxDis=300){
        this.points = new Array(pointNumber).fill(0).map(()=>new Point());
        this.maxDis=maxDis;
    }
    draw(){
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            p1.draw();
            for (let j = i+1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const d = Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2);
                if (d>this.maxDis) {
                    continue;
                }
                ctx.beginPath();
                ctx.moveTo(p1.x,p1.y);
                ctx.lineTo(p2.x,p2.y);
                //ctx.closePath();
                const a = 1-d/this.maxDis;
                ctx.strokeStyle = "rgba(200,200,200,a)";
                ctx.stroke();
            }
        }
    }
}*/
class Graph {
  constructor(pointNumber = 40, maxDis = 300) {
    this.points = new Array(pointNumber).fill(0).map(() => new Point());
    this.maxDis = maxDis;
    this.gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
    this.gradient.addColorStop(0, "rgba(255,0,0,0.5)");
    this.gradient.addColorStop(0.5, "rgba(255,255,0,0.5)");
    this.gradient.addColorStop(1, "rgba(0,255,0,0.5)");
  }
  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      p1.draw();
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (d > this.maxDis) {
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.gradient;
        ctx.stroke();
      }
    }
  }
}

const g = new Graph();
g.draw();
