class GameNode {

	/**
	 * @type {Array<{ neighbour_node_id: neighbour_node_id, accessable: accessable }>}
	 * */
	neighbour_nodes = []

	/**
	 * @param {number} node_id
	 * @param {boolean} is_start
	 * @param {boolean} is_destination
	 * */
	constructor(node_id, is_start, is_destination) {
		this.node_id = node_id;
		this.is_start = is_start;
		this.is_destination = is_destination;
	}


	/**
	 * @param {number} neighbour_node_id
	 * @param {boolean} accessable
	 * */
	add_neighbour_node(neighbour_node_id, accessable) {
		this.neighbour_nodes.add({ neighbour_node_id: neighbour_node_id, accessable: accessable });
	}
}




class GameGrid {
	/**
	 *
	 * @type {Array<GameNode>} nodes
	 * */
	nodes;
	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * */
	constructor(nodes) {
		if (this.is_valid_sells(nodes)) {
			this.nodes = nodes
		}
	}
	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * */
	is_valid_sells(nodes) {

		let number_of_starts = 0;
		let number_of_destinations = 0;
		let ids_seen = new Set();
		let duplicate_ids = new Set();

		nodes.forEach((node) => {
			if (node.is_start) {
				number_of_starts++;
			}
			if (node.is_destination) {
				number_of_destinations++;
			}

			if (ids_seen.has(node.node_id)) {
				duplicate_ids.add(node.node_id);
			} else {
				ids_seen.add(node.node_id);
			}

		})
		const errors = [];
		if (number_of_starts === 0) {
			errors.push("No start node in nodes.");
		} else if (number_of_starts > 1) {
			errors.push("There can be only one start node in nodes.");
		}

		if (number_of_destinations === 0) {
			errors.push("No destination node in nodes.");
		} else if (number_of_destinations > 1) {
			errors.push("There can be only one destination node in nodes.");
		}

		if (duplicate_ids.size > 0) {
			errors.push(`Duplicate IDs found: ${Array.from(duplicate_ids).join(", ")}`);
		}

		if (errors.length > 0) {
			throw new Error(errors.join("\n"));
		}

		return true;
	}

}


function render_nodes(nodes, element_to_append = "body") {

	const grid = document.createElement("div");
	grid.id = "grid";

	// Calculate the number of columns
	let cols = Math.floor(Math.sqrt(nodes.length));
	grid.style.gridTemplateColumns = `repeat(${cols}, auto)`;

	nodes.sort((node1, node2) => node1.node_id - node2.node_id).forEach((nodeData, id) => {
		let html_node = document.createElement("div");
		html_node.classList.add("node");
		html_node.id = nodeData.node_id;

		if (nodeData.is_start) {
			html_node.classList.add("current");
			html_node.classList.add("start");

			html_node.innerText = "Start";
		}
		if (nodeData.is_destination) {
			html_node.classList.add("destination");
			html_node.innerText = "Destination";
		}

		grid.appendChild(html_node);
	});

	document.querySelector(element_to_append).appendChild(grid);
	return
}


function select_walls_start(node_selector = ".node", max_closed_walls = 10) {

	let nodes = document.querySelectorAll(node_selector); nodes.forEach((node) => {
		node.addEventListener('click', (event) => {


			const element = event.target;

			const style = getComputedStyle(element);
			const borderWidth = parseInt(style.borderWidth);
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
let nodes = [
	new GameNode(1, true, false),
	new GameNode(2, false, false),
	new GameNode(3, false, false),
	new GameNode(4, false, false),
	new GameNode(5, false, false),
	new GameNode(6, false, false),
	new GameNode(7, false, false),
	new GameNode(8, false, false),
	new GameNode(9, false, true),
];
let game = new GameGrid(nodes);

render_nodes(game.nodes, "body");
select_walls_start(node_selector = ".node", max_closed_walls = 10);
