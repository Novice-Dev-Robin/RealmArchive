import { updateDoc, doc, increment } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("likeCount").innerText = story.likes || 0;

// 좋아요 기능
document.getElementById("likeButton").addEventListener("click", async () => {
  story.likes = (story.likes || 0) + 1;
  document.getElementById("likeCount").innerText = story.likes;
  localStorage.setItem(ARCHIVE_KEYS, JSON.stringify(savedStories));

  const ref = doc(db, "posts", story.title);
  try {
    await updateDoc(ref, {
      likes: increment(1)
    });
    console.log("✅ 좋아요 증가 반영됨");
  } catch (e) {
    console.error("좋아요 증가 실패:", e);
  }
});

// 댓글 렌더링 함수
function renderComments() {
  const list = document.getElementById("comment-list");
  list.innerHTML = "";
  (story.comments || []).forEach((comment, idx) => {
    const li = document.createElement("li");
    li.innerText = comment.username + ":    " + comment.text + "    " + comment.timestamp;
    list.appendChild(li);
  });
}
renderComments();

// 댓글 작성
document.getElementById("commentSubmit").addEventListener("click", () => {
  const commentInput = document.getElementById("commentInput");
  const newComment =  {
            id : Date.now(),
            text : commentInput.value,
            timestamp : formatForDisplay(new Date().toISOString()),
            username : "Junho"
  };
  if (newComment) {
    story.comments = story.comments || [];
    story.comments.push(newComment);
    commentInput.value = "";
    localStorage.setItem(ARCHIVE_KEYS, JSON.stringify(savedStories));
    renderComments();
  }
});