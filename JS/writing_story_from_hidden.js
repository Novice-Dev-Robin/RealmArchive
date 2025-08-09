// 제목 입력란 누르면, storyForm 나오게끔
// writing_story_from_hidden.js
import { storyForm } from "./pushform.js";

const titleInput = document.querySelector("#titleInput");
const bodyInput = document.querySelector("#bodyInput");

// 보여줄 때 (페이드 + 슬라이드 다운)
function showStoryForm() {
    storyForm.classList.remove("hidden");
    setTimeout(() => {
        storyForm.classList.remove("opacity-0", "translate-y-4");
        storyForm.classList.add("opacity-100", "translate-y-0");
    }, 10);
}

// 숨길 때 (페이드 + 슬라이드 업)
function hideStoryForm() {
    storyForm.classList.add("opacity-0", "translate-y-4");
    storyForm.classList.remove("opacity-100", "translate-y-0");
    setTimeout(() => {
        storyForm.classList.add("hidden");
    }, 300);
}

titleInput.addEventListener("click", () => {
    showStoryForm();
});

document.addEventListener("click", (event) => {
    const isClickInside =
        titleInput.contains(event.target) ||
        bodyInput.contains(event.target) ||
        storyForm.contains(event.target);

    const isEmpty = !titleInput.value.trim() && !bodyInput.value.trim();
    // 제목이나 글 둘 다 공란일 때 작동
    if (!isClickInside && isEmpty) {
        hideStoryForm();
    }
});
