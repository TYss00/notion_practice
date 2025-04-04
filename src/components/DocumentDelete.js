import { getDocumentById, deleteDocument } from './api.js';
import { fetchAndUpdate } from './documentService.js';


document.addEventListener('DOMContentLoaded', () => {
     initDeleteHandler();
});

export async function deleteDocumentWithChildren(documentId) {
  try {
    const doc = await getDocumentById(documentId);
    if (!doc) return false;

    for (const child of doc.documents) {
      await deleteDocumentWithChildren(child.id);
    }

    const result = await deleteDocument(documentId);
    return result;
  } catch (error) {
    console.error('삭제 중 오류 발생:', error);
    return false;
  }
}

export function initDeleteHandler() {
  const pageList = document.getElementById('page_list');

  pageList.addEventListener('click', async (e) => {
    const deleteBtn = e.target.closest('.delete_btn');
    if (!deleteBtn) return;

    const listItem = deleteBtn.closest('li');
    const documentId = listItem?.dataset?.id;
    if (!documentId) return;

    const confirmed = window.confirm('이 문서와 하위 문서를 삭제할까요?');
    if (!confirmed) return;

    const success = await deleteDocumentWithChildren(documentId);
    if (success) {
      listItem.remove();
      await fetchAndUpdate();
    }
  });
}
