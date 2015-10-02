var canvas;
var ctx;

var input_key_code;

var game;

var width;
var height;

var shipX;
var shipY;
var shipSpeed;
var shipRadius;

var jumpActionTime;
var jumpDirectionUp;

var vJumpSpeed;
var vSpeed;

var buildingX;
var buildingY;
var buildingCount;

function load(){
	canvas=document.getElementById("stage");
	ctx=canvas.getContext("2d");

	width=800;
	height = 560;

	input_key_code = new Array();

	shipX=width/2;
	shipY=height/2;
	shipSpeed=0;
	shipRadius = 10;
	buildingCount = 0;

	jumpActionTime=0;
	jumpDirectionUp = false;

	vSpeed = 0.3;
	
	game=setInterval("tick()",16);
}

function tick() {
    ctx.clearRect(0, 0, width, height);

    document.onkeydown = function (e) {
        input_key_code[e.keyCode] = true;
    }
    document.onkeyup = function (e) {
        input_key_code[e.keyCode] = false;
    }

    if (buildingCount == 0) {
        buildingX = width;
        buildingY = height - 80;
        buildingCount = 300;
    }
    buildingX -= 3;
    buildingCount--;

    if (input_key_code[32] == true) {
        shipSpeed = (shipSpeed > 0 ? -2 : shipSpeed - vSpeed);
    } else {
        shipSpeed += vSpeed;
    }

    shipY += shipSpeed;

    if (shipY < 20 || shipY > height - 20) stopGame();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.arc(shipX, shipY, shipRadius, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.strokeRect(buildingX, buildingY, 50, height - buildingY);
}

function stopGame(){
    clearInterval(game);
}