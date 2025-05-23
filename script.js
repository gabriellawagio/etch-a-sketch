const gridwidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");


const sketchArea = document.querySelector('#sketch-area');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#slider-value');

const gridToggle = document.querySelector('#grid-toggle')

let squaresPerSide = 16;
let gridVisible = false;
let isDrawing = false;

function toggleGrid() {
    gridVisible = gridVisible  ? false : true;
    gridToggle.style.color = gridVisible  ? accentColor : inactiveColor;

    removeGridSquares();
    createGridSquares();
}

function changeBgColor(e) {
    if (e.type === 'mousedown'){
       isDrawing = true;
       e.target.style.backgroundColor = 'gray';  
    }
    else if (e.type === 'mouseover' && isDrawing) {
        e.target.style.backgroundColor = 'gray';
        
    }
    else isDrawing = false;
}

function createGridSquares() {
    const totalSquares = (squaresPerSide **2);
    for (let i = 0; i < totalSquares; i++) {
        const gridCell = document.createElement('div');
        let widthHeight = 0;

        if (gridVisible) {
            widthHeight = `${(parseInt(gridwidth) / squaresPerSide) -2}px`;
            gridCell.style.border = '1px solid whitesmoke';
        } else if (!gridVisible) {
            widthHeight = `${(parseInt(gridwidth) / squaresPerSide)}px`
            gridCell.style.border = 'none';
        }
        gridCell.style.width = gridCell.style.height = widthHeight; 

        gridCell.addEventListener('mousedown', (e) => changeBgColor(e));
        gridCell.addEventListener('mouseover', (e) => changeBgColor(e));
        gridCell.addEventListener('mouseup', (e) => changeBgColor(e));
        gridCell.addEventListener('dragstart', (e) => {e.preventDefault()});

        sketchArea.appendChild(gridCell);
    }
}

function removeGridSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild)
    }
}

slider.oninput = function(){
    squaresPerSide = this.value;
    sliderValue.textContent =`${this.value} by ${this.value} (Resolution)`;
    removeGridSquares();
    createGridSquares();
}

gridToggle.addEventListener('click', toggleGrid);
createGridSquares();