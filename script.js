var canvas;
var ctx;

var input_key_code;

var game;

var width;
var height;

var ship;

var buildingX;
var buildingY;
var buildingCount;

function load(){
	canvas=document.getElementById("stage");
	ctx=canvas.getContext("2d");

	width=800;
	height = 560;

	input_key_code = new Array();

	ship = { x: width / 2, y: height / 2, speed: 0, radius: 10, vSpeed: 0.3 };

	buildingCount = 0;
	
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
        ship.speed = (ship.speed > 0 ? -2 : ship.speed - ship.vSpeed);
    } else {
        ship.speed += ship.vSpeed;
    }

    ship.y += ship.speed;

    if (ship.y < 20 || ship.y > height - 20) stopGame();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.strokeRect(buildingX, buildingY, 50, height - buildingY);
}

function stopGame(){
    clearInterval(game);
}