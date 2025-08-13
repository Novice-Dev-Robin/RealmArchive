import { render_after_sorting, RENDER_STORIES_BY_DATE } from "./pushform.js";
import { collection, getDocs } from "./firebase_authentication.js";

const search_form = document.querySelector("#search-form");
const search_text = document.querySelector("#searchInput");

async function searchingSTORY(event) {
    event.preventDefault();
    const keyword = search_text.value.toLowerCase(); // 대소문자 입력 신경 쓰이지 않게
    
    if(keyword === "") { // 공란 입력 받으면?
        RENDER_STORIES_BY_DATE("newest"); // 최신순 출력
    }
    else {
        const postsCol = collection(db, "posts");
        const postSnapshot = await getDocs(postsCol);  
        const allPosts = postSnapshot.docs.map(doc => ({ firestoreID: doc.id, ...doc.data() }));

        // 제목에 키워드 포함된 글만 필터링
        const filtered = allPosts.filter(post => post.title.toLowerCase().includes(keyword)); 
        console.log(filtered);
        
        render_after_sorting(filtered);
    }
}
search_form.addEventListener("submit", searchingSTORY);