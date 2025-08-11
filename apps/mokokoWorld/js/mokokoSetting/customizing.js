import { auth, db, collection, getDoc, setDoc, doc, onAuthStateChanged } from "../../../../JS/firebase_authentication.js";

// 모코코 메인화면거 요소 가져오기
const mokoko = document.getElementById('mokoko-main');

// 모코코의 기본 색상 정의
const DEFAULT_BODY_COLOR = "#A1FE50";   // 연녹색
const DEFAULT_LEAF_COLOR = "#4F7E58";   // 짙은 초록
const DEFAULT_TONGUE_COLOR = "#E43E4B"; // 빨강
const DEFAULT_BASE_COLOR = "#000000"; // 검정

// 서버 데이터 변수
let savedCustomizationData = null;  // 전역 변수처럼 저장 공간 만들기


// 모코코 svg 파츠 가져오기
const mokokoBody = document.getElementById("mokoko-body");
const mokokoTongue = document.getElementById("mokoko-tongue");
const mokokoLeaf = document.getElementById("mokoko-leaf");
const mokokoBase = document.getElementById("mokoko-base");
const mokokoLeftArmpit = document.getElementById("mokoko-leftarmpit");
const mokokoRightArmpit = document.getElementById("mokoko-rightarmpit");



// 색상 picker 요소 선택
const bodyColorInput = document.getElementById("body-switch");
const leafColorInput = document.getElementById("leaf-switch");
const tongueColorInput = document.getElementById("tongue-switch");
const bodyBaseColorInput = document.getElementById("base-switch");


// picker 입력에 따른 실시간 svg 색상 변경
bodyColorInput.addEventListener("input", () => {
  mokokoBody.setAttribute("fill", bodyColorInput.value);
});

tongueColorInput.addEventListener("input", () => {
  mokokoTongue.setAttribute("fill", tongueColorInput.value);
});

leafColorInput.addEventListener("input", () => {
  mokokoLeaf.setAttribute("fill", leafColorInput.value);
});

bodyBaseColorInput.addEventListener("input", () => {
  mokokoBase.setAttribute("fill", bodyBaseColorInput.value);
  mokokoLeftArmpit.setAttribute("fill", bodyBaseColorInput.value);
  mokokoRightArmpit.setAttribute("fill", bodyBaseColorInput.value);
});



const userIcon = document.getElementById("user-icon");
const mokokoCustomizingSetting = document.getElementById("mokoko-customizing-overlay");
const mokokoPreview = document.getElementById("mokoko-preview");


function mokokoMainSlideUp(){
  setTimeout(()=>{
    mokoko.classList.remove("slide-down-mk");
    mokoko.classList.remove("slide-up-mk");
    void mokoko.offsetWidth; // 리플로우 강제 발생
    mokoko.classList.add("slide-up-mk");
  }, 100);
}




// 유저 아이콘 누르면 커마 정보 불러오기
userIcon.addEventListener("click", async () => {

  mokoko.classList.add("slide-down-mk");

  const user = auth.currentUser;
  if (!user) {
    console.error("로그인 필요");
    return;
  }

  try {
    const docRef = doc(db, "users", user.uid, "mokoko", "customization");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      savedCustomizationData = docSnap.data();  // 여기 저장

      // 각 입력창에 값 세팅
      bodyColorInput.value = savedCustomizationData.bodyColor ?? DEFAULT_BODY_COLOR;
      leafColorInput.value = savedCustomizationData.leafColor ?? DEFAULT_LEAF_COLOR;
      tongueColorInput.value = savedCustomizationData.tongueColor ?? DEFAULT_TONGUE_COLOR;
      bodyBaseColorInput.value = savedCustomizationData.baseColor ?? DEFAULT_BASE_COLOR;
      nameBox.value = savedCustomizationData.mokokoName ?? "";
      titleBox.value = savedCustomizationData.mokokoTitle ?? "";


    } else {
      // 저장된 데이터 없으면 기본값 세팅
      bodyColorInput.value = DEFAULT_BODY_COLOR;
      leafColorInput.value = DEFAULT_LEAF_COLOR;
      tongueColorInput.value = DEFAULT_TONGUE_COLOR;
      bodyBaseColorInput.value = DEFAULT_BASE_COLOR;
      nameBox.value = "";
      titleBox.value = "";
    }

    mokokoCustomizingSetting.classList.toggle("hidden"); // 팝업 히든 클래스 토글
    mokokoPreview.style.visibility = "hidden";   // 숨기기

    // 만약 slide-up 클래스가 있으면 제거 (재실행 위해)
    mokokoPreview.classList.remove("slide-up-mk");

    // 강제 리플로우(렌더링 강제 갱신)
    void mokokoPreview.offsetWidth;

    setTimeout(() => {
      mokokoPreview.style.visibility = "visible"; // 보이게 하고
      mokokoPreview.classList.add("slide-up-mk");    // 애니메이션 클래스 추가
    }, 500);


  } catch (err) {
    console.error("불러오기 실패:", err);
  }
});



const nameBox = document.getElementById("mokoko-name-input");
const titleBox = document.getElementById('mokoko-title-input');
const submitBtn = document.getElementById("custom-save-button");


// submit 버튼 클릭 이벤트 리스너
submitBtn.addEventListener("click", async () => {


  const customizationData = {
    bodyColor: bodyColorInput.value,
    leafColor: leafColorInput.value,
    tongueColor: tongueColorInput.value,
    baseColor: bodyBaseColorInput.value,
    mokokoName: nameBox.value,
    mokokoTitle: titleBox.value,
    createdAt: new Date(),
  };

  const user = auth.currentUser;
  if (!user) {
    console.error("로그인도 안 했는데 어캐했누");
    return;
  }

  try {
    const docRef = doc(db, "users", user.uid, "mokoko", "customization");
    await setDoc(docRef, customizationData);

    console.log("커스터마이징 저장 완료");
  } catch (err) {
    console.error("저장 실패:", err);
  }

  mokokoPreview.classList.add("slide-down-fast-mk");

  setTimeout(() => { // 0.3초 후 실행
    mokokoCustomizingSetting.classList.toggle("hidden");
    mokokoPreview.classList.remove("slide-down-fast-mk"); // 클래스도 빼주기 -> 다음에 또 쓸 수 있게
  }, 300);

  mokokoMainSlideUp();
});


document.getElementById("customization-close").addEventListener("click", () => {


  mokokoPreview.classList.add("slide-down-fast-mk");

  setTimeout(() => { // 0.3초 후 실행
    mokokoCustomizingSetting.classList.toggle("hidden");
    mokokoPreview.classList.remove("slide-down-fast-mk"); // 클래스도 빼주기 -> 다음에 또 쓸 수 있게

    // 닫으면 저장 안하고 색 다시 원래대로 돌리기
    mokokoBody.setAttribute("fill", savedCustomizationData.bodyColor);
    mokokoTongue.setAttribute("fill", savedCustomizationData.tongueColor);
    mokokoLeaf.setAttribute("fill", savedCustomizationData.leafColor);
    mokokoBase.setAttribute("fill", savedCustomizationData.baseColor);
    mokokoLeftArmpit.setAttribute("fill", savedCustomizationData.baseColor);
    mokokoRightArmpit.setAttribute("fill", savedCustomizationData.baseColor);
  }, 300);

  mokokoMainSlideUp();
});

// 25-08-12 01:06