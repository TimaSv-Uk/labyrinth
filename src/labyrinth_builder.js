import { GameGrid } from "./GameGrid";
import { GameNode } from "./GameNode";
import { render_nodes, game_loop_move_by_button } from "./render_game";

/**  
 *  @param {number} number_of_colsed_doors 
 **/
function make_random_labyrinth(number_of_colsed_doors) {


	let start_position = 1;
	let destination_position = 9;
	let game = new GameGrid(10, start_position, destination_position);
	game.make_neighbour_grid_with_open_walls();
	render_nodes(game, "body");
	game_loop_move_by_button(game);
}


/** @param {string} render_into 
 **/
function render_labyrinth_builder(render_into = "body") {

	let labyrinth_builder = document.createElement("div");
	labyrinth_builder.classList.add("labyrinth_builder");
	let random_labyrinth_button = document.createElement("button");
	random_labyrinth_button.innerText = "Random labyrynth";

	random_labyrinth_button.addEventListener("click", () => make_random_labyrinth(6));
	labyrinth_builder.appendChild(random_labyrinth_button);
	document.querySelector(render_into).appendChild(labyrinth_builder);
}


/**@param {number[]} nodes 
	*/
function get_neigbors_from_labyrynth_dymentions(nodes) {

	let labyrynth_dymentions = Math.floor(Math.sqrt(nodes.length));
	// console.log(labyrynth_dymentions);

	for (let i = 0; i < nodes.length; i++) {
		let current_element = nodes[i];

		console.log({
			current_element: nodes[i],
			left: (i % labyrynth_dymentions === 0 ? undefined : nodes[i - 1]),
			top: nodes[i - labyrynth_dymentions],
			right: (((i + 1) % labyrynth_dymentions === 0 && i > 0) ? undefined : nodes[i + 1]),
			bottom: nodes[i + labyrynth_dymentions]
		});
	};

}
// make_random_labyrinth();
let arr = []
for (let i = 1; i <= 9; i++) {
	arr.push(i);
}
// get_neigbors_from_labyrynth_dymentions(arr)
render_labyrinth_builder()

