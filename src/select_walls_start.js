/**
 * 
 * @param {Element} element 
 * @param {("Top"|"Right"|"Left"|"Bottom")} border_direction 
 */
function toggle_node_border(element, border_direction) {

	selectedBorder = "border" + border_direction + "Style";
	if (style[selectedBorder] === 'solid' && max_closed_walls > 0) {
		// element.style[selectedBorder] = 'hidden';
		element.style[selectedBorder] = 'dashed';
		max_closed_walls -= 1;
	}
	else if (style[selectedBorder] === 'dashed') {
		element.style[selectedBorder] = 'solid';
		max_closed_walls += 1;
	}
}
function select_walls_start(node_selector = ".node", max_closed_walls = 10) {

	let nodes = document.querySelectorAll(node_selector);
	nodes.forEach((node) => {
		node.addEventListener('click', (event) => {

			const element = event.target;
			const style = getComputedStyle(element);
			const offsetX = event.offsetX;
			const offsetY = event.offsetY;
			const innerWidth = element.clientWidth;
			const innerHeight = element.clientHeight;
			let selectedBorder;
			let selectedDirection;

			if (offsetX <= 0) {
				console.log('Left border!');
				selectedDirection = "Left";
			}
			else if (offsetY <= 0) {
				console.log('Top border!');

				selectedDirection = "Top";
			}
			else if (offsetX > innerWidth) {
				console.log('Right border');

				selectedDirection = "Right";
			}
			else if (offsetY > innerHeight) {
				selectedDirection = "Bottom";
			}
			else {
				console.log('Clicked inside the element, not on the border.');
			}

			selectedBorder = "border" + selectedDirection + "Style";


			if (style[selectedBorder] === 'solid' && max_closed_walls > 0) {
				// element.style[selectedBorder] = 'hidden';
				element.style[selectedBorder] = 'dashed';
				max_closed_walls -= 1;
			}
			else if (style[selectedBorder] === 'dashed') {
				element.style[selectedBorder] = 'solid';
				max_closed_walls += 1;
			}

		});
	});
}

