// 제목 입력란 누르면, storyForm 나오게끔
import { storyForm } from "./pushform.js";

const title_block = document.querySelector("#titleInput");
title_block.addEventListener("click", function() {
    storyForm.classList.remove("hidden");
})