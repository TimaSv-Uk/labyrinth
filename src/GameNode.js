export class GameNode {

	/**
	 * @type {Array<{ neighbour_node_id: neighbour_node_id, accessable: accessable }>}
	 * */
	neighbour_nodes = [];

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

