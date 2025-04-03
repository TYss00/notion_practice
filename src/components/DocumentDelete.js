
// document.addEventListener("DOMContentLoaded", () => {
//     const pageList = document.getElementById("page_list");

//     pageList.addEventListener("click", async (event) => {
//         const deleteButton = event.target.closest(".delete_btn");
//         if (!deleteButton) return;

//         const listItem = deleteButton.closest("li");
//         const documentId = listItem.dataset.id;

//         if (documentId) {
//             const isDeleted = await window.deleteDocument(documentId);
//             if (isDeleted) {
//                 listItem.remove();
//             } else {
//                 alert("문서 삭제에 실패했습니다.");
//             }
//         }
        
//     });
// });

//api.js 필요 x
document.addEventListener("DOMContentLoaded", () => {
    const pageList = document.getElementById("page_list");

    pageList.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete_btn");
        if (!deleteButton) return;

        const listItem = deleteButton.closest("li");
        const documentId = listItem.dataset.id;

        console.log("삭제할 문서 ID:", documentId);

        if (documentId) {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "x-username": "4pra" // 여기에 본인 API 키 넣기
                }
            });

            if (response.ok) {
                listItem.remove();
            } else {
                alert("문서 삭제에 실패했습니다.");
            }
        }
    });
});
