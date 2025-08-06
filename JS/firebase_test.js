import {setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// localStorage에서 게시글 배열 꺼내기
const storyList = JSON.parse(localStorage.getItem(ARCHIVE_KEYS)) || [];

// storyList를 순회하면서 Firestore에 저장
async function migrateToFirestore() {
  for (const story of storyList) {
    const postRef = doc(db, "posts", story.title);  // id를 문서 ID로 사용
    const docSnap = await getDoc(postRef);
    if(!docSnap.exists()) {
        await setDoc(postRef, {
            id: story.id,
            title: story.title,
            text: story.text,
            date: story.date,
            likes: 0,
            uid: auth.currentUser.uid  // 로그인한 사용자 UID 추가
        });
        console.log(`✅ 게시글 ${story.id} 저장 완료`);
    }
    else {
        console.log("문서가 이미 존재합니다. 중복 저장하지 않음.");
    }

    // 댓글이 있으면 comments 컬렉션에도 저장
    if (story.comments && story.comments.length > 0) {
      for (const comment of story.comments) {
        const commentRef = doc(db, "posts", story.title, "comments", comment.text);
        const doc_com_Snap = await getDoc(commentRef);
        if(!doc_com_Snap.exists()) {
            await setDoc(commentRef, {
                id: comment.id,
                text: comment.text,
                timestamp: comment.timestamp || new Date().toISOString(),
                username: auth.currentUser.displayName || "익명",
                uid: auth.currentUser.uid  // 로그인한 사용자 UID 추가
            });
            console.log(`↳ 댓글 저장됨: ${comment.text}`);
        }
        else {
            console.log("댓글이 이미 존재합니다. 중복 저장하지 않음.");
        }
      }
    }
  }
}

migrateToFirestore();
