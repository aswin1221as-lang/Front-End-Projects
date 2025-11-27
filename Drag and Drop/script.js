const items = document.querySelectorAll(".list-item");
const dropZones = document.querySelectorAll(".drop-zone");

items.forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});

dropZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("dragenter", dragEnter);
    zone.addEventListener("dragleave", dragLeave);
    zone.addEventListener("drop", dragDrop);
});

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
    console.log("drag ended");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const item = document.getElementById(id);

    this.querySelector("ul").appendChild(item);
    this.classList.remove("over");
}
