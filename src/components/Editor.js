
document.addEventListener("DOMContentLoaded", () => {
    // 페이지(제목)를 눌렀을 때 editor에 내용 띄우기
    const parentsPages = Array.from(document.querySelectorAll('a'));
    const pageTitle = document.getElementById('page_title');
    const pageContents = document.getElementById('page_contents');

    parentsPages.forEach((page) => {
        page.addEventListener('click', async (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.id;
            console.log(pageId);
            try {
                const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${pageId}`, {
                  method: "GET",
                  headers: {
                    "Content-type" : "application/json",
                    "x-username": "4teamteam",
                  }
                });
                if (!response.ok) {
                  throw new Error("Network response was not ok!");
                }
                const json = await response.json();
                setContents(json);
              } catch (error) {
                console.error(error);
              }

            })

            function setContents(data){
                pageTitle.innerHTML = data["title"];
                pageContents.innerHTML = data["content"];

                // 배열을 초기화 하여 히스토리 비움
                // 새로운 페이지를 열 때는 
                //기존 기록을 다 버리고 새로 시작해야 하니까 히스토리를 완전히 초기화하는 것!
                // history.back = [];
                // history.forward = [];

            }
        })
    })