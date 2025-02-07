let startTime, updateTime, interval;
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapTimes = document.getElementById('lapTimes');
const closeButton = document.getElementById('closeButton');
const openButton = document.getElementById('openButton');
const stopwatch = document.getElementById('stopwatch');
let isCloseButtonEnabled = false;

openButton.addEventListener('click', () => {
  stopwatch.style.display = 'block';
  openButton.style.display = 'none';
});

closeButton.addEventListener('click', () => {
  if (isClockZero()) closeStopwatch();
});

document.getElementById('startPauseButton').addEventListener('click', startPause);
document.getElementById('resetButton').addEventListener('click', reset);
document.getElementById('lapButton').addEventListener('click', lap);

closeButton.addEventListener('mousemove', event => {
  if (!isClockZero()) {
    let xOffset = Math.random() * 200 - 100;
    let yOffset = Math.random() * 200 - 100;
    const parentRect = closeButton.parentElement.getBoundingClientRect();
    const buttonRect = closeButton.getBoundingClientRect();

    xOffset = Math.max(xOffset, parentRect.left - buttonRect.left);
    xOffset = Math.min(xOffset, parentRect.right - buttonRect.right);
    yOffset = Math.max(yOffset, parentRect.top - buttonRect.top);
    yOffset = Math.min(yOffset, parentRect.bottom - buttonRect.bottom);

    closeButton.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    closeButton.style.transition = 'transform 0.3s ease';
  }
});

function isClockZero() {
  return ['00', '00', '00', '00'].every((val, index) => [hoursDisplay, minutesDisplay, secondsDisplay, millisecondsDisplay][index].textContent === val);
}

function startPause() {
  if (!interval) {
    startTime = Date.now() - (updateTime || 0);
    interval = setInterval(update, 10);
    document.getElementById('startPauseButton').textContent = 'Pause';
    isCloseButtonEnabled = false;
  } else {
    clearInterval(interval);
    interval = null;
    updateTime = Date.now() - startTime;
    document.getElementById('startPauseButton').textContent = 'Start';
  }
}

function reset() {
  clearInterval(interval);
  interval = null;
  updateTime = 0;
  [hoursDisplay, minutesDisplay, secondsDisplay, millisecondsDisplay].forEach(el => el.textContent = '00');
  lapTimes.innerHTML = '';
  document.getElementById('startPauseButton').textContent = 'Start';
  isCloseButtonEnabled = true;
  closeButton.style.transform = 'none';
}

function lap() {
  const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapTimes.appendChild(lapItem);
}

function update() {
  const timeElapsed = Date.now() - startTime;
  const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((timeElapsed / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((timeElapsed % 1000) / 10).toString().padStart(2, '0');
  hoursDisplay.textContent = hours;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
  millisecondsDisplay.textContent = milliseconds;
}

function closeStopwatch() {
  stopwatch.style.display = 'none';
  openButton.style.display = 'block';
}
