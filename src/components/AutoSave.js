function AutoSave(pageId){
    const pageTitle = document.getElementById('page_title'); 
    const pageContents = document.getElementById('page_contents'); 

    pageTitle.addEventListener('input', async (e) => {
        e.preventDefault()
        const documentId = pageId; 
        const modifyTitle = pageTitle.value;
        const modifyContent = pageContents.value;
        if (!documentId) {
            console.error("문서 ID가 없음둥.");
            return;
        }

        try {
            await updateDocument(documentId, modifyTitle, modifyContent); 
            fetchDocuments()
        .then((newDocuments) => {
            renderDocuments(newDocuments);
            // setTimeout(fetchAndUpdate, 1000); // 1초 후 다시 요청
        })
            // fetchAndUpdate();
            console.log("저장 완료:", { modifyTitle, modifyContent });
        } catch (error) {
            console.error("저장 실패:", error);
        }
    })

    pageContents.addEventListener('input', async (e) => {
        e.preventDefault()
        const documentId = pageId; 
        const modifyTitle = pageTitle.value;
        const modifyContent = pageContents.value;
        if (!documentId) {
            console.error("문서 ID가 없음둥.");
            return;
        }

        try {
            await updateDocument(documentId, modifyTitle, modifyContent); 
            console.log("저장 완료:", { modifyTitle, modifyContent });
        } catch (error) {
            console.error("저장 실패:", error);
        }
    })
}
