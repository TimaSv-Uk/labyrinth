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
	 *
	 * @type {number[]}
	 * */
	player_path;

	/**
	 *
	 * @param {Array<GameNode>} nodes
	 * @param {number} start_node_id
	 * @param {number} destination_node_id
	 * */
	constructor(nodes, start_node_id, destination_node_id) {

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
		this.player_path = [start_node_id];

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
	 * @param {number} selected_node_id
	 * @param {number} next_node_id
	 * @returns {boolean}
	 */
	can_move_from_to(selected_node_id, next_node_id) {
		console.log(this.find_node(selected_node_id)
			.neighbour_nodes
			.find(node => node.neighbour_node_id === next_node_id && node.accessable))
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
				return neighbour.accessable && dfs(neighbour.neighbour_node_id);
			});
		};

		return dfs(this.start_node_id);
	}
}

