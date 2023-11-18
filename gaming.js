"use strict";

addEventListener('load', start);

function hitobject(x, y, birthframe){
    this.x = x;
    this.y = y;
    this.birthframe = birthframe
}

function difficulty(AR, OD, CS){
    this.AR = AR;
    this.OD = OD;
    this.CS = CS;
}

async function start(){
console.log("start");
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
var interval = setInterval(update, 1)
var frametimer = 0;

var objectbuffer = [];
objectbuffer.push(new hitobject(50, 50, frametimer))

difficulty = new difficulty(10, 10, 50); //AR, OD, CS
var lifespan = difficulty.OD * 15;

var inputkeys = [];
fillcanvas();

//Do not allow window navigation with arrows + space
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

async function clear(){
    fillcanvas();
}

async function fillcanvas(){
    ctx.fillStyle = ""
    ctx.fillStyle = "#272727";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctxui.fillStyle = "#404040";
    //ctxui.fillRect(0, 0, canvas.width, canvas.height);
  }

  async function draw(){
    clear();
    objectbuffer.forEach(hitobject => {
        //circle
        ctx.beginPath();
        ctx.arc(hitobject.x, hitobject.y, difficulty.CS, 0, 2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        //approach circle
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(hitobject.x, hitobject.y, (hitobject.birthframe + lifespan - frametimer) + difficulty.CS, 0, 2*Math.PI);
        ctx.stroke();
    });
  }

  async function update(){
    console.log(objectbuffer);
    frametimer++;
    if(frametimer%60 == 0) {
        objectbuffer.push(new hitobject(Math.random() * canvas.width, Math.random() * canvas.height, frametimer));
        console.log("new object");
    }
    for(var i=0; i< objectbuffer.length; i++){
        if(objectbuffer[i].birthframe + lifespan < frametimer){
            objectbuffer.splice(i, 1);
        }
    }
    draw();
    }
}