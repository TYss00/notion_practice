
document.addEventListener("DOMContentLoaded", async () => {
    const pageList = document.getElementById("page_list");

    // 문서 목록 불러오는 함수
    async function fetchDocuments() {
        try {
            const response = await fetch("https://kdt-api.fe.dev-cos.com/documents", {
                headers: { "x-username": "4pra" }
            });

            if (!response.ok) throw new Error("error. 문서 안보임");

            const documents = await response.json();
            pageList.innerHTML = ""; // 기존 목록 초기화

            documents.forEach((doc) => {
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
                `;
                pageList.appendChild(newItem);
            });
        } catch (error) {
            console.error(error);
            alert("문서목록실패");
        }
    }

    // 문서 삭제 함수
    async function deleteDocument(documentId) {
        try {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
                method: "DELETE",
                headers: { "x-username": "4pra" }
            });

            if (!response.ok) throw new Error("문서 삭제 실패");

            console.log(`문서 ${documentId} 삭제됨`);
            fetchDocuments(); // 삭제 후 문서 목록 새로고침
        } catch (error) {
            console.error(error);
            alert("문서를 삭제하는데 실패했습니다.");
        }
    }

    // 삭제 버튼 이벤트 
    pageList.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete_btn");
        if (!deleteButton) return;

        const listItem = deleteButton.closest("li");
        const documentId = listItem.dataset.id;

        if (documentId) {
            await deleteDocument(documentId);
        }
    });

    fetchDocuments(); // 페이지 로딩 시 문서 목록 불러오기
});
