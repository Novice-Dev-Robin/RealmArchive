import { auth, db, onAuthStateChanged, doc, getDoc, setDoc} from '../../../JS/firebase_authentication.js';

let rect; // 모코코 바운더리 변수



// Firebase에서 사용자 커스터마이징 불러오기 함수
async function loadCustomization() {
  const user = auth.currentUser;
  if (!user) {
    console.warn("로그인 안 함 → 기본 색상 적용");
    return;
  }

    try {
    const docRef = doc(db, "users", user.uid, "mokoko", "customization");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      console.log(data);

      // SVG 색상 업데이트
      document.getElementById("mokoko-body").setAttribute("fill", data.bodyColor ?? DEFAULT_BODY_COLOR);
      document.getElementById("mokoko-leaf").setAttribute("fill", data.leafColor ?? DEFAULT_LEAF_COLOR);
      document.getElementById("mokoko-tongue").setAttribute("fill", data.tongueColor ?? DEFAULT_TONGUE_COLOR);
      document.getElementById("mokoko-base").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);
      document.getElementById("mokoko-leftarmpit").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);
      document.getElementById("mokoko-rightarmpit").setAttribute("fill", data.baseColor ?? DEFAULT_BASE_COLOR);

    } else {
      console.log("없는데요");
    }

  } catch (err) {
    console.error("서버에서 커마 불러오기 실패:", err);
  }
}


onAuthStateChanged(auth, async (user) => {
  if (user) {

    // 모코코 색상 불러오기 먼저
    loadCustomization();
    console.log("불러오기 성공");

    // 로그인 했으면 팝업 hidden
    document.getElementById("login-alert-overlay").classList.add("hidden");
    document.getElementById("login-alert").classList.add("hidden");

    // 모코코 올라오는 애니메이션
    setTimeout(() => {
      const mokokoMain = document.getElementById("mokoko-main");
      mokokoMain.classList.remove("hidden");

      rect = mokokoMain.getBoundingClientRect();
      mokokoMain.classList.add("slide-up-mk");

      // 애니메이션 끝난 후 slide-up-mk 제거
      mokokoMain.addEventListener("animationend", () => {
        mokokoMain.classList.remove("slide-up-mk");
      }, { once: true });
    }, 500);

    

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

    console.warn("로그인 안 함 → 기본 색상 적용");
    // 로그인 안 했을 때 기본 색상 적용
  }
});

export {rect};