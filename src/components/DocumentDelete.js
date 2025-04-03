document.addEventListener("DOMContentLoaded", async () => {
    const pageList = document.getElementById("page_list"); 

    // 문서 리스트 불러오기 
    async function fetchDocuments() {
        try {
            const response = await fetch("https://kdt-api.fe.dev-cos.com/documents", {
                headers: { "x-username": "4pra" }
            });

            if (response.ok) {
                const documents = await response.json();
                
                
                pageList.innerHTML = ""; // 기존 목록 초기화
                documents.forEach((doc) => {
                    const newItem = createDocumentElement(doc, pageList);
                    fetchAndRenderChildren(doc.id, newItem); 
                });
            }
        } catch (error) {
        }
    }

    // 부모 요소에 추가
    function createDocumentElement(doc, parentElement) {
        if (!parentElement) {
            return;
        }

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
            <ul class="child-docs"></ul> 
        `;

        parentElement.appendChild(newItem);
        return newItem.querySelector(".child-docs"); 
    }

    // 자식 문서 
    async function fetchAndRenderChildren(parentId, parentElement) {
        try {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${parentId}`, {
                headers: { "x-username": "4pra" }
            });

            if (response.ok) {
                const parentDoc = await response.json();
                //console.log(`문서 ${parentId}의 자식 문서:`, parentDoc.documents);

                parentDoc.documents.forEach((childDoc) => {
                    const childList = createDocumentElement(childDoc, parentElement);
                    fetchAndRenderChildren(childDoc.id, childList); 
                });
            }
        } catch (error) {
          //  console.error("실패:", error);
        }
    }

    // 문서 삭제 기능
    pageList.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete_btn");
        if (!deleteButton) return;

        const listItem = deleteButton.closest("li");
        const documentId = listItem.dataset.id;

        if (documentId) {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "x-username": "4pra" }
            });

            if (response.ok) {
                listItem.remove(); // 삭제된 문서 제거
            } else {
                
            }
        }
    });

    // 전체 문서 불러오기
    fetchDocuments();
});
