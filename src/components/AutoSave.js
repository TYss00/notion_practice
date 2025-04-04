import { updateDocument } from "./api.js";
import { fetchAndUpdate } from "./documentService.js";
export function AutoSave(pageId){
    const pageTitle = document.getElementById('page_title'); 
    const pageContents = document.getElementById('page_contents'); 

    // 자동 저장 함수 
    let saveTimeout;
    const autoSaveHandler = async () => {
        if (!pageId) {
            console.error("문서 ID가 없음둥.");
            return;
        }

        const modifyTitle = pageTitle.value;
        const modifyContent = pageContents.value;

        try {
            await updateDocument(pageId, modifyTitle, modifyContent); 
            console.log("저장 완료:", { modifyTitle, modifyContent });

            // 변경 사항을 리스트에 반영
            fetchAndUpdate();  
        } catch (error) {
            console.error("저장 실패:", error);
        }
    };

    // 입력 이벤트에 디바운싱 적용 (0.5초 후 저장)
    const debounceSave = () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(autoSaveHandler, 500);
    };

    pageTitle.addEventListener('input', debounceSave);
    pageContents.addEventListener('input', debounceSave);
}
    // pageTitle.addEventListener('input', async (e) => {
    //     e.preventDefault()
    //     const documentId = pageId; 
    //     const modifyTitle = pageTitle.value;
    //     const modifyContent = pageContents.value;
    //     if (!documentId) {
    //         console.error("문서 ID가 없음둥.");
    //         return;
    //     }
    //     try {
    //         await updateDocument(documentId, modifyTitle, modifyContent); 
    //         console.log("저장 완료:", { modifyTitle, modifyContent });
    //     } catch (error) {
    //         console.error("저장 실패:", error);
    //     }
    // })

    // pageContents.addEventListener('input', async (e) => {
    //     e.preventDefault()
    //     const documentId = pageId; 
    //     const modifyTitle = pageTitle.value;
    //     const modifyContent = pageContents.value;
    //     if (!documentId) {
    //         console.error("문서 ID가 없음둥.");
    //         return;
    //     }
    //     try {
    //         await updateDocument(documentId, modifyTitle, modifyContent); 
    //         console.log("저장 완료:", { modifyTitle, modifyContent });
    //     } catch (error) {
    //         console.error("저장 실패:", error);
    //     }
    // })


