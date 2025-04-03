const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const HEADERS = {
    'Content-Type': 'application/json',
    'x-username': 'TYs', // 여기에 api이름 넣기
};

// 문서 목록 가져오기
async function fetchDocuments() {
    try {
        const res = await fetch(API_URL, {
            method: 'GET',
            headers: HEADERS,
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('문서 가져오기 실패:', error);
        return null; // 실패 시 null 반환
    }
}

// 문서 생성하기 (안전한 버전)
async function createDocument(title, parent = null) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ title, parent }),
        });

        if (!res.ok) {
            throw new Error(`문서 생성 실패! 상태 코드: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('문서 생성 중 오류 발생:', error);
        return null; // 요청 실패 시 null 반환
    }
}

// 전역 객체 등록
window.api = {
    fetchDocuments,
    createDocument,
};
