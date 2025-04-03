// 문서 목록을 가져와서 표시
function renderDocuments() {
    window.api.fetchDocuments().then((documents) => {
        const pageList = document.getElementById('page_list');
        pageList.innerHTML = ''; // 기존 목록 초기화
        documents.forEach((doc) => {
            const listItem = createDocumentElement(doc);
            pageList.appendChild(listItem);
        });
    });
}

// 문서 요소 생성
function createDocumentElement(doc) {
    const li = document.createElement('li');
    li.dataset.id = doc.id; // 문서 ID 저장

    li.innerHTML = `
        <div class="document-item">
            <span class="doc-title">${doc.title}</span>
            <div class="btns">
                <button class="add_btn"><i class="fa-regular fa-square-plus"></i></button>
                <button class="delete_btn"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        <ul class="children"></ul>
    `;

    // 하위 문서 렌더링
    const childrenContainer = li.querySelector('.children');
    doc.documents.forEach((childDoc) => {
        const childItem = createDocumentElement(childDoc);
        childrenContainer.appendChild(childItem);
    });

    // `+` 버튼 클릭 시, 하위 문서 추가
    li.querySelector('.add_btn').addEventListener('click', () => {
        window.api.createDocument('새 문서', doc.id);
    });

    return li;
}

// 1초마다 변경된 데이터 확인 (Polling)
let previousDocuments = [];
function pollForUpdates() {
    window.api.fetchDocuments().then((newDocuments) => {
        if (JSON.stringify(previousDocuments) !== JSON.stringify(newDocuments)) {
            previousDocuments = newDocuments;
            renderDocuments();
        }
    });
}
setInterval(pollForUpdates, 1000); // 1초마다 변경 감지

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', renderDocuments);
