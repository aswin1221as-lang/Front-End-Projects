const generateBtn = document.querySelector("#generator-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", (e) => {
     
    if(e.target.classList.contains("copy-msg")){
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue).then(() => {
            showCopySuccess(e.target);
        }).catch((err) => console.error(err));
    }
    else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexValue).then(() => {
            showCopySuccess(e.target.nextElementSibling.querySelector(".copy-msg"));
        }).catch((err) => console.error(err)); 
    }
});

function showCopySuccess(element){
    element.classList.remove("far","fa-copy");
    element.classList.add("fas","fa-check");
    element.style.color = "#48bb78";
    setTimeout(() => {
        element.classList.remove("fas","fa-check");
        element.classList.add("far","fa-copy");
        element.style.color = "";
    }
    , 1000);
}

function generatePalette(){
    const colors = [];
    for(let i = 0; i < 5; i++){
        colors.push(generateRandomColor())
    }
    updatePaletteDisplay(colors);
}

function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color="#";

    for(let i = 0; i < 6; i++){
       color+=letters.charAt(Math.floor(Math.random() *16));
    }
    return color;
}

function updatePaletteDisplay(colors){
    const colorBoxes = paletteContainer.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}


generatePalette();

