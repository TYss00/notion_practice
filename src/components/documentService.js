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

// 문서 요소 생성 함수
function createDocumentElement(doc) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <a href="#">${doc.title}</a>
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
        window.api.createDocument('새 제목을 입력하세요', doc.id).then(renderDocuments);
    });

    // `🗑️` 삭제 버튼 클릭 시, 문서 삭제
    li.querySelector('.delete_btn').addEventListener('click', () => {
        if (confirm('이 문서를 삭제할까요?')) {
            window.api.deleteDocument(doc.id).then(renderDocuments);
        }
    });

    return li;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', renderDocuments);
