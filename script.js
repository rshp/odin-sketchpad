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
const clearButton = document.getElementById('button-clear');
const nav = document.getElementsByTagName('nav')[0];
let bordersStatus = false;

output.innerHTML = slider.value;

let gridSize = slider.value;
generateGrid(gridContainer, gridSize);

slider.oninput = function () {
	clearElement(gridContainer);
	output.innerHTML = this.value;
	generateGrid(gridContainer, this.value);
};

nav.addEventListener('click', (e) => {
	switch (e.target.id) {
		case 'button-clear':
			clearGrid(gridContainer);
			break;
		case 'button-borders':
			toggleBorders(gridContainer);
			bordersStatus = !bordersStatus;
			break;
	}
	console.log(e.target);
});

function toggleBorders(gridContainer) {
	gridContainer.childNodes.forEach((element) => {
		element.classList.toggle('grid-show-borders');
	});
}

function clearElement(gridContainer) {
	while (gridContainer.firstChild) {
		gridContainer.firstChild.remove();
	}
}

function clearGrid(gridContainer) {
	for (const element of gridContainer.childNodes) {
		element.style.backgroundColor = `white`;
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
	if (bordersStatus) {
		toggleBorders(gridContainer);
	}
}
