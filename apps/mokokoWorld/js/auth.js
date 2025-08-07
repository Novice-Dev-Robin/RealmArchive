import { auth, db, onAuthStateChanged, doc, getDoc, setDoc, collection} from '../../../JS/firebase_authentication.js';


onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("로그인 유저:", user.displayName);

    document.getElementById("login-alert-overlay").classList.add("hidden");
    document.getElementById("login-alert").classList.add("hidden");

    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);


    const mokokoStatRef = doc(userDocRef, "mokoko", "stat");
    const statSnap = await getDoc(mokokoStatRef);

    if (!statSnap.exists()) {
      console.log("mokoko/stat 문서가 없습니다.");
      // 기본값 세팅 가능
    } else {
      console.log("mokoko/stat 데이터:", statSnap.data());
    }
  } else {
    document.getElementById("login-alert-overlay").classList.remove("hidden");
  }
});
