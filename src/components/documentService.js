// 이전 문서 상태 저장
let previousDocuments = null;

// 문서 목록을 가져와서 표시
function renderDocuments(documents) {
  const pageList = document.getElementById("page_list");
  pageList.innerHTML = ""; // 기존 목록 초기화
  documents.forEach((doc) => {
    const listItem = createDocumentElement(doc);
    pageList.appendChild(listItem);
  });
}

// 문서 요소 생성
function createDocumentElement(doc) {
  const li = document.createElement("li");
  li.dataset.id = doc.id; // 문서 ID 저장

  li.innerHTML = `
        <div class="document-item">
            <a href="#">${doc.title}</a>
            <div class="btns">
                <button class="add_btn"><i class="fa-regular fa-square-plus"></i></button>
                <button class="delete_btn"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        <ul class="children"></ul>
    `;

  // 하위 문서
  const childrenContainer = li.querySelector(".children");
  doc.documents.forEach((childDoc) => {
    const childItem = createDocumentElement(childDoc);
    childrenContainer.appendChild(childItem);
  });

  // `+` 버튼 클릭 시, 하위 문서 추가
  li.querySelector(".add_btn").addEventListener("click", () => {
    window.api.createDocument("새 페이지", doc.id).then(() => {
      fetchAndUpdate(); // 문서 생성 후 즉시 갱신
    });
  });

  return li;
}

// 변경 감지 및 즉시 반영
function fetchAndUpdate() {
  window.api
    .fetchDocuments()
    .then((newDocuments) => {
      if (!previousDocuments || JSON.stringify(previousDocuments) !== JSON.stringify(newDocuments)) {
        // console.log('변경 감지, 문서 갱신', newDocuments);
        previousDocuments = newDocuments;
        renderDocuments(newDocuments);
      }
      setTimeout(fetchAndUpdate, 1000); // 1초 후 다시 요청
    })
    .catch(() => setTimeout(fetchAndUpdate, 2000)); // 실패 시 2초 후 재시도
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  fetchAndUpdate(); // Long Polling 시작

  // "새 페이지 추가" 버튼 클릭 시 Root Document 생성
  document.querySelector(".add_new_page").addEventListener("click", () => {
    window.api.createDocument("새 페이지", null).then(() => {
      fetchAndUpdate(); // 문서 생성 후 즉시 갱신
    });
  });
});
