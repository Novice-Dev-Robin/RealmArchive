const weather = document.querySelector('.weather');

window.addEventListener('resize', () => {
    // 창 크기에 따라 검색창 너비 조정
    handleSearchInputSize();

    // 창 크기에 따라 날씨 크기 조정
    if (window.innerWidth < 800) {
        weather.style.fontSize = '25px'; // 작은 화면에서는 작게
    } else if (window.innerWidth < 1000) {
        weather.style.fontSize = '28px'; // 중간 화면에서는 조금 크게
    } else {
        weather.style.fontSize = '30px';
    }
});
