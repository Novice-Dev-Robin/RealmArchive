import { getDoc, setDoc, updateDoc, doc, collection, increment, onAuthStateChanged, onSnapshot } from "./firebase_authentication.js";
import { getItemFromDB } from "./detail_main.js";
import { formatForDisplay } from "./date.js";

// 좋아요 기능 함수
async function storingLike(story) {
  const likeCountElem = document.getElementById("likeCount");
  const likeButton = document.getElementById("likeButton");

  likeCountElem.innerText = story.likes || 0;

  likeButton.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    const likeDocRef = doc(db, "posts", story.firestoreID, "likes", user.uid);
    const likeDocSnap = await getDoc(likeDocRef);

    if (likeDocSnap.exists()) {
      alert("이미 개추 눌렀자너.");
      return;
    }

    try {
      // 좋아요 수 증가
      const postRef = doc(db, "posts", story.firestoreID);
      await updateDoc(postRef, {
        likes: increment(1)
      });

      // 좋아요 기록 저장
      await setDoc(likeDocRef, {
        likedAt: new Date()
      });

      // 화면에 반영
      story.likes = (story.likes || 0) + 1;
      likeCountElem.innerText = story.likes;

      console.log("✅ 좋아요 증가 및 기록 완료");
    } catch (e) {
      console.error("좋아요 처리 실패:", e);
    }
  });
}

// 댓글 렌더링 함수
function renderComments(story) {
  const commentRef = collection(db, "posts", story.firestoreID, "comments");
  onSnapshot(commentRef, (snapshot) => {
    const list = document.getElementById("comment-list");
    list.innerHTML = "";
    snapshot.forEach((docsnap) => {
      const comment = docsnap.data();
      const li = document.createElement("li");
      li.innerText = `${comment.username}: ${comment.text} ${comment.timestamp}`;
      list.appendChild(li);
    });
  });
}


// 댓글 작성 함수
function writingComments(story, user) {
  document.getElementById("commentSubmit").addEventListener("click", async () => {
    const commentInput = document.getElementById("commentInput");
    const commentRef = doc(db, "posts", story.firestoreID, "comments", commentInput.value);
    const doc_com_Snap = await getDoc(commentRef);

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data();
    if(!doc_com_Snap.exists()) {
        await setDoc(commentRef, {
            id: Date.now(),
            text: commentInput.value,
            timestamp: formatForDisplay(new Date().toISOString()),
            username: userData.name,
            uid : user.uid
        });
        console.log(`↳ 댓글 저장됨: ${commentInput.value}`);
        commentInput.value = "";
    }
    else {
        console.log("댓글이 이미 존재합니다. 중복 저장하지 않음.");
    }
  });
}

// 메인 메소드
getItemFromDB([]).then(stories => {
  const params = new URLSearchParams(window.location.search);
  const storyID = params.get("id");
  const story = stories.find(item => item.firestoreID === storyID);

  storingLike(story);
  onAuthStateChanged(auth, (user) => {
    if(user) {
      const user = auth.currentUser;
      writingComments(story, user);
    }
    else {
      alert("로그인해야 개추 및 댓글 가능.");
    }
  });
  renderComments(story);
});
