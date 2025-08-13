import { auth, db, doc, getDoc, setDoc } from "../../../../JS/firebase_authentication.js";

// 기본 색상
const DEFAULT_BODY_COLOR = "#A1FE50";
const DEFAULT_LEAF_COLOR = "#4F7E58";
const DEFAULT_TONGUE_COLOR = "#E43E4B";
const DEFAULT_BASE_COLOR = "#000000";

// DOM 요소
const mokoko = document.getElementById('mokoko-main');
const mokokoCustomizingOverlay = document.getElementById("mokoko-customizing-overlay");
const mokokoPreview = document.getElementById("mokoko-preview");
const userIcon = document.getElementById("user-icon");

// SVG 파츠
const svgParts = {
  body: document.getElementById("mokoko-body"),
  leaf: document.getElementById("mokoko-leaf"),
  tongue: document.getElementById("mokoko-tongue"),
  base: [document.getElementById("mokoko-base"), 
         document.getElementById("mokoko-leftarmpit"), 
         document.getElementById("mokoko-rightarmpit")]
};

// 입력창
const inputs = {
  body: document.getElementById("body-switch"),
  leaf: document.getElementById("leaf-switch"),
  tongue: document.getElementById("tongue-switch"),
  base: document.getElementById("base-switch"),
  name: document.getElementById("mokoko-name-input"),
  title: document.getElementById("mokoko-title-input")
};

// 버튼
const submitBtn = document.getElementById("custom-save-button");
const closeBtn = document.getElementById("customization-close");

// 상태
let savedCustomizationData = null;
let isPopupVisible = false;

// SVG 색상 실시간 반영
Object.entries(inputs).forEach(([key, input]) => {
  if (["body", "leaf", "tongue"].includes(key)) {
    input.addEventListener("input", () => svgParts[key].setAttribute("fill", input.value));
  } else if (key === "base") {
    input.addEventListener("input", () => {
      svgParts.base.forEach(el => el.setAttribute("fill", input.value));
    });
  }
});

// 애니메이션 함수
function mokokoSlideUp() {
  setTimeout(() => {
    mokoko.classList.remove("slide-down-mk");
    void mokoko.offsetWidth;
    mokoko.classList.add("slide-up-mk");
  }, 250);
  mokoko.addEventListener("animationend", () => mokoko.classList.remove("slide-up-mk"), { once: true });
}

// 팝업 열리면 하는거
function openPopup() {
  mokokoCustomizingOverlay.classList.remove("hidden");
  mokokoPreview.style.visibility = "hidden";
  mokokoPreview.classList.remove("slide-up-mk");
  void mokokoPreview.offsetWidth;
  setTimeout(() => {
    mokokoPreview.style.visibility = "visible";
    mokokoPreview.classList.add("slide-up-mk");
  }, 50);
  isPopupVisible = true;
}

function closePopup(restoreColors = true) {
  mokokoPreview.classList.add("slide-down-fast-mk");
  mokokoSlideUp();
  setTimeout(() => {
    mokokoCustomizingOverlay.classList.add("hidden");
    mokokoPreview.classList.remove("slide-down-fast-mk");
    if (restoreColors && savedCustomizationData) {
      svgParts.body.setAttribute("fill", savedCustomizationData.bodyColor ?? DEFAULT_BODY_COLOR);
      svgParts.leaf.setAttribute("fill", savedCustomizationData.leafColor ?? DEFAULT_LEAF_COLOR);
      svgParts.tongue.setAttribute("fill", savedCustomizationData.tongueColor ?? DEFAULT_TONGUE_COLOR);
      svgParts.base.forEach(el => el.setAttribute("fill", savedCustomizationData.baseColor ?? DEFAULT_BASE_COLOR));
      inputs.name.value = savedCustomizationData.mokokoName ?? "";
      inputs.title.value = savedCustomizationData.mokokoTitle ?? "";
    }
  }, 300);
  isPopupVisible = false;
}

// 유저 아이콘 클릭
userIcon.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return console.error("로그인 필요");

  if (!isPopupVisible) {
    // 열 때 메인 모코코 슬라이드 다운
    mokoko.classList.remove("slide-up-mk");
    void mokoko.offsetWidth; // 리플로우 강제
    mokoko.classList.add("slide-down-mk");

    try {
      const docSnap = await getDoc(doc(db, "users", user.uid, "mokoko", "customization"));
      savedCustomizationData = docSnap.exists() ? docSnap.data() : null;

      const data = savedCustomizationData || {};
      inputs.body.value = data.bodyColor ?? DEFAULT_BODY_COLOR;
      inputs.leaf.value = data.leafColor ?? DEFAULT_LEAF_COLOR;
      inputs.tongue.value = data.tongueColor ?? DEFAULT_TONGUE_COLOR;
      inputs.base.value = data.baseColor ?? DEFAULT_BASE_COLOR;
      inputs.name.value = data.mokokoName ?? "";
      inputs.title.value = data.mokokoTitle ?? "";

      svgParts.body.setAttribute("fill", inputs.body.value);
      svgParts.leaf.setAttribute("fill", inputs.leaf.value);
      svgParts.tongue.setAttribute("fill", inputs.tongue.value);
      svgParts.base.forEach(el => el.setAttribute("fill", inputs.base.value));

      openPopup();
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  } else {
    closePopup(false);
  }
});


// submit 버튼 클릭
submitBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return console.error("로그인 필요");

  const customizationData = {
    bodyColor: inputs.body.value,
    leafColor: inputs.leaf.value,
    tongueColor: inputs.tongue.value,
    baseColor: inputs.base.value,
    mokokoName: inputs.name.value,
    mokokoTitle: inputs.title.value,
    createdAt: new Date()
  };

  try {
    // 1️⃣ 기존 저장
    await setDoc(doc(db, "users", user.uid, "mokoko", "customization"), customizationData);

    // 2️⃣ 공개 컬렉션에도 저장
    await setDoc(doc(db, "mokoko-public", user.uid), customizationData);

    savedCustomizationData = customizationData;
    console.log("커스터마이징 저장 완료 (개인 + 공개)");
  } catch (err) {
    console.error("저장 실패:", err);
  }

  closePopup(false);
});


// 닫기 버튼 클릭
closeBtn.addEventListener("click", () => closePopup());
