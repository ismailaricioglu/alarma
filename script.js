// script.js

let alarmTimeout;

const alarmTimeInput = document.getElementById("alarm-time");
const alarmLabelInput = document.getElementById("alarm-label");
const setAlarmButton = document.getElementById("set-alarm");
const clearAlarmButton = document.getElementById("clear-alarm");
const alarmStatus = document.getElementById("alarm-status");
const alarmAudio = document.getElementById("alarm-audio");

function setAlarm() {
  const timeValue = alarmTimeInput.value;
  if (!timeValue) {
    alert("Lütfen geçerli bir saat girin.");
    return;
  }

  const [hour, minute] = timeValue.split(":").map(Number);
  const now = new Date();
  const alarmTime = new Date();
  alarmTime.setHours(hour);
  alarmTime.setMinutes(minute);
  alarmTime.setSeconds(0);

  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const timeToAlarm = alarmTime - now;
  const label = alarmLabelInput.value || "Alarm";

  alarmTimeout = setTimeout(() => {
    alarmAudio.play();
    alert(label);
    alarmStatus.textContent = "Alarm çaldı: " + label;
  }, timeToAlarm);

  alarmStatus.textContent = `Alarm kuruldu: ${alarmTime.toLocaleTimeString()}`;
}

function clearAlarm() {
  clearTimeout(alarmTimeout);
  alarmStatus.textContent = "Alarm iptal edildi.";
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
}

setAlarmButton.addEventListener("click", setAlarm);
clearAlarmButton.addEventListener("click", clearAlarm);
