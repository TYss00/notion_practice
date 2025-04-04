import { updateDocument } from "./api.js";
import { fetchAndUpdate } from "./documentService.js";

let currentSaveTargetId = null; // 현재 저장 중인 문서 ID
// 이벤트리스너에서 다른 문서 클릭했을 때 기존 리스너를 제거함(빈칸으로)
let titleListener = null; 
let contentListener = null; 

export function AutoSave(pageId) {
  const pageTitle = document.getElementById('page_title');
  const pageContents = document.getElementById('page_contents');

  // 이전 이벤트 제거
  // 처음에는 기존 리스너가 없으므로 일단 통과되고 있으면 새로운 문서 이벤트리스너
  if (titleListener) pageTitle.removeEventListener('input', titleListener);
  if (contentListener) pageContents.removeEventListener('input', contentListener);

  // 현재 저장할 문서 아이디
  currentSaveTargetId = pageId;

  let saveTimeout;
  const autoSaveHandler = async () => {
    if (!currentSaveTargetId) return;

    const modifyTitle = pageTitle.value;
    const modifyContent = pageContents.value;

    try {
      await updateDocument(currentSaveTargetId, modifyTitle, modifyContent);
      console.log("저장 완료:", { modifyTitle, modifyContent });

      // 리스트에 반영 (목록의 제목을 업데이트)
      fetchAndUpdate();

    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 입력하고 0.5초 후 저장
  const debounceSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(autoSaveHandler, 500);
  };

  // 새로운 이벤트 등록 후 변수에 저장
  titleListener = debounceSave;
  contentListener = debounceSave;

  pageTitle.addEventListener('input', titleListener);
  pageContents.addEventListener('input', contentListener);
}

