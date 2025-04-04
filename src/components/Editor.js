import { getDocumentById } from "./api.js";
import { AutoSave } from "./AutoSave.js";

document.addEventListener("DOMContentLoaded", () => {
    const pageList = document.getElementById('page_list');

    pageList.addEventListener('click', async (e) => {
        const update = e.target;

        if (update.tagName === 'A') {
            e.preventDefault();
            const pageId = update.dataset.id;
            //console.log('클릭된 페이지 ID:', pageId);
            
            window.history.pushState({},'',`/documents/${pageId}`)
            const json = await getDocumentById(pageId);
            setContents(json);
        }
    });



 // 뒤로가기 버튼 눌렀을 때 id값 저장해놓기.
    window.addEventListener('popstate', async () => {
        const pageId = window.location.pathname.split('/documents/')[1];

        if (pageId) {
            //console.log("ID:", pageId);
            const json = await getDocumentById(pageId);

            if (json) {
                //console.log("데이터:", json);
                setContents(json);
            } else {
                //console.warn("no");
            }
        }
    });

});

// 제목, 내용을 바꿔주는 함수
export function setContents(data) {
    //console.log(data);
    
    const pageTitle = document.getElementById('page_title');
    const pageContents = document.getElementById('page_contents');
    
    pageTitle.value = data.title;
    pageContents.value = data.content;

    // 클릭한 페이지를 자동 저장하기 위한 호출
    AutoSave(data.id)
}

// 삭제했을 때 에디터 비워주기
export function clearEditor() {
    const pageTitle = document.getElementById('page_title');
    const pageContents = document.getElementById('page_contents');
  
    pageTitle.value = '';
    pageContents.value = '';
  }