const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const HEADERS = {
    'Content-Type': 'application/json',
    'x-username': 'TYss0000', // 여기에 api이름 넣기
};

// 문서 목록 가져오기
function fetchDocuments() {
    return fetch(API_URL, {
        method: 'GET',
        headers: HEADERS,
    }).then((res) => res.json());
}

// 문서 생성하기
function createDocument(title, parent = null) {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ title, parent }),
    }).then((res) => res.json());
}

// 전역 객체 등록
window.api = {
    fetchDocuments,
    createDocument,
};
