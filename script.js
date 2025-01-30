const gridwidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");


const container = document.querySelector(".container")
const sketchArea = document.querySelector('#sketch-area');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#slider-value');

const gridToggle = document.querySelector('#grid-toggle')

let squaresPerSide = 16;
let gridVisible = false;

function toggleGrid() {
    gridVisible = gridVisible  ? false : true;
    gridToggle.style.color = gridVisible  ? accentColor : inactiveColor;

    removeGridCells();
    createGridCells();
}

function changeBgColor() {
    this.style.backgroundColor = 'gray';
}

function createGridCells() {
    const totalSquares = (squaresPerSide **2);
    for (let i = 0; i < totalSquares; i++) {
        const gridCell = document.createElement('div');

        if (gridVisible) {
            widthHeight = `${(parseInt(gridwidth) / squaresPerSide) -2}px`;
            gridCell.style.border = '1px solid whitesmoke';
        } else if (!gridVisible) {
            widthHeight = `${(parseInt(gridwidth) / squaresPerSide)}px`
        }
        gridCell.style.width = gridCell.style.height = widthHeight; 
        
        gridCell.classList.add('cell');

        sketchArea.appendChild(gridCell);

        gridCell.addEventListener('mouseover', changeBgColor);
    }
}

function removeGridCells() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild)
    }
}

slider.oninput = function(){
    let txt = `Grid: ${this.value} by ${this.value}`;
    sliderValue.innerHTML = txt;
    removeGridCells();
    createGridCells(this.value);
}

createGridCells();