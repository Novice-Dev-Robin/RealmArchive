// popup.js
export function createPopup({ id, title, contentHTML }) {
  // 이미 존재하면 생성하지 않음
  if (document.getElementById(id)) return document.getElementById(id);

  const overlay = document.createElement('div');
  overlay.id = id;
  overlay.classList.add('popup-overlay');

  const popup = document.createElement('div');
  popup.classList.add('popup-box');

  // 닫기 버튼
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => overlay.remove());

  // 제목
  const titleElem = document.createElement('h2');
  titleElem.textContent = title;

  // 내용
  const content = document.createElement('div');
  content.classList.add('popup-content');
  content.innerHTML = contentHTML || '';

  popup.appendChild(closeBtn);
  if (title) popup.appendChild(titleElem);
  popup.appendChild(content);
  overlay.appendChild(popup);

  document.body.appendChild(overlay);

  return overlay; // ✅ popupRoot 반환
}
