const slider = document.getElementById('myRange');
const output = document.getElementById('demo');
const gridContainer = document.getElementsByClassName('sketchpad-container')[0];
const clearButton = document.getElementById('button-clear');
const nav = document.getElementsByTagName('nav')[0];
const mainArea = document.getElementsByClassName('main-area')[0];
let bordersStatus = false;
let mouseDown = false;
let drawType = 'bw';

//Sync section
output.innerHTML = slider.value;
let gridSize = slider.value;
generateGrid(gridContainer, gridSize);

//Async section
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
		case `dropdwn-bw`:
			drawType = 'bw';
			break;
		case `dropdwn-grayscale`:
			drawType = 'grayscale';
			break;
		case `rnd-colors`:
			drawType = 'rnd-colors';
			break;
	}
	console.log(e.target);
});

gridContainer.addEventListener('mouseover', (e) => {
	if (!mouseDown) return;
	fillCell(e.target);
	e.preventDefault();
});

mainArea.addEventListener('mousedown', (e) => {
	mouseDown = true;
	e.preventDefault();
});
mainArea.addEventListener('mouseup', (e) => {
	mouseDown = false;
	e.preventDefault();
});

function fillCell(target) {
	switch (drawType) {
		case `bw`:
			target.style.backgroundColor = 'black';
			break;
		case `grayscale`:
			target.style.backgroundColor = 'blue';
			break;
		case `rnd-colors`:
			target.style.backgroundColor = 'yellow';
			break;
	}
}

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
