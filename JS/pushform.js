import { dateString, formatForDisplay } from "./date.js"; // 날짜 변환 함수 및 변수 import
import { db, auth, addDoc, getDocs, collection, onAuthStateChanged } from "./firebase_authentication.js";
import { storage, ref, uploadBytes, getDownloadURL} from "./firebase_authentication.js";

const storyForm = document.querySelector("#story-form"); // form에 eventListener 추가
const title_text = document.querySelector("#titleInput"); // 제목 입력 창
const textarea = document.querySelector("#bodyInput"); // 30 * 10 크기의 텍스트 입력 창
const container = document.querySelector("#archiveContainer"); // HTML에 글을 표현할 div 저장소

// 카드 하나 만드는 함수 (동기 함수로 변경)
function createCardElement(story) { // 작성된 글 클릭 시 새 창 - detail.html로 연결
    const card = document.createElement("div");
    card.className = "bg-white cursor-pointer p-4 border border-gray-300 rounded-xl shadow hover:shadow-lg transition";

    const titleElement = document.createElement("h3");
    titleElement.innerText = story.title;
    titleElement.className = "text-lg font-semibold text-black-600";

    const dateElement = document.createElement("span");
    dateElement.textContent = story.date;
    dateElement.style.fontSize = "12px";
    dateElement.style.color = "grey";
    
    card.appendChild(titleElement);
    card.appendChild(dateElement);

    if (story.imageURL) {
        const img = document.createElement("img");
        img.src = story.imageURL;
        img.alt = "게시글 이미지";
        img.className = "mt-2 max-w-full rounded-md shadow-md"; // Tailwind 스타일 예시
        card.appendChild(img);
    }

    // 클릭 시 detail.html로 이동
    card.addEventListener("click", () => {
        // Firebase 문서 고유 키 사용
        window.location.href = `detail.html?id=${story.firestoreID}`;
    });

    return card;
}

// 배열에서 렌더링하는 함수 - 정렬 후
function render_after_sorting(stories) {
    container.innerText = "";
    const fragment = document.createDocumentFragment();

    stories.forEach(story => {
        const card = createCardElement(story);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// 여러 문서 받아서 한꺼번에 렌더링하는 함수
async function renderAllStories() {
    container.innerText = ""; // 기존 내용 초기화

    const querySnapshot = await getDocs(collection(db, "posts"));
    const fragment = document.createDocumentFragment();

    querySnapshot.forEach(doc => {
    const story = {
      firestoreID: doc.id,
      ...doc.data()
    };

    const card = createCardElement(story);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// 이미지 처리
const imageInput = document.querySelector("#imageInput");

// ------------------------- 게시글 추가 + 이미지 처리 -----------------------------
async function onInputSubmit(event) { // form에 event 켜지면 실행
    event.preventDefault();

    onAuthStateChanged(auth, async (user) => {
        if(user) {
            const title = title_text.value; // 제목
            title_text.value = "";
            const text = textarea.value; // 본문
            textarea.value = "";

            let imageURL = null;

            if (imageInput.files.length > 0) {
                const file = imageInput.files[0];
                const storageRef = ref(storage, `images/${user.uid}_${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                imageURL = await getDownloadURL(storageRef);

                console.log("업로드할 파일:", file);
            }

            if(title !== "" && text !== "") { // 공란 걸러내기
                const collection_posts = collection(db, "posts"); // 컬렉션 경로
                const newStory = await addDoc(collection_posts, {
                    id : Date.now(), // 글 고유 ID - 현재 날짜로 설정
                    uid: user.uid, // 현재 로그인한 사용자 UID 추가
                    title : title, // 제목
                    text : text, // 본문
                    date : formatForDisplay(dateString.date), // 현재 날짜
                    likes : 0, // 좋아요 수
                    imageURL : imageURL
                });
                renderAllStories();
                console.log("auth.currentUser:", auth.currentUser);
                console.log(`✅ 게시글 ${newStory.id} 저장 완료`);
            }
        }
        else {
            alert("로그인 후 이용해주세요");
        }
    });
}

storyForm.addEventListener("submit", onInputSubmit); // 게시글 추가 이벤트

// --------------------------------------- 정렬 과정 -------------------------------------------------
const sortSelect = document.querySelector("#sortSelect"); // 정렬
async function RENDER_STORIES_BY_DATE(order) {
    container.innerText = ""; // 기존 글 제거
    const querySnapshot = await getDocs(collection(db, "posts"));
    const stories = [];

    querySnapshot.forEach((doc) => stories.push({
        firestoreID : doc.id, 
        ...doc.data()
    }));
    stories.sort((a,b) => { // 미완
            if(order === "newest") { // 최신순
                return b.id - a.id;
            }
            else { // 오래된순
                return a.id - b.id;
            }
        }
    );    
    render_after_sorting(stories);
}
sortSelect.addEventListener("change", (event) => {
    RENDER_STORIES_BY_DATE(event.target.value); // 
});

window.addEventListener("load", () => {
    RENDER_STORIES_BY_DATE("newest"); // 기본 정렬로 렌더링
});


export { storyForm };