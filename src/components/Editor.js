
document.addEventListener("DOMContentLoaded", () => {
    // 사이드 바 접기 기능
    // const sidebar = document.getElementById('sidebar');
    // const sidebarButton = document.getElementById('sidebar_toggle');
    // sidebarButton.addEventListener('click', (e) => {
    //     sidebar.className = "closed";
    // })

    // 새 페이지 추가 버튼 눌렀을 때

    const addNewPages = Array.from(document.getElementsByClassName('add_new_page'));
    addNewPages.forEach((button) => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch("https://kdt-api.fe.dev-cos.com/documents", {
                  method: "POST",
                  headers: {
                    "Content-type" : "application/json",
                    "x-username": "4teamteam",
                  },
                  body: JSON.stringify({
                    title: "첫 번째 문서",
                    parent: null,
                  }),
                });
                if (!response.ok) {
                  throw new Error("Network response was not ok!");
                }
                const data = await response.json();
                addPagesList(data);
              } catch (error) {
                console.error(error);
              }
        })
    })

    function addPagesList(data) {
        const pageList = document.getElementById('page_list');
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.href = "#";
        a.id = data.id;
        a.textContent = data.title || "Title";
        li.appendChild(a);
        pageList.appendChild(li);
    }
       

    // 부모 페이지를 눌렀을 때 editor에 내용 띄우기
    const parentsPages = Array.from(document.querySelectorAll('#page_list > li'));
    //console.log(ParentsPages);
    parentsPages.forEach((page) => {
        page.addEventListener('click', (e) => {
            e.preventDefault();
            
        })
    })


})