
window.addEventListener("load", () => {
    loadSavedBookMarkSaverList();
});

window.addEventListener("load", () =>{
    loadRemovedBookMarkSaverList();
});


function addBookMark(){
    var bookmarkName = document.querySelector("#name").value;
    var bookmarkUrl = document.querySelector("#url").value;

    if(bookmarkName !== null && bookmarkUrl !== null){
        createBookMarkSaverList(bookmarkName,bookmarkUrl);
    }
    else{
        alert("Enter the missing field");
        return;
    }

}

function createBookMarkSaverList(bookmarkName,bookmarkUrl){
    let bookMarkListElement = document.querySelector(".bookmark-saver-list");

    let bookMarkList = document.createElement("div");

    bookMarkList.classList.add("list-item");
    
    bookMarkList.innerHTML = `
    <a href="${bookmarkUrl}" target="_blank">${bookmarkName}</a>
    <button class="remove-btn" onclick="removeBookMark(event)">Remove</button>
    `;

    let saveBookMarkList = JSON.parse(localStorage.getItem("saveBookMarkList")) || [];

    saveBookMarkList.push({
        bookmarkName : bookmarkName,
        bookmarkUrl : bookmarkUrl
    });

    bookMarkListElement.prepend(bookMarkList);

    localStorage.setItem("saveBookMarkList",JSON.stringify(saveBookMarkList)) || [] ;
}

function removeBookMark(event){
    const item = event.target.parentNode;
    const link = item.querySelector("a");
    const urlToRemove = link.getAttribute("href");

    item.remove();

    let saveBookMarkList = JSON.parse(localStorage.getItem("saveBookMarkList")) || [];
    
    let updatedList = saveBookMarkList.filter(entry => entry.bookmarkUrl !== urlToRemove);

    localStorage.setItem("saveBookMarkList",JSON.stringify(updatedList));

}

function loadSavedBookMarkSaverList(){
    let bookMarkList = document.querySelector(".bookmark-saver-list");

    let saveBookMarkList = JSON.parse(localStorage.getItem("saveBookMarkList")) || [];

    saveBookMarkList.forEach(e => {
        const bookMarkList1 = document.createElement("div");

        bookMarkList1.classList.add("list-item");

        bookMarkList1.innerHTML =`
        <a href="${e.bookmarkUrl}" target="_blank">${e.bookmarkName}</a>
        <button class="remove-btn" onclick="removeBookMark(event)">Remove</button>
        `;
    
        bookMarkList.prepend(bookMarkList1);
    });
}