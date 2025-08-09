import { db, auth, doc, getDocs, deleteDoc, collection, onAuthStateChanged } from "./firebase_authentication.js";

// 관리자 uid - 효빈, 준호
const admin_uids= ["4lVWdflkfPQpurDgCXiNjvEHdOU2", "aMMhukeqKGd2JnjvSA1P3HFRgzf1"];

function renderDetails(story) {
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
}

async function getItemFromDB(stories) {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => stories.push({
      firestoreID : doc.id, 
      ...doc.data()
  }));

  return stories;
}

function deleteStory(storyID, story, currentUser) {
  const deleteBtn = document.querySelector("#deleteButton");
  if(currentUser.uid === story.uid || admin_uids.includes(currentUser.uid)) {
    deleteBtn.classList.remove("hidden");
  }

  deleteBtn.addEventListener("click", async () => {
    const deleteRef = doc(db, "posts", storyID);
    await deleteDoc(deleteRef);
    console.log("게시글 삭제 완료");
    if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
      // 로컬 개발 환경 (Live Server)
      window.location.href = "./index.html";
    } else {
      // GitHub Pages 배포 환경일 때
      window.location.href = "https://novice-dev-robin.github.io/RealmArchive/index.html";
    }
  });
}


getItemFromDB([]).then(stories => {
  // URL에서 id 찾는 함수
  const params = new URLSearchParams(window.location.search);
  // params.get("id") -> id를 문자열로
  const storyID = params.get("id");
  const story = stories.find(item => item.firestoreID === storyID);
  renderDetails(story);

  onAuthStateChanged(auth, (user) => {
    if(user) {
      const user = auth.currentUser;
      deleteStory(storyID, story, user);
    }
    else {
      console.log("비로그인 상태");
    }
  });
});