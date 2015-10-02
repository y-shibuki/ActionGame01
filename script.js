const WIDTH = 800;
const HEIGHT = 560;

const BUILDING_NUMBER = 3;
const BUILDING_WIDTH = 160;
const BUILDING_INTERVAL = 180;

var canvas;
var ctx;

var input_key_code;

var game;

var ship;

var building;

var buildingData;
var nextAddBuildingIndex;
var buildingCount;

function load(){
    canvas=document.getElementById("stage");
    ctx=canvas.getContext("2d");

    input_key_code = new Array();

    ship = { x: WIDTH / 2, y: HEIGHT / 2, speed: 0, radius: 10, vSpeed: 0.3 };

    building = {
        high_o: {
            count: 1,
            y: HEIGHT - 100
        },
        low_o: {
            count: 1,
            y: HEIGHT - 80
        }
    };

	buildingData = new Array(BUILDING_NUMBER);
	for (var i = 0; i < BUILDING_NUMBER; i++) {
	    buildingData[i] = { x: -BUILDING_WIDTH, data: building.high_o };
	}

	nextAddBuildingIndex = 0;
	buildingCount = 0;
	
	game=setInterval("tick()",16);
}

function tick() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    document.onkeydown = function (e) {
        input_key_code[e.keyCode] = true;
    }
    document.onkeyup = function (e) {
        input_key_code[e.keyCode] = false;
    }

    if (buildingCount == 0) {
        switch (Math.floor(Math.random() * 2)) {
            case 0: buildingData[nextAddBuildingIndex] = { x: WIDTH, data: building.high_o };
                break;
            case 1: buildingData[nextAddBuildingIndex] = { x: WIDTH, data: building.low_o };
                break;
        }
        buildingCount = BUILDING_INTERVAL;
        nextAddBuildingIndex = (nextAddBuildingIndex + 1) % 3;
    }
    for (var i = 0; i < BUILDING_NUMBER; i++) {
        if (buildingData[i].x > -BUILDING_WIDTH) {
            buildingData[i].x -= 3;
        }
    }
    buildingCount--;

    //***ˆÚ“®ˆ—***//
    if (input_key_code[32] == true) {
        ship.speed = (ship.speed > 0 ? -2 : ship.speed - ship.vSpeed);
    } else {
        ship.speed += ship.vSpeed;
    }
    ship.y += ship.speed;

    //****“–‚½‚è”»’è***//
    if (ship.y < 20 || ship.y > HEIGHT - 20) stopGame();

    //***•`‰æ***//
    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2, true);
    ctx.stroke();
    for (var i = 0; i < BUILDING_NUMBER; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb( 0, 0, 0)';
        ctx.strokeRect(buildingData[i].x, buildingData[i].data.y, BUILDING_WIDTH, HEIGHT - buildingData[i].data.y);
    }
}

function stopGame(){
    clearInterval(game);
}