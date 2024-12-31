class GameNode {

	/**
	 * @type {Array<{ neighbour_node_id: neighbour_node_id, accessable: accessable }>}
	 * */
	neighbour_nodes = []

	/**
	 * @type {number}
	 * */
	node_id;


	/**
	 * @param {number} node_id
	 * */
	constructor(node_id) {
		this.node_id = node_id;
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
	 * @type {Array<GameNode>} 
	 * */
	nodes;

	/**
	 *
	 * @type {number} 
	 * */
	current_node_id;

	/**
	 *
	 * @type {number} 
	 * */
	start_node_id;

	/**
	 *
	 * @type {number} 
	 * */
	destinations_node_id;

	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * @param {number} start_node_id
	 * @param {number} destinations_node_id
	 * */
	constructor(nodes, start_node_id, destinations_node_id) {

		if (this.is_valid_nodes(nodes)) {
			this.nodes = nodes
		}

		if (!nodes.find((node) => node.node_id === start_node_id)) {
			throw new Error("there is no node with currentNodeId in nodes");
		}
		if (!nodes.find((node) => node.node_id === destinations_node_id)) {
			throw new Error("there is no node with destinationNodeId in nodes");
		}
		this.start_node_id = start_node_id;
		this.current_node_id = start_node_id;
		this.destinations_node_id = destinations_node_id;

	}
	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * */
	is_valid_nodes(nodes) {

		let ids_seen = new Set();
		let duplicate_ids = new Set();

		nodes.forEach((node) => {
			if (ids_seen.has(node.node_id)) {
				duplicate_ids.add(node.node_id);
			} else {
				ids_seen.add(node.node_id);
			}
		})
		const errors = [];

		if (duplicate_ids.size > 0) {
			errors.push(`Duplicate IDs found: ${Array.from(duplicate_ids).join(", ")}`);
		}

		if (errors.length > 0) {
			throw new Error(errors.join("\n"));
		}

		return true;
	}

}
/**
 * @param {GameGrid} game 
 * @param {string} element_to_append 
 * */
function render_nodes(game, element_to_append = "body") {
	let nodes = game.nodes;
	const grid = document.createElement("div");
	grid.id = "grid";

	// Calculate the number of columns
	let cols = Math.floor(Math.sqrt(nodes.length));
	grid.style.gridTemplateColumns = `repeat(${cols}, auto)`;


	nodes.sort((node1, node2) => node1.node_id - node2.node_id).forEach((nodeData, id) => {
		let html_node = document.createElement("div");
		html_node.classList.add("node");
		html_node.id = nodeData.node_id;

		if (nodeData.node_id === game.start_node_id) {
			html_node.classList.add("current");
			html_node.classList.add("start");

			html_node.innerText = "Start";
		}
		if (nodeData.node_id === game.destinations_node_id) {
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
let game = new GameGrid(nodes, 1, 9);

render_nodes(game, "body");

select_walls_start(node_selector = ".node", max_closed_walls = 10);
