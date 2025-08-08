document.getElementById("custom-save-button").addEventListener("click", () => {
  document.getElementById("body-color").style.filter = `hue-rotate(${getHue(bodyColor.value)}deg)`;
  document.getElementById("leaf-color").style.filter = `hue-rotate(${getHue(leafColor.value)}deg)`;
  document.getElementById("tongue-color").style.filter = `hue-rotate(${getHue(tongueColor.value)}deg)`;

  const name = document.getElementById("mokoko-name-input").value;
  if (name.trim()) {
    document.querySelector("#mokoko-name .username").textContent = name;
  }
});

function getHue(hex) {
  // 단순화 버전: HSV에서 hue를 근사 추출
  // 진짜로 색상 정확히 바꾸려면 canvas 써야 함
  // 여기선 예시로 hue만 단순 추출
  const r = parseInt(hex.substr(1,2), 16);
  const g = parseInt(hex.substr(3,2), 16);
  const b = parseInt(hex.substr(5,2), 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;

  if (max === min) hue = 0;
  else if (max === r) hue = (60 * ((g - b) / (max - min)) + 360) % 360;
  else if (max === g) hue = (60 * ((b - r) / (max - min)) + 120) % 360;
  else hue = (60 * ((r - g) / (max - min)) + 240) % 360;

  return hue;
}
