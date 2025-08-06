// Firebase SDK 중 앱 초기화에 필요한 함수 initializeApp을 불러오는 부분
// 이걸로 Firebase 프로젝트를 웹 앱에 연결할 수 있다
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";


// Firebase의 분석(Analytics) 기능을 쓰기 위한 함수 getAnalytics를 불러옴
// 사용자 활동을 추적하거나 통계 정보를 수집할 때 사용
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";


// Firebase의 Firestore 데이터베이스 기능을 쓰기 위한 함수 getFirestore를 불러오는 부분
// 실시간 데이터베이스 및 문서 기반 DB에 접근할 때 필요
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = { // 플젝 설정값
    apiKey: "AIzaSyAmrnxnGwJSl3XHe_A2NjOqPLhcJACxbrE",
    authDomain: "realmarchive-ef464.firebaseapp.com",
    projectId: "realmarchive-ef464",
    storageBucket: "realmarchive-ef464.appspot.com",
    messagingSenderId: "504407159306",
    appId: "1:504407159306:web:0a0e1a9a880f18d1e1e5f3",
    measurementId: "G-CD595R1W83"
};



// 위에 정의한 firebaseConfig를 사용해 Firebase 앱을 초기화하는 부분
// 이걸 통해 Firebase 서비스와 연결
const app = initializeApp(firebaseConfig);


// 초기화한 app을 기준으로 Firebase Analytics 기능을 시작하는 코드
// 사용자 행동 분석이나 통계 기능을 쓸 때 필요
const analytics = getAnalytics(app);


// 방금 초기화한 app으로부터 Firestore 데이터베이스 인스턴스를 얻는 부분
// Firestore를 통해 문서 읽기, 쓰기 같은 데이터베이스 작업을 할 수 있다
const db = getFirestore(app);



// 전역 접근
window.db = db;
/* 
db 변수를 브라우저 전역 객체인 window에 할당해서
다른 JS 파일이나 스크립트 어디서든 window.db로 Firestore에 접근할 수 있게 만든 코드 */




// 로그인한 유저 정보 가져오기
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);
window.auth = auth;  // 전역 접근용
