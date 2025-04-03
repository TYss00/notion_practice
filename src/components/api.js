const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const HEADERS = {
    'Content-Type': 'application/json',
    'x-username': '4pra', // 여기에 api이름 넣기
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

// 문서 생성하기
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

// 특정 문서 수정하기
async function updateDocument(documentId, title, content) {
    try {
        const res = await fetch(`${API_URL}/${documentId}`, {
            method: 'PUT',
            headers: HEADERS,
            body: JSON.stringify({ title, content }),
        });

        if (!res.ok) {
            throw new Error(`문서 수정 실패! 상태 코드: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('문서 수정 중 오류 발생:', error);
        return null; // 실패 시 null 반환
    }
}

// 문서 삭제하기
/*
async function deleteDocument(documentId) {
    try {
        const res = await fetch(`${API_URL}/${documentId}`, {
            method: 'DELETE',
            headers: HEADERS,
        });

        if (!res.ok) {
            throw new Error(`문서 삭제 실패! 상태 코드: ${res.status}`);
        }

        return true; // 삭제 성공 시 true 반환
    } catch (error) {
        console.error('문서 삭제 중 오류 발생:', error);
        return false; // 실패 시 false 반환
    }
}
    */

async function deleteDocument(documentId) {
    try {
        console.log(`🚀 DELETE 요청: ${API_URL}/${documentId}`); // 요청 URL 확인

        const res = await fetch(`${API_URL}/${documentId}`, {
            method: 'DELETE',
            headers: HEADERS
        });

        if (!res.ok) {
            const errorResponse = await res.text();
            console.error(`서버 응답: ${errorResponse}`); // 서버 응답 내용 출력
            throw new Error(`문서 삭제 실패! 상태 코드: ${res.status}, 응답: ${errorResponse}`);
        }

        console.log(`문서 ${documentId} 삭제 성공!`);
        return true; // 삭제 성공
    } catch (error) {
        console.error('문서 삭제 중 오류 발생:', error);
        return false; // 실패 시 false 반환
    }
}


// 특정 문서 가져오기
async function getDocumentById(documentId) {
    try {
        const res = await fetch(`${API_URL}/${documentId}`, {
            method: 'GET',
            headers: HEADERS,
        });

        if (!res.ok) {
            throw new Error(`문서 가져오기 실패! 상태 코드: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('문서 가져오는 중 오류 발생:', error);
        return null; // 실패 시 null 반환
    }
}

// 전역 객체 등록
window.api = {
    fetchDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
};
