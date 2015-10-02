var canvas;
var ctx;

var input_key_code;

var game;

var width;
var height;

var ship;

var building;

var buildingData;
var nextAddBuildingIndex;
var buildingCount;

function load(){
    canvas=document.getElementById("stage");
    ctx=canvas.getContext("2d");

    width=800;
    height = 560;

    input_key_code = new Array();

    ship = { x: width / 2, y: height / 2, speed: 0, radius: 10, vSpeed: 0.3 };

    building = {
        high_o: {
            count: 1,
            y: height - 100
        },
        low_o: {
            count: 1,
            y: height - 80
        }
    };

	buildingData = new Array(3);
	for (var i = 0; i < 3; i++) {
	    buildingData[i] = { x: -200, data: building.high_o };
	}

	nextAddBuildingIndex = 0;
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
        switch (Math.floor(Math.random() * 2)) {
            case 0: buildingData[nextAddBuildingIndex] = { x: width, data: building.high_o };
                break;
            case 1: buildingData[nextAddBuildingIndex] = { x: width, data: building.low_o };
                break;
        }
        buildingCount = 180;
        nextAddBuildingIndex = (nextAddBuildingIndex + 1) % 3;
    }
    for (var i = 0; i < 3; i++) {
        if (buildingData[i].x > -160) {
            buildingData[i].x -= 3;
        }
    }
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

    for (var i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb( 0, 0, 0)';
        ctx.strokeRect(buildingData[i].x, buildingData[i].data.y, 160, height - buildingData[i].data.y);
    }
}

function stopGame(){
    clearInterval(game);
}