const userIcon = document.getElementById('user-icon');
const loginBackground = document.getElementById('login-popup');
const loginForm = document.querySelector('.login-popup-content');

const levelInput = document.querySelector('.level-input');
const usernameInput = document.querySelector('.username-input');

const loginButton = document.querySelector('.login-button');
const closeBtn = document.querySelector('.close-btn');

const level = document.querySelector('.level');
const username = document.querySelector('.username');
const mokokoName = document.getElementById('mokoko-name');

userIcon.addEventListener('click', () => { // 모코코 아이콘 클릭 시 
  loginBackground.style.display = 'flex';
  loginForm.style.display = 'flex';

  // 투두 팝업 창 열려 있으면 닫기 (이벤트 리스너 효율을 위해 여기다..)
  document.getElementById('todo-popup').style.display = 'none';

});

closeBtn.addEventListener('click', () => { // 닫기 버튼
  loginBackground.style.display = 'none';
  loginForm.style.display = 'none';
});

loginButton.addEventListener('click', (event) => { // 로그인 버튼 클릭 시 (로 정했다!)
  event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)

  const levelValue = levelInput.value.trim(); // 레벨 입력값
  const usernameValue = usernameInput.value.trim(); // 이름 입력값

  if (!levelValue || isNaN(levelValue)) { // 레벨이 비어있거나 숫자가 아니면 거르기
    alert('레벨을 숫자로 입력해주세요.');
    return;
  }


  // 로컬스토리지에 저장
  localStorage.setItem('mokokoLevel', levelValue);
  localStorage.setItem('mokokoName', usernameValue);


  level.textContent = `Lv.${levelValue}`;
  username.textContent = usernameValue || '기본 모코코'; // 이름이 없으면 기본값

  loginBackground.style.display = 'none'; // 로그인 창 끄기
  loginForm.style.display = 'none';

  mokokoName.style.display = 'flex';
});


// 페이지 로드 시 저장된 로그인 정보 및 투두리스트 불러오기
window.addEventListener('load', () => {
  const savedLevel = localStorage.getItem('mokokoLevel');
  const savedName = localStorage.getItem('mokokoName');

  if (savedLevel) {
    level.textContent = `Lv.${savedLevel}`;
  }
  if (savedName) {
    username.textContent = savedName || '기본 모코코';
  }

  if (savedLevel || savedName) {
    mokokoName.style.display = 'flex';
  }
});