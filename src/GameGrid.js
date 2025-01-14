import { GameNode } from "./GameNode";

export class GameGrid {
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
	 * move from node_id to node_id on each move
	 * @type {[[number,number]]}
	 * */
	player_path;


	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * @param {number} start_node_id
	 * @param {number} destination_node_id
	 * */
	custom_nodes_constructor(nodes, start_node_id, destination_node_id) {

		if (this.is_valid_nodes(nodes)) {
			this.nodes = nodes;
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

		this.player_path = [[start_node_id, start_node_id]];

	}

	/**
	 *
	 * @param {number} number_of_nodes
	 * @param {number} start_node_id
	 * @param {number} destination_node_id
	 * */
	constructor(number_of_nodes, start_node_id, destination_node_id) {

		this.make_empty_nodes(number_of_nodes);

		if (start_node_id > number_of_nodes) {
			throw new Error("there is no node with startNodeId in nodes");
		}
		if (destination_node_id > number_of_nodes) {
			throw new Error("there is no node with destinationNodeId in nodes");
		}
		if (start_node_id === destination_node_id) {
			throw new Error(" startNodeId = destinationNodeId");
		}

		this.start_node_id = start_node_id;
		this.current_node_id = start_node_id;
		this.destination_node_id = destination_node_id;

		this.player_path = [[start_node_id, start_node_id]];

	}
	/**
	 *
	 * @param {number} number_of_nodes
	 * */
	make_empty_nodes(number_of_nodes) {

		let labyrynth_dymentions = Math.floor(Math.sqrt(number_of_nodes));

		let list_of_empty_nodes = [];
		for (let i = 1; i <= number_of_nodes; i++) {
			list_of_empty_nodes.push(new GameNode(i));
		};

		this.nodes = list_of_empty_nodes;
	}

	/**
	 *
	 * @param {number} number_of_nodes
	 * */
	get_neigbors_from(number_of_nodes) {


		let list_of_empty_nodes = [];
		for (let i = 1; i <= number_of_nodes; i++) {
			list_of_empty_nodes.push(new GameNode(i));
		};

		this.nodes = list_of_empty_nodes;
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
		});
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
	 * Check if movement is possible between two nodes.
	 * @param {number} selected_node_id
	 * @param {number} next_node_id
	 * @returns {boolean}
	 */
	can_move_from_to(selected_node_id, next_node_id) {

		if (this.find_node(selected_node_id)
			.neighbour_nodes
			.find(node => node.neighbour_node_id === next_node_id && node.accessable)) {
			return true
		}
		return false;
	}



	/**
	 * @param {number} node_1_id
	 * @param {number} node_2_id
	 * @returns {boolean} 
	 * */
	toggle_door(node_1_id, node_2_id) {

		let selected_node = this.find_node(node_1_id);

		if (selected_node) {
			// game.make_neighbour_to_node1(selected_node_id, next_node_id);

			selected_node.toggle_neighbour_node_accessability(node_2_id);
		}
		if (!this.can_reach_destination()) {

			//NOTE: return door to how it been
			selected_node.toggle_neighbour_node_accessability(node_2_id);
			return false;
		}

		return true;
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

				// console.log("found", current_node_id);
				return true;
			}

			return current_node.neighbour_nodes.some((neighbour) => {
				return neighbour.accessable && dfs(neighbour.neighbour_node_id);
			});
		};

		return dfs(this.start_node_id);
	}

	make_neighbour_grid_with_open_walls() {

		let labyrynth_dymentions = Math.floor(Math.sqrt(this.nodes.length));

		for (let i = 0; i < this.nodes.length; i++) {


			let current_node_loop = this.nodes[i];
			let left_node = (i % labyrynth_dymentions === 0 ? undefined : this.nodes[i - 1]);
			let top_node = this.nodes[i - labyrynth_dymentions];
			let right_node = (((i + 1) % labyrynth_dymentions === 0 && i > 0) ? undefined : this.nodes[i + 1]);
			let bottom_node = this.nodes[i + labyrynth_dymentions];
			if (left_node) {

				current_node_loop.add_neighbour_node(left_node.node_id, true);
			}

			if (right_node) {

				current_node_loop.add_neighbour_node(right_node.node_id, true);
			}

			if (top_node) {

				current_node_loop.add_neighbour_node(top_node.node_id, true);
			}

			if (bottom_node) {

				current_node_loop.add_neighbour_node(bottom_node.node_id, true);
			}
		};

	}
}

