const canvas = document.getElementById('canvas');
const speedTEXT = document.getElementById('speedTxt');
const maxSpeedTEXT = document.getElementById('maxSpeedTxt');
const sig = document.getElementById('signature');
const decreaseMaxSpeedBTN = document.getElementById('resetBtn');
const addMaxSpeedBTN = document.getElementById('startBtn');
const rayText = document.getElementById('rayTxt');
const laneText = document.getElementById('laneTxt');

canvas.width= 400;
const ctx = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width*.95);
const car = new Car(road.getLaneCenter(0), 500, 30, 50);


setSignature();
animate();
const laneUpBTN = document.getElementById('laneUpBtn').addEventListener('click', increaseLanes);
const laneDownBTN = document.getElementById('laneDownBtn').addEventListener('click', decreaseLanes);
const autoModeBtn = document.getElementById('autoBtn').addEventListener('click', autoSpeed);
const addRayBTN = document.getElementById('rayPlus').addEventListener('click', increaseRays);
const removeRayBTN = document.getElementById('rayMinus').addEventListener('click',decreaseRays);
decreaseMaxSpeedBTN.addEventListener('click', decreaseSpeed);
addMaxSpeedBTN.addEventListener('click', increaseSpeed);

var autoMode = false;


function autoSpeed(){
    if (car.autoMode){
        car.speed = 0;
        car.autoMode = false;
    }else{
        car.autoMode = true;
    }
}

function increaseLanes(){
    road.laneCount++;
}

function decreaseLanes(){
    road.laneCount--;
}

function increaseRays(){
    car.sensor.rayCount ++;
}

function decreaseRays(){
    car.sensor.rayCount --;
}

function increaseSpeed(){
    car.max_speed ++;
}

function decreaseSpeed(){
    car.max_speed --;
}

function animate() {
    car.update(road.borders);

    canvas.height= window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8);

    road.draw(ctx);
    car.draw(ctx);
    ctx.restore();
    setSpeedText(car.speed);
    requestAnimationFrame(animate);
}

function setSpeedText(speed){
    speedTEXT.style.color = 'green';
    maxSpeedTEXT.style.color = 'orange';
    rayText.style.color = 'orange';
    laneText.style.color = 'orange';
    laneText.innerHTML = 'Current Lanes: ' + road.laneCount;
    maxSpeedTEXT.innerHTML = 'Max Speed: ' + car.max_speed;
    speedTEXT.innerHTML = 'Speed: ' + Math.round(Math.abs(speed));
    rayText.innerHTML = 'Rays: ' + car.sensor.rayCount;
}


function setSignature(){
    sig.style.color = 'red';
    sig.innerHTML = 'Created by <br><a style="text-decoration:none;" href="https://github.com/sera619" target="_blanc">S3R43o3</a>';
}