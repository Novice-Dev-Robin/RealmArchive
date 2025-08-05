// https://github.com/Novice-Dev-Robin/RealmArchive.git

const storyForm = document.querySelector("#story-form"); // form에 eventListener 추가
const title_text = document.querySelector("#titleInput"); // 제목 입력 창
const textarea = document.querySelector("#bodyInput"); // 30 * 10 크기의 텍스트 입력 창

const container = document.querySelector("#archiveContainer"); // HTML에 글을 표현할 div 저장소

let storyArray = []; // 글 객체를 저장할 배열
const ARCHIVE_KEYS = "archives"; // string 고정 - 타이핑 실수하지 않게 


function renderTitleCards(story_Obj) { // 작성된 글 클릭 시 새 창 - detail.html로 연결
  const card = document.createElement("div");
  card.className = "bg-white cursor-pointer p-4 border border-gray-300 rounded shadow hover:shadow-lg transition";

  const titleElement = document.createElement("h3");
  titleElement.innerText = story_Obj.title;
  titleElement.className = "text-lg font-semibold text-black-600";

  const dateElement = document.createElement("span");
  dateElement.textContent = story_Obj.date;
  dateElement.style.fontSize = "12px";
  dateElement.style.color = "grey";
  
  card.appendChild(titleElement);
  card.appendChild(dateElement);

  // 클릭 시 detail.html로 이동
  card.addEventListener("click", () => {
    window.location.href = `detail.html?id=${story_Obj.id}`;
  });

  container.appendChild(card);
}

// ------------------------------ 글 저장 및 삭제 ------------------------------
function saveStories() { // 글 저장
    localStorage.setItem(ARCHIVE_KEYS, JSON.stringify(storyArray));
}

function deleteStory(event) {
    const target = event.target.parentElement;
    const targetID = parseInt(target.id);
    target.remove(); // div 제거
    storyArray = storyArray.filter((story) => story.id !== targetID); // 배열을 필터링해서 targetID가 아닌 것만 남게끔
    saveStories();
}

// ------------------------------ 게시글 추가 ---------------------------------
function onInputSubmit(event) { // form에 event 켜지면 실행
    event.preventDefault();

    const title = title_text.value;
    title_text.value = "";
    const text = textarea.value;
    textarea.value = "";

    const story_Obj = {
        id : Date.now(), // 고유 ID - 현재 날짜로 설정
        title : title, // 제목
        text : text, // 본문
        date : formatForDisplay(dateString.date), // 현재 날짜
        likes : 0, // 좋아요 수
        comments : [] // 댓글 배열 - 객체를 push
    };

    if(title !== "" && text !== "") { // 공란 걸러내기
        storyArray.push(story_Obj);
        renderTitleCards(story_Obj);
        saveStories();
    }
}

storyForm.addEventListener("submit", onInputSubmit); // 게시글 추가 이벤트

// --------------------------------------- 정렬 과정 -------------------------------------------------
const sortSelect = document.querySelector("#sortSelect"); // 정렬
function RENDER_STORIES_BY_DATE(order) {
    container.innerText = ""; // 기존 글 제거
    
    const sortedArray = storyArray; // 원본 배열 복사
    sortedArray.sort((a,b) => {
            if(order === "newest") { // 최신순
                return new Date(b.date) - new Date(a.date);
            }
            else { // 오래된순
                return new Date(a.date) - new Date(b.date);
            }
        }
    );    
    sortedArray.forEach(renderTitleCards);
}
sortSelect.addEventListener("change", (event) => {
    RENDER_STORIES_BY_DATE(event.target.value); // 
});

// --------------------------------------- localStorage에 저장 -------------------------------------------------
const savedStories = localStorage.getItem(ARCHIVE_KEYS); // Archive에 저장
if(savedStories != null) {
    const parsedSavedStories = JSON.parse(savedStories);
    storyArray = parsedSavedStories; // storyArray에 임시 저장

    parsedSavedStories.sort((a,b) => new Date(b.date) - new Date(a.date));
    parsedSavedStories.forEach(renderTitleCards); // HTML에 표현
}