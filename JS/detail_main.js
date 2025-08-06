const params = new URLSearchParams(window.location.search);
const storyId = parseInt(params.get("id")); 

const ARCHIVE_KEYS = "archives";
const savedStories = JSON.parse(localStorage.getItem(ARCHIVE_KEYS)) || [];

const story = savedStories.find(item => item.id === storyId);

const titleElement = document.querySelector("#detailTitle");
const textElement = document.querySelector("#detailText");
const dateElement = document.querySelector("#detailDate");

if (story) {
  // 기존 내용 렌더링
  titleElement.innerText = story.title;
  textElement.innerText = story.text;
  dateElement.innerText = `${story.date} 작성됨`;

  // 브라우저 탭 제목 변경
  document.title = `${story.title} | Realm Archive`;
} else {
  document.querySelector("#detailContainer").innerHTML = "<p>글을 찾을 수 없습니다.</p>";
  document.title = "글을 찾을 수 없습니다 | Realm Archive";
}

// 삭제 버튼
document.querySelector("#deleteButton").addEventListener("click", () => {
  const updatedStories = savedStories.filter(item => item.id !== storyId);
  localStorage.setItem(ARCHIVE_KEYS, JSON.stringify(updatedStories));
  alert("삭제되었습니다.");
  window.location.href = "index.html";
});

// 수정 버튼 (프롬프트 방식)
document.querySelector("#editButton").addEventListener("click", () => {
  const newTitle = prompt("새 제목 입력:", story.title);
  const newText = prompt("새 내용 입력:", story.text);

  if (newTitle && newText) {
    story.title = newTitle;
    story.text = newText;

    localStorage.setItem(ARCHIVE_KEYS, JSON.stringify(savedStories));
    titleElement.innerText = newTitle;
    textElement.innerText = newText;

    alert("수정되었습니다.");
  }
});
