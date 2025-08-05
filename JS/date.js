// const today = new Date(); // 현재 날짜 객체
// const dateString = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식 추출
// const dateString = new Date().toLocaleString('ko-KR', { hour12: false }); // 'YYYY.MM.DD. H시 M분 S초' 형식 추출

function formatForDisplay(isoString) { // 날짜 표현 가공용 함수
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}
const dateString = { // 실제 날짜 데이터
    date : new Date().toISOString()
};