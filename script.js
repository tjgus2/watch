const batteryContainer = document.querySelector('#battery #container');
const timeDisplay = document.querySelector('#clocks #container:nth-of-type(1)');
const batteryInterval = 1000;
let batteryPercentage = 100;
let batteryTimer;

// FR1: 배터리 감소 기능
function startBatteryDischarge() {
    batteryTimer = setInterval(() => {
        if (batteryPercentage > 0) {
            batteryPercentage--;
            batteryContainer.textContent = `배터리: ${batteryPercentage}%`;
        }
        if (batteryPercentage <= 0) {
            clearInterval(batteryTimer);
            handleBatteryEmpty();
        }
    }, batteryInterval);
}

// FR2: 배터리가 0%가 되면 시계 화면 검은색으로 변경
function handleBatteryEmpty() {
    timeDisplay.style.backgroundColor = 'black';
}

// FR3: 시/분/초를 설정하고 알람을 추가하는 기능
const alarmDisplay = document.querySelector('#clocks #container:nth-of-type(2)');
let alarms = [];

document.querySelector('#add-alarm').addEventListener('click', function() {
    const hours = document.querySelector('#hours').value;
    const minutes = document.querySelector('#minutes').value;
    const seconds = document.querySelector('#seconds').value;
    
    if (alarms.length < 3) { 
        const alarmTime = `${hours}:${minutes}:${seconds}`;
        alarms.push(alarmTime);
        updateAlarms();
    } else {
        alert('최대 3개의 알람만 추가할 수 있습니다.');
    }
});

// FR4: 알람 현황 업데이트
function updateAlarms() {
    alarmDisplay.innerHTML = ''; 
    alarms.forEach((alarm, index) => {
        const alarmElement = document.createElement('p');
        alarmElement.textContent = `알람 ${index + 1}: ${alarm}`;
        alarmDisplay.appendChild(alarmElement);
    });
}

// 페이지가 로드될 때 배터리 감소 시작
window.onload = function() {
    startBatteryDischarge();
};
