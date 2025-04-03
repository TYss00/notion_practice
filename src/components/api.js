const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const HEADERS = {
    'Content-Type': 'application/json',
    'x-username': 'TYs', // 여기에 api이름 넣기
};

// 문서 목록 가져오기
async function fetchDocuments() {
    const res = await fetch(API_URL, {
        method: 'GET',
        headers: HEADERS,
    });
    return await res.json();
}

// 문서 생성하기
async function createDocument(title, parent = null) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ title, parent }),
    });
    return await res.json();
}

// 전역 객체 등록
window.api = {
    fetchDocuments,
    createDocument,
};
