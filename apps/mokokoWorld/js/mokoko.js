const mokoko = document.querySelector('.mokoko');

let isClicked= false; // 마우스 눌렸을 때 확인



function calPosition() {
  // 모코코가 위치해야할 곳을 계산
  let mokokoX = window.innerWidth / 2 - mokoko.offsetWidth / 2; // 창 절반에 모코코 크기 절반 빼주기 (좌측 기준이라)
  let mokokoY = window.innerHeight - 353.5; // 창 높이(바닥)에서 항상 눈만 보이게
  return { X: mokokoX, Y: mokokoY };
}


let offsetX = 0; // 클릭한 위치에서 모코코의 x좌표
let offsetY = 0; // 클릭한 위치에서 모코코의 y좌표

let pointerX = 0; // 마우스 클릭한 위치의 x좌표
let pointerY = 0; // 마우스 클릭한 위치의 y좌표


// 마우스 누르면
mokoko.addEventListener('pointerdown', (e) => {
  mokoko.classList.add('clicked'); // 눈커짐 스타일 추가
  isClicked = true; // 클릭 상태로 변경
  mokoko.style.transition = 'none'; // 드래그 중에는 부드러운 효과 제거

  // 모코코의 원래 위치 저장
  const rect = mokoko.getBoundingClientRect();
  offsetX = rect.left;
  offsetY = rect.top;

  // 클릭한 위치에서의 x, y 좌표 저장
  pointerX = e.clientX;
  pointerY = e.clientY;
});


window.addEventListener('pointermove', (e) => {
  if (isClicked) {
    // 마우스가 움직일 때 모코코 위치 업데이트
    let plusX = e.clientX - pointerX; // 이동한 위치에서 처음 클릭했던 위치만큼 빼서
    let plusY = e.clientY - pointerY;

    mokoko.style.left = `${offsetX + plusX}px`; // 모코코 위치에다 더해주기
    mokoko.style.top = `${offsetY + plusY}px`;
  }
} );


// 마우스 떼면 다시 원래대로
window.addEventListener('pointerup', () => {
  mokoko.classList.remove('clicked'); // 눈커짐 스타일 제거
  isClicked = false; // 클릭 상태 해제

  let { X, Y } = calPosition();
  mokoko.style.left = `${X}px`; // 모코코 원래 위치
  mokoko.style.top = `${Y}px`; // 모코코 원래 위치
  mokoko.style.transition = ''; // 원래의 부드러운 효과로 되돌리기

});

// 창 크기 조절되도 항상 모코코
window.addEventListener('resize', () => {
  let { X, Y } = calPosition();
  mokoko.style.left = `${X}px`; 
  mokoko.style.top = `${Y}px`;

});