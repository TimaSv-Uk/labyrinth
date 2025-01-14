import { decode, incode } from "./decode_oblject";
import { GameGrid } from "./GameGrid";
import { GameNode } from "./GameNode";
import { render_nodes, game_loop_move_by_button, render_nodes_door_access_visible, toggle_doors_byuit_labytynth, render_incode_button } from "./render_game";

/**  
 *  @param {number} number_of_nodes 
 *  @param {number} number_of_colsed_doors 
 **/
export function render_neighbour_grid_with_open_walls(number_of_nodes, number_of_colsed_doors, start_position, destination_position) {


	let game = new GameGrid(number_of_nodes, start_position, destination_position);
	game.make_neighbour_grid_with_open_walls();
	render_nodes_door_access_visible(game, "body");

	toggle_doors_byuit_labytynth(game);

	// game_loop_move_by_button(game);
}


/** @param {string} render_into 
 **/
export function render_labyrinth_builder(render_into = "body") {

	let labyrinth_builder = document.createElement("div");
	labyrinth_builder.classList.add("labyrinth_builder");
	let random_labyrinth_button = document.createElement("button");
	random_labyrinth_button.innerText = "Random labyrynth";

	random_labyrinth_button.addEventListener("click", () => render_neighbour_grid_with_open_walls(6));
	labyrinth_builder.appendChild(random_labyrinth_button);
	document.querySelector(render_into).appendChild(labyrinth_builder);
}


