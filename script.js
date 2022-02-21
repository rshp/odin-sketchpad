//Pseudocode
//Read user grid size setting
//  Get grid size from document
//  On document change - clean and redraw grid
//Create grid from user settings
//
//Create events for grid
//
//User events callback on grid setting change
//  get size, style, border
//
//
//
//
//
//
//
//
const slider = document.getElementById('myRange');
const output = document.getElementById('demo');
const gridContainer = document.getElementsByClassName('sketchpad-container')[0];
output.innerHTML = slider.value;

let gridSize = slider.value;
generateGrid(gridContainer, gridSize);

slider.oninput = function () {
	clearElement(gridContainer);
	output.innerHTML = this.value;
	generateGrid(gridContainer, this.value);
};

function clearElement(gridContainer) {
	while (gridContainer.firstChild) {
		gridContainer.firstChild.remove();
	}
}

function generateGrid(gridContainer, gridSize) {
	const divList = Array.apply(null, Array((+gridSize) ** 2));
	divList.forEach((element, index) => {
		divList[index] = document.createElement('div');
		divList[index].classList.add('grid-cell');
	});
	gridContainer.append(...divList);
	gridContainer.setAttribute(
		'style',
		`grid-template-columns: repeat(${gridSize}, 1fr)`
	);
}
