const userIcon = document.getElementById("user-icon");
const mokokoCustomizingSetting = document.getElementById("mokoko-customizing-overlay");

userIcon.addEventListener("click", () =>{
  console.log("click");
  mokokoCustomizingSetting.classList.toggle("hidden");
});



const bodyColorInput = document.getElementById("body-switch");
const leafColorInput = document.getElementById("leaf-switch");
const tongueColorInput = document.getElementById("tongue-switch");
const bodyBaseColorInput = document.getElementById("base-switch");
const eyeColorInput = document.getElementById("lefteye-switch");
const mouthColorInput = document.getElementById("mouth-switch");

// 모코코의 기본 색상 정의
const DEFAULT_BODY_COLOR = "#A1FE50";   // 연녹색
const DEFAULT_LEAF_COLOR = "#4F7E58";   // 짙은 초록
const DEFAULT_TONGUE_COLOR = "#E43E4B"; // 빨강
const DEFAULT_BASE_COLOR = "#000000"; // 검정
const DEFAULT_EYE_COLOR = "#4E3919" // 갈

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
const submitBtn = document.getElementById("custom-save-button");

// submit 버튼 클릭 이벤트 리스너
submitBtn.addEventListener("click", () => {
  
  const customizationData = {
    bodyColor: bodyColorInput.value,
    leafColor: leafColorInput.value,
    tongueColor: tongueColorInput.value,
    baseColor: bodyBaseColorInput.value,
    mokokoName: nameBox.value,
  };

  console.log(customizationData);



  // 추가적으로 이름을 저장하거나 알림 띄우기 가능
  console.log("저장된 이름:", customizationData.mokokoName);
});
