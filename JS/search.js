const search_form = document.querySelector("#search-form");
const search_text = document.querySelector("#searchInput");

function search_STORY(event) {
    event.preventDefault();
    const keyword = search_text.value.toLowerCase(); // 대소문자 입력 신경 쓰이지 않게
    
    if(keyword === "") { // 공란 입력 받으면?
        const searching_results = storyArray;
        container.innerText = ""; // 기존 글 제거
        searching_results.forEach(renderTitleCards);
    }
    else {
        const searching_results = storyArray.filter((story) => story.title.toLowerCase().includes(keyword));
        container.innerText = ""; // 기존 글 제거
        searching_results.forEach(renderTitleCards);
    }

}
search_form.addEventListener("submit", search_STORY);