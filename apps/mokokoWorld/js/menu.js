const menu = document.getElementById("menu-icon");

// 메뉴 아이콘 클릭 이벤트
menu.addEventListener("click", () => {

  document.getElementById("user-icon").classList.toggle("slideDown");
  document.getElementById("farm-icon").classList.toggle("slideDown");
  document.getElementById("toDo-icon").classList.toggle("slideDown");
});

