// document.addEventListener("DOMContentLoaded", async () => {
//     const pageList = document.getElementById("page_list"); 

//     // 문서 리스트 불러오기 
//     async function fetch2Documents() { 
//         const response = await fetch("https://kdt-api.fe.dev-cos.com/documents", {
//             headers: { 
//                 'Content-Type': 'application/json',
//                 "x-username": "T"
//              }
//         });
    
//         if (response.ok) {
//             const documents = await response.json();
            
//             pageList.innerHTML = ""; 
//             documents.forEach((doc) => {
//                 const newItem = createDocumentElement(doc, pageList);
//                 fetchAndRenderChildren(doc.id, newItem); 
//             });
//         }
//     }

//     // 부모 요소에 문서 추가
//     function createDocumentElement(doc, parentElement) {
//         if (!parentElement) return;

//         const newItem = document.createElement("li");
//         newItem.dataset.id = doc.id;
//         newItem.innerHTML = `
//             <div>
//                 <a href="#">${doc.title}</a>
//                 <div class="btns">
//                     <button class="add_btn"><i class="fa-regular fa-square-plus"></i></button>
//                     <button class="delete_btn"><i class="fa-regular fa-trash-can"></i></button>
//                 </div>
//             </div>
//             <ul class="child-docs"></ul> 
//         `;

//         parentElement.appendChild(newItem);
//         return newItem.querySelector(".child-docs"); 
//     }

//     // 자식 문서 불러오기
//     async function fetchAndRenderChildren(parentId, parentElement) {
//         const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${parentId}`, {
//             headers: { 
//                 'Content-Type': 'application/json',
//                 "x-username": "T"
//              }
//         });
    
//         if (response.ok) {
//             const parentDoc = await response.json();
//             parentDoc.documents.forEach((childDoc) => {
//                 const childList = createDocumentElement(childDoc, parentElement);
//                 fetchAndRenderChildren(childDoc.id, childList); 
//             });
//         }
//     }
    

//     // 부모 문서 삭제 시, 자식 문서도 함께 삭제하는 함수
//     async function deleteDocumentWithChildren(documentId) {
//     // 부모 문서의 자식 문서 가져오기
//     const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
//         headers: { 
//             'Content-Type': 'application/json',
//             "x-username": "T" 
//         }
//     });

//     if (!response.ok) return false;

//     const parentDoc = await response.json();
//     const childDocs = parentDoc.documents; // 자식 문서 배열

//     // 자식 문서 먼저 삭제 (재귀 호출)
//     for (const child of childDocs) {
//         await deleteDocumentWithChildren(child.id);
//     }

//     // 부모 문서 삭제
//     const deleteResponse = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
//         method: "DELETE",
//         headers: { 
//             "Content-Type": "application/json", 
//             "x-username": "T" 
//         }
//     });

//     return deleteResponse.ok;
// }


//     // 문서 삭제 기능
//     pageList.addEventListener("click", async (event) => {
//         const deleteButton = event.target.closest(".delete_btn");
//         if (!deleteButton) return;

//         const listItem = deleteButton.closest("li");
//         const documentId = listItem.dataset.id;

//         if (documentId) {
//             const success = await deleteDocumentWithChildren(documentId);
//             if (success) {
//                 listItem.remove(); // 삭제된 문서 제거
//             }
//         }
//     });

//     // 전체 문서 불러오기
//     fetch2Documents();
// });


import {  fetchDocuments, deleteDocument } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const pageList = document.getElementById("page_list");

    // 문서 리스트 불러오기
    async function fetchAndRenderDocuments() {
        try {
            const documents = await fetchDocuments(); // api.js에서 가져온 fetchDocuments 함수 사용
            pageList.innerHTML = ""; // 기존 목록 초기화
            documents.forEach((doc) => {
                const newItem = createDocumentElement(doc, pageList);
                fetchAndRenderChildren(doc.id, newItem); // 자식 문서 로드
            });
        } catch (error) {
            console.error("문서 목록을 불러오는 데 실패했습니다.", error);
        }
    }

    // 부모 요소에 문서 추가
    function createDocumentElement(doc, parentElement) {
        if (!parentElement) return;

        const newItem = document.createElement("li");
        newItem.dataset.id = doc.id;
        newItem.innerHTML = `
            <div>
                <a href="#">${doc.title}</a>
                <div class="btns">
                    <button class="add_btn"><i class="fa-regular fa-square-plus"></i></button>
                    <button class="delete_btn"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
            <ul class="child-docs"></ul> <!-- 자식 문서 목록 -->
        `;

        parentElement.appendChild(newItem);
        return newItem.querySelector(".child-docs"); // 자식 문서를 추가할 ul 반환
    }

    // 자식 문서 불러오기
    async function fetchAndRenderChildren(parentId, parentElement) {
        try {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${parentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-username": "T"
                }
            });

            if (response.ok) {
                const parentDoc = await response.json();
                parentDoc.documents.forEach((childDoc) => {
                    const childList = createDocumentElement(childDoc, parentElement);
                    fetchAndRenderChildren(childDoc.id, childList); // 자식 문서에 대해서 재귀 호출
                });
            } else {
                console.error("자식 문서를 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("자식 문서를 불러오는 중 오류 발생:", error);
        }
    }

    // 부모 문서 삭제 시, 자식 문서도 함께 삭제하는 함수
    async function deleteDocumentWithChildren(documentId) {
        try {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-username": "T"
                }
            });

            if (!response.ok) return false;

            const parentDoc = await response.json();
            const childDocs = parentDoc.documents; // 자식 문서 배열

            // 자식 문서 먼저 삭제 (재귀 호출)
            for (const child of childDocs) {
                await deleteDocumentWithChildren(child.id);
            }

            // 부모 문서 삭제
            const success = await deleteDocument(documentId); // api.js의 deleteDocument 함수 사용
            return success;
        } catch (error) {
            console.error("문서 삭제 중 오류 발생:", error);
            return false;
        }
    }

    // 문서 삭제 기능
    pageList.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete_btn");
        if (!deleteButton) return;

        const listItem = deleteButton.closest("li");
        const documentId = listItem.dataset.id;

        if (documentId) {
            const success = await deleteDocumentWithChildren(documentId);
            if (success) {
                listItem.remove(); // 삭제된 문서 목록에서 제거
            }
        }
    });

    // 전체 문서 불러오기
    fetchAndRenderDocuments();
});
