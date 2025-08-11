import { auth, db, onAuthStateChanged, doc, getDoc, setDoc} from '../../../JS/firebase_authentication.js';


onAuthStateChanged(auth, async (user) => {
  if (user) {

    // 로그인 했으면 팝업 hidden
    document.getElementById("login-alert-overlay").classList.add("hidden");
    document.getElementById("login-alert").classList.add("hidden");

    const userDocRef = doc(db, "users", user.uid); // 유저 아이디 참조
    const userDocSnap = await getDoc(userDocRef); // 유저 아이디 가져오기
    const userData = userDocSnap.data();
    
    console.log("로그인한 렐카이브 아이디 : " + userData.name);

    if (!userDocSnap.exists()) { // 유저 아이디가 없다면?
      console.log("mokokoWorld 최초 로그인 유저네요.");
      console.log("모코코를 커마해보자!");
      
      const mokokoStatRef = doc(userDocRef, "mokoko", "stat"); // 유저 스탯 참조
      const statSnap = await getDoc(mokokoStatRef); // 유저 스탯 가져오기


    } else {
      // 유저 아이디 존재한다면..
      console.log("mokokoWorld 데이터:", userData);
    }
  } 
  
  else { // 로그인 안되어 있으면 팝업 계속..
    document.getElementById("login-alert-overlay").classList.remove("hidden");
  }
});
