const WIDTH = 800;
const HEIGHT = 560;

const NOMAL_SPEED = 3;
const HIGH_SPEED = 5;

const BUILDING_NUMBER = 3;
const BUILDING_WIDTH = 160;
const BUILDING_INTERVAL = 180;

const LOLLIPOP_NUMBER = 2;
const LOLLIPOP_RADIUS = 48;
const LOLLIPOP_SPACE = 200;
const LOLLIPOP_MIN_SIDE = 160;

var canvas;
var ctx;

var input_key_code;

var game;

var ship;

var building;

var buildingData;
var nextAddBuildingIndex;
var buildingCount;

var lollipopData;
var nextAddLollipopIndex;
var lollipopCount;
const lollipopColor = [
    'rgba(255, 100, 100, 0.7)',
    'rgba(100, 255, 100, 0.7)',
    'rgba(100, 100, 255, 0.7)',
    'rgba(255, 255, 100, 0.7)',
    'rgba(100, 255, 255, 0.7)',
    'rgba(255, 100, 255, 0.7)'
];

function lollipop(upSide) {
    this.x = WIDTH + LOLLIPOP_RADIUS;
    this.upSide = upSide;
    this.isMove = true;
    this.color = [
        lollipopColor[Math.floor(Math.random() * lollipopColor.length)],
        lollipopColor[Math.floor(Math.random() * lollipopColor.length)]
    ];
}

function load(){
    canvas=document.getElementById("stage");
    ctx=canvas.getContext("2d");

    input_key_code = new Array();

    ship = { x: WIDTH / 2, y: HEIGHT / 2, speed: 0, radius: 10, vSpeed: 0.4 };

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

	lollipopData = new Array(LOLLIPOP_NUMBER);
	for (var i = 0; i < LOLLIPOP_NUMBER; i++) {
	    lollipopData[i] = new lollipop(0);
	    lollipopData[i].isMove = false;
	}
	nextAddLollipopIndex = 0;
	lollipopCount = 0;
	
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
        nextAddBuildingIndex = (nextAddBuildingIndex + 1) % BUILDING_NUMBER;
    }
    for (var i = 0; i < BUILDING_NUMBER; i++) {
        if (buildingData[i].x > -BUILDING_WIDTH) {
            buildingData[i].x -= NOMAL_SPEED;
        }
    }
    buildingCount--;

    //***ÉçÉäÉ|ÉbÉv***//
    if (lollipopCount == 0) {
        var upSide = Math.floor(Math.random() * (HEIGHT - LOLLIPOP_SPACE - LOLLIPOP_MIN_SIDE * 2) + LOLLIPOP_MIN_SIDE);
        lollipopData[nextAddLollipopIndex] = new lollipop(upSide);
        lollipopCount = Math.floor(WIDTH / 2 / NOMAL_SPEED);
        nextAddLollipopIndex = (nextAddLollipopIndex + 1) % LOLLIPOP_NUMBER;
    }
    for (var i = 0; i < LOLLIPOP_NUMBER; i++) {
        lollipopData[i].x -= (lollipopData[i].isMove == true ? NOMAL_SPEED : 0);
    }
    lollipopCount--;

    //***à⁄ìÆèàóù***//
    if (input_key_code[32] == true) {
        ship.speed = (ship.speed > 0 ? -2 : ship.speed - ship.vSpeed);
    } else {
        ship.speed += ship.vSpeed;
    }
    ship.y += ship.speed;

    //****ìñÇΩÇËîªíË***//
    if (ship.y < 20 || ship.y > HEIGHT - 20) stopGame();
    for (var i = 0; i < LOLLIPOP_NUMBER; i++) {
        if((lollipopData[i].x-ship.x)*(lollipopData[i].x-ship.x)+
            (lollipopData[i].upSide-ship.y)*(lollipopData[i].upSide-ship.y) <
             (ship.radius + LOLLIPOP_RADIUS) * (ship.radius + LOLLIPOP_RADIUS)) {
            stopGame();
        }
        if ((lollipopData[i].x - ship.x) * (lollipopData[i].x - ship.x) +
            (lollipopData[i].upSide + LOLLIPOP_SPACE - ship.y) * (lollipopData[i].upSide + LOLLIPOP_SPACE - ship.y) <
             (ship.radius + LOLLIPOP_RADIUS) * (ship.radius + LOLLIPOP_RADIUS)) {
            stopGame();
        }
    }

    //***ï`âÊ***//
    ctx.beginPath();
    ctx.strokeStyle = 'rgb( 0, 0, 0)';
    ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2, true);
    ctx.stroke();
    for (var i = 0; i < BUILDING_NUMBER; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb( 0, 0, 0)';
        ctx.strokeRect(buildingData[i].x, buildingData[i].data.y, BUILDING_WIDTH, HEIGHT - buildingData[i].data.y);
    }
    for (var i = 0; i < LOLLIPOP_NUMBER; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb( 0, 0, 0)';
        ctx.strokeRect(lollipopData[i].x - 3, 0, 6, lollipopData[i].upSide);
        ctx.strokeRect(lollipopData[i].x - 3, lollipopData[i].upSide + LOLLIPOP_SPACE, 6, HEIGHT - (lollipopData[i].upSide + LOLLIPOP_SPACE));
        ctx.beginPath();
        ctx.fillStyle = lollipopData[i].color[0];
        ctx.arc(lollipopData[i].x, lollipopData[i].upSide, LOLLIPOP_RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = lollipopData[i].color[1];
        ctx.arc(lollipopData[i].x, lollipopData[i].upSide + LOLLIPOP_SPACE, LOLLIPOP_RADIUS, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function stopGame(){
    clearInterval(game);
}