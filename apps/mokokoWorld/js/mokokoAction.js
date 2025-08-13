import { auth, db, getDoc, doc, onAuthStateChanged} from "../../../JS/firebase_authentication.js";


// 모코코 바운더리 계산
import {rect} from "./auth.js";

// 모코코 메인 요소 선택
const mokoko = document.getElementById('mokoko-main');



// 마우스 눌렸을 때 확인
let isClicked= false; 



// 기본 색상
const DEFAULT_BODY_COLOR = "#A1FE50";   // 연녹색
const DEFAULT_LEAF_COLOR = "#4F7E58";   // 짙은 초록
const DEFAULT_TONGUE_COLOR = "#E43E4B"; // 빨강
const DEFAULT_BASE_COLOR = "#000000";   // 검정


function calPosition() {
  // 모코코가 위치해야할 곳을 계산
  let mokokoX = window.innerWidth / 2 - rect.width / 2; // 창 절반에 모코코 크기 절반 빼주기 (좌측 기준이라)
  let mokokoY = window.innerHeight - 353.5; // 창 높이(바닥)에서 항상 눈만 보이게

  return { X: mokokoX, Y: mokokoY };
}



// Firebase에서 사용자 커스터마이징 불러오기 함수
async function loadCustomization() {
  const user = auth.currentUser;
  if (!user) {
    console.warn("로그인 안 함 → 기본 색상 적용");
    return;
  }

    try {
    const docRef = doc(db, "users", user.uid, "mokoko", "customization");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      console.log(data);

      // SVG 색상 업데이트
      document.getElementById("mokoko-body").setAttribute("fill", data.bodyColor ?? DEFAULT_BODY_COLOR);
      document.getElementById("mokoko-leaf").setAttribute("fill", data.leafColor ?? DEFAULT_LEAF_COLOR);
      document.getElementById("mokoko-tongue").setAttribute("fill", data.tongueColor ?? DEFAULT_TONGUE_COLOR);
      document.getElementById("mokoko-base").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);
      document.getElementById("mokoko-leftarmpit").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);
      document.getElementById("mokoko-rightarmpit").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);

    } else {
      console.log("없는데요");
    }

  } catch (err) {
    console.error("서버에서 커마 불러오기 실패:", err);
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    loadCustomization();
    console.log("불러오기 성공");
  } else {
    console.warn("로그인 안 함 → 기본 색상 적용");
    // 로그인 안 했을 때 기본 색상 적용
  }
});

let offsetX = 0; // 클릭한 위치에서 모코코의 x좌표
let offsetY = 0; // 클릭한 위치에서 모코코의 y좌표

let pointerX = 0; // 마우스 클릭한 위치의 x좌표
let pointerY = 0; // 마우스 클릭한 위치의 y좌표


// 마우스 누르면
mokoko.addEventListener('pointerdown', (e) => {

  isClicked = true; // 클릭 상태로 변경
  
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

    mokoko.style.transition = 'none'; // 드래그 중에는 부드러운 효과 제거

    let plusX = e.clientX - pointerX; // 이동한 위치에서 처음 클릭했던 위치만큼 빼서
    let plusY = e.clientY - pointerY;

    mokoko.style.left = `${offsetX + plusX}px`; // 모코코 위치에다 더해주기
    mokoko.style.top = `${offsetY + plusY + 80}px`; // 잡기 전에 호버되니까 그거만큼 계산
  }
} );


// 마우스 떼면 다시 원래대로
// 윈도우에 거는 이유 -> 마우스 개빨리 움직이면 히트박스 벗어나버리는 경우가 있다
window.addEventListener('pointerup', () => {
  isClicked = false; // 클릭 상태 해제

  let { X, Y } = calPosition();
  mokoko.style.left = `${X}px`; // 모코코 원래 위치
  mokoko.style.top = `${Y}px`; // 모코코 원래 위치
  mokoko.style.transition = ''; // 원래의 부드러운 효과로 되돌리기
  
});



// 창 크기 조절되도 항상 모코코 위치 중앙
window.addEventListener('resize', () => {
  let { X, Y } = calPosition();
  mokoko.style.left = `${X}px`; 
  mokoko.style.top = `${Y}px`;

});