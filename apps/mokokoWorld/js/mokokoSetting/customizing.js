import { auth, db, collection, getDoc, setDoc, doc, onAuthStateChanged } from "../../../../JS/firebase_authentication.js";


// 모코코의 기본 색상 정의
const DEFAULT_BODY_COLOR = "#A1FE50";   // 연녹색
const DEFAULT_LEAF_COLOR = "#4F7E58";   // 짙은 초록
const DEFAULT_TONGUE_COLOR = "#E43E4B"; // 빨강
const DEFAULT_BASE_COLOR = "#000000"; // 검정


const bodyColorInput = document.getElementById("body-switch");
const leafColorInput = document.getElementById("leaf-switch");
const tongueColorInput = document.getElementById("tongue-switch");
const bodyBaseColorInput = document.getElementById("base-switch");


const userIcon = document.getElementById("user-icon");
const mokokoCustomizingSetting = document.getElementById("mokoko-customizing-overlay");


// 유저 아이콘 누르면 커마 정보 불러오기
userIcon.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("로그인 필요");
    return;
  }

  try {
    const docRef = doc(db, "users", user.uid, "mokoko", "customization");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // 각 입력창에 값 세팅
      bodyColorInput.value = data.bodyColor ?? DEFAULT_BODY_COLOR;
      leafColorInput.value = data.leafColor ?? DEFAULT_LEAF_COLOR;
      tongueColorInput.value = data.tongueColor ?? DEFAULT_TONGUE_COLOR;
      bodyBaseColorInput.value = data.baseColor ?? DEFAULT_BASE_COLOR;
      nameBox.value = data.mokokoName ?? "";
      titleBox.value = data.mokokoTitle ?? "";

      // SVG 색상도 같이 업데이트
      document.getElementById("mokoko-body").style.fill = bodyColorInput.value;
      document.getElementById("mokoko-leaf").style.fill = leafColorInput.value;
      document.getElementById("mokoko-tongue").style.fill = tongueColorInput.value;
      document.getElementById("mokoko-base").style.fill = bodyBaseColorInput.value;
      document.getElementById("mokoko-leftarmpit").style.fill = bodyBaseColorInput.value;
      document.getElementById("mokoko-rightarmpit").style.fill = bodyBaseColorInput.value;

    } else {
      // 저장된 데이터 없으면 기본값 세팅
      bodyColorInput.value = DEFAULT_BODY_COLOR;
      leafColorInput.value = DEFAULT_LEAF_COLOR;
      tongueColorInput.value = DEFAULT_TONGUE_COLOR;
      bodyBaseColorInput.value = DEFAULT_BASE_COLOR;
      nameBox.value = "";
      titleBox.value = "";
    }

    mokokoCustomizingSetting.classList.toggle("hidden");
  } catch (err) {
    console.error("불러오기 실패:", err);
  }
});


// 이벤트 리스너
bodyColorInput.addEventListener("input", () => {
  document.getElementById("mokoko-body").style.fill = bodyColorInput.value;
});

tongueColorInput.addEventListener("input", () => {
  document.getElementById("mokoko-tongue").style.fill = tongueColorInput.value;
});

leafColorInput.addEventListener("input", () => {
  document.getElementById("mokoko-leaf").style.fill = leafColorInput.value;
});

bodyBaseColorInput.addEventListener("input", () => {
  document.getElementById("mokoko-base").style.fill = bodyBaseColorInput.value;
  document.getElementById("mokoko-leftarmpit").style.fill = bodyBaseColorInput.value;
  document.getElementById("mokoko-rightarmpit").style.fill = bodyBaseColorInput.value;
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
    mokokoCustomizingSetting.classList.toggle("hidden");
  } catch (err) {
    console.error("저장 실패:", err);
  }
});



document.getElementById("customization-close").addEventListener("click", () =>{
  mokokoCustomizingSetting.classList.toggle("hidden");
});