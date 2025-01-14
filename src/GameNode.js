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


	/**
	 * @param {number} neighbour_node_id
	 */
	toggle_neighbour_node_accessability(neighbour_node_id) {
		let index_of_neighbour_node;
		const neighbourNode = this.neighbour_nodes.find(
			(neighbour_node) => {
				return neighbour_node.neighbour_node_id === neighbour_node_id;
			}
		);
		// console.log(index_of_neighbour_node)
		if (neighbourNode) {
			neighbourNode.accessable = !neighbourNode.accessable;
		} else {
			new Error(`Neighbour node with ID ${neighbour_node_id} not found.`);
		}
	}
	//
}

