const time = document.getElementById("time");
const date = document.getElementById("date");

function updateTime() {
  const now = new Date();

  date.innerText = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  }).replace(/\. /g, '.').replace(/\.$/, ''); // 공백 및 마지막 점 제거

  const hours = String(now.getHours()).padStart(2, '0'); // 2자리로 맞추기
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  time.innerText = `${hours}:${minutes}:${seconds}`;
}

// 1초마다 시간 업데이트
setInterval(updateTime, 1000);
updateTime(); // 초기 시간 설정