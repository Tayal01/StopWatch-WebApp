// Select elements
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const timeDisplay = document.getElementById("time");
const lapsContainer = document.getElementById("laps");
const lapCountDisplay = document.getElementById("lapCountDisplay");

const hourHand = document.getElementById("hourHand");
const minHand = document.getElementById("minHand");
const secHand = document.getElementById("secHand");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const formatTime = (ms) => {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
};

const startTimer = () => {
    if (running) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    running = true;
    startBtn.textContent = "Running";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
};

const pauseTimer = () => {
    if (!running) return;
    clearInterval(timerInterval);
    running = false;
    startBtn.textContent = "Start";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    lapCount = 0;
    timeDisplay.textContent = "00:00:00.00";
    lapsContainer.innerHTML = "";
    lapCountDisplay.textContent = "Total Laps: 0";
    startBtn.textContent = "Start";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;

    hourHand.style.transform = `rotate(0deg)`;
    minHand.style.transform = `rotate(0deg)`;
    secHand.style.transform = `rotate(0deg)`;
};

const recordLap = () => {
    if (!running) return;
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsContainer.prepend(lapElement);
    lapCountDisplay.textContent = `Total Laps: ${lapCount}`;
};

const updateTime = () => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);

    const totalSeconds = elapsedTime / 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    secHand.style.transform = `rotate(${seconds * 6}deg)`;
    minHand.style.transform = `rotate(${minutes * 6}deg)`;
    hourHand.style.transform = `rotate(${(hours % 12) * 30}deg)`;
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);


document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        running ? pauseTimer() : startTimer();
    } else if (e.key.toLowerCase() === "l") {
        recordLap();
    } else if (e.key.toLowerCase() === "r") {
        resetTimer();
    }
});
