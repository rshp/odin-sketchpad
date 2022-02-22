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
clearGrid(gridContainer);

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
	let targetColor = parseRgbString(getComputedStyle(target).backgroundColor);
	switch (drawType) {
		case `bw`:
			target.style.backgroundColor = 'black';
			break;
		case `grayscale`:
			targetColor = targetColor.map((val) => (val -= 50));
			target.setAttribute(
				'style',
				`background-color: rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`
			);
			break;
		case `rnd-colors`:
			targetColor = Array.apply(null, Array(3));
			targetColor = targetColor.map((value) => {
				return Math.floor(Math.random() * 255);
			});
			console.log(targetColor);
			target.setAttribute(
				'style',
				`background-color: rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`
			);
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
	clearGrid(gridContainer);
}

function parseRgbString(rgb) {
	rgb = rgb.replace(/[^\d,]/g, '').split(',');
	return rgb;
}
