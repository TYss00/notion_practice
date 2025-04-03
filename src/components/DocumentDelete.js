

document.addEventListener("DOMContentLoaded", () => {
    const pageList = document.getElementById("page_list"); 

    // 삭제 기능
    pageList.addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".delete_btn"); //삭제 버튼인지 확인
        if (!deleteButton) return;

        const listItem = deleteButton.closest("li");
        const documentId = listItem.dataset.id; //문서 ID가져오기

        //필요하면 주석 해제
       // console.log("삭제할 문서 ID:", documentId);

        if (documentId) {
            const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${documentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "x-username": "4pra" 
                }
            });

            // 삭제되었을 경우, UI에서도 제거
            if (response.ok) {
                listItem.remove();
                //fetchDocuments(); // 삭제 후 전체 목록을 새로 불러옴
            } else {
                alert("문서 삭제 실패.");
            }
        }
    });
});
