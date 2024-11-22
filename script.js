const batteryContainer = document.getElementById('battery-container');
const timeDisplay = document.getElementById('time-container');
const alarmDisplay = document.getElementById('alarm-container');
const batteryInterval = 1000;
let batteryPercentage = 100;
let batteryTimer;
let alarms = [];

// 배터리 감소 기능
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

// 배터리가 0%가 되면 화면 검은색으로 변경
function handleBatteryEmpty() {
    timeDisplay.style.backgroundColor = 'black';
}

// 현재 시간을 업데이트하는 함수
function updateTime() {
    const now = new Date();

    // 연도, 월, 일, 시, 분, 초 가져오기
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // yyyy-mm-dd hh:mm:ss 형식으로 포맷
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // 화면에 시간 표시
    document.getElementById('current-time').textContent = formattedTime;
}

// 알람 추가 버튼 이벤트
document.getElementById('add-alarm').addEventListener('click', function () {
    const hours = parseInt(document.getElementById('hours').value, 10);
    const minutes = parseInt(document.getElementById('minutes').value, 10);
    const seconds = parseInt(document.getElementById('seconds').value, 10);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (!isValidTime(hours, minutes, seconds)) {
        alert('유효한 시간을 입력하세요.');
        return;
    }

    const alarmTime = `${hours}:${minutes}:${seconds}`;
    if (alarms.includes(alarmTime)) {
        alert('중복된 알람입니다.');
        return;
    }

    if (alarms.length < 3) {
        alarms.push(alarmTime);
        updateAlarms();
    } else {
        alert('최대 3개의 알람만 추가할 수 있습니다.');
    }
});

// 유효한 시간인지 검증하는 함수
function isValidTime(hours, minutes, seconds) {
    return (
        hours >= 0 && hours < 24 &&
        minutes >= 0 && minutes < 60 &&
        seconds >= 0 && seconds < 60
    );
}

// 알람 현황 업데이트
function updateAlarms() {
    alarmDisplay.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const alarmElement = document.createElement('p');
        alarmElement.textContent = `알람 ${index + 1}: ${alarm}`;
        alarmDisplay.appendChild(alarmElement);
    });
}

// 실시간 업데이트 및 배터리 감소 시작
window.onload = function () {
    updateTime();
    setInterval(updateTime, 1000);
    startBatteryDischarge();
};
