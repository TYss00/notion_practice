// window.Router = (() => {
//     async function renderPage(documentId) {
//       const doc = await window.api.getDocumentById(documentId);
//       if (doc) {
//         window.setContents(doc); // Editor.js 안의 전역 함수
//       } else {
//         alert('문서를 불러오지 못했습니다.');
//       }
//     }
  
//     function navigateTo(documentId) {
//       const newUrl = `/documents/${documentId}`;
//       history.pushState({ documentId }, '', newUrl);
//       renderPage(documentId);
//     }
  
//     function initRouter() {
//       const match = window.location.pathname.match(/^\/documents\/(\d+)$/);
//       if (match) {
//         renderPage(match[1]);
//       }
  
//       window.addEventListener('popstate', (e) => {
//         const id = e.state?.documentId;
//         if (id) renderPage(id);
//       });
//     }
  
//     return {
//       navigateTo,
//       initRouter
//     };
//   })();