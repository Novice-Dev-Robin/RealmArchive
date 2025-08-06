const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');


function handleSearchInputSize(){
    if (window.innerWidth < 800) {
        searchInput.style.width = '300px';
    } else if (window.innerWidth < 1000) {
        searchInput.style.width = window.innerWidth - 500 + 'px';
    }   else {
        searchInput.style.width = '500px';
    }
}

handleSearchInputSize(); // 초기 크기 설정