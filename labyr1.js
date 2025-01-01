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
		this.neighbour_nodes.push({ neighbour_node_id: neighbour_node_id, accessable: accessable });
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
	destination_node_id;

	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * @param {number} start_node_id
	 * @param {number} destination_node_id
	 * */
	constructor(nodes, start_node_id, destination_node_id) {

		if (this.is_valid_nodes(nodes)) {
			this.nodes = nodes
		}

		if (!nodes.find((node) => node.node_id === start_node_id)) {
			throw new Error("there is no node with currentNodeId in nodes");
		}
		if (!nodes.find((node) => node.node_id === destination_node_id)) {
			throw new Error("there is no node with destinationNodeId in nodes");
		}
		this.start_node_id = start_node_id;
		this.current_node_id = start_node_id;
		this.destination_node_id = destination_node_id;

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



	/**
	 * Find a node by its ID.
	 * @param {number} node_id
	 * @returns {GameNode | undefined}
	 */
	find_node(node_id) {
		return this.nodes.find(node => node.node_id === node_id);
	}

	/**
	 * @param {number} node_1_id
	 * @param {number} node_2_id
	 * @param {boolean} accessable
	 * */
	make_neighbour_to_node1(node_1_id, node_2_id, accessable) {

		let node_1 = this.find_node(node_1_id);
		let node_2 = this.find_node(node_2_id);

		if (node_1_id === node_2_id) {
			throw new Error(`Same nodes can not be neigbours`);
		}
		if (!node_1) {
			throw new Error(`there is no node_1 with ID: ${node_1_id}`);
		};
		if (!node_2) {
			throw new Error(`there is no node_2 with ID: ${node_2_id}`);
		}
		node_1.add_neighbour_node(node_2_id, accessable);
		// this.neighbour_nodes.add({ neighbour_node_id: neighbour_node_id, accessable: accessable });
	}
	/**
	 * @param {number} node_1_id
	 * @param {number} node_2_id
	 * @param {boolean} accessable
	 * */
	make_neighbour_nodes_same_accessablity(node_1_id, node_2_id, accessable) {

		let node_1 = this.find_node(node_1_id);
		let node_2 = this.find_node(node_2_id);

		if (node_1_id === node_2_id) {
			throw new Error(`Same nodes can not be neigbours`);
		}
		if (!node_1) {
			throw new Error(`there is no node_1 with ID: ${node_1_id}`);
		};
		if (!node_2) {
			throw new Error(`there is no node_2 with ID: ${node_2_id}`);
		}
		node_1.add_neighbour_node(node_2_id, accessable);
		node_2.add_neighbour_node(node_1_id, accessable);
		// this.neighbour_nodes.add({ neighbour_node_id: neighbour_node_id, accessable: accessable });
	}


	/**
	 * @returns {boolean}
	 */
	can_reach_destination() {

		const visited = new Set();

		const dfs = (current_node_id) => {

			if (visited.has(current_node_id)) {
				return false;
			}

			visited.add(current_node_id);

			let current_node = this.find_node(current_node_id);

			if (!current_node) {
				return false;
			}

			if (current_node_id === this.destination_node_id) {

				console.log("found", current_node_id);
				return true;
			}

			return current_node.neighbour_nodes.some((neighbour) => {
				return neighbour.accessable && dfs(neighbour.neighbour_node_id)
			});
		};

		return dfs(this.start_node_id);
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
	document.styleSheets.appendChild
	// .node:nth-child(${cols}n) {
	//   border-right: none;
	// }
	//
	// .node:nth-last-child(-n + ${cols}) {
	//   border-bottom: none;
	// }

	nodes.sort((node1, node2) => node1.node_id - node2.node_id).forEach((nodeData) => {
		let html_node = document.createElement("div");
		html_node.classList.add("node");
		html_node.id = nodeData.node_id;

		if (nodeData.node_id === game.start_node_id) {
			html_node.classList.add("current");
			html_node.classList.add("start");

			html_node.innerText = "Start";
		}
		if (nodeData.node_id === game.destination_node_id) {
			html_node.classList.add("destination");
			html_node.innerText = "Destination";
		}

		grid.appendChild(html_node);
	});

	document.querySelector(element_to_append).appendChild(grid);
	return;
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

	grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
	//remove borders from edges
	let styleText = document.getElementById('style').sheet;
	let borderRightRule = `.node:nth-child(${cols}n) { border-right: none; }`;  // Last element in each row
	let borderBottomRule = `.node:nth-last-child(-n + ${cols}) { border-bottom: none; }`;  // Last row
	styleText.insertRule(borderRightRule, styleText.cssRules.length);
	styleText.insertRule(borderBottomRule, styleText.cssRules.length);

	nodes.sort((node1, node2) => node1.node_id - node2.node_id).forEach((nodeData) => {

		let html_node = document.createElement("div");

		html_node.classList.add("node");
		html_node.id = nodeData.node_id;
		html_node.innerText = `NodeId: ${nodeData.node_id};`;
		nodeData.neighbour_nodes.forEach((neighbour) => {

			let neighbour_path = document.createElement("div");

			neighbour_path.innerText = `Path to: ${neighbour.neighbour_node_id} -- ${neighbour.accessable};`
			neighbour_path.classList.add("neighbour_path");
			html_node.appendChild(neighbour_path);
		})

		if (nodeData.node_id === game.start_node_id) {
			html_node.classList.add("current");
			html_node.classList.add("start");

			// html_node.innerText = "Start";
		}
		if (nodeData.node_id === game.destination_node_id) {
			html_node.classList.add("destination");
			// html_node.innerText = "Destination";
		}

		grid.appendChild(html_node);
	});

	document.querySelector(element_to_append).appendChild(grid);
	return;
}

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
let nodes = [
	new GameNode(1),
	new GameNode(2),
	new GameNode(3),
	new GameNode(4),

	// new GameNode(5),
	// new GameNode(6),
	// new GameNode(7),
	// new GameNode(8),
	// new GameNode(9),
	//
	// new GameNode(10),
	// new GameNode(11),
	// new GameNode(12),
	// new GameNode(13),
	// new GameNode(14),
	// new GameNode(15),
	// new GameNode(16),
];
let game = new GameGrid(nodes, 1, 4);

game.make_neighbour_nodes_same_accessablity(1, 2, true);
game.make_neighbour_nodes_same_accessablity(1, 3, true);
game.make_neighbour_nodes_same_accessablity(2, 4, true);
game.make_neighbour_nodes_same_accessablity(3, 4, true);

console.log(game.can_reach_destination());

render_nodes(game, "body");

select_walls_start(node_selector = ".node", max_closed_walls = 10);
