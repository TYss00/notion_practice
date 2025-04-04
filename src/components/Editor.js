document.addEventListener("DOMContentLoaded", () => {
    const pageList = document.getElementById('page_list');

    pageList.addEventListener('click', async (e) => {
        const update = e.target;

        if (update.tagName === 'A') {
            e.preventDefault();
            const pageId = update.dataset.id;
            //console.log('클릭된 페이지 ID:', pageId);

            
            window.history.pushState[{},'',`/documents/${pageId}`]
            const json = await getDocumentById(pageId);
            setContents(json);
        }
    });
});

// 제목, 내용을 바꿔주는 함수
function setContents(data) {
    //console.log(data);
    
    const pageTitle = document.getElementById('page_title');
    const pageContents = document.getElementById('page_contents');
    
    pageTitle.value = data.title ;
    pageContents.value = data.content ;

    // 클릭한 페이지를 자동 저장하기 위한 호출
    AutoSave(data.id)
}