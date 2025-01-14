import { decode, incode } from "./decode_oblject";
import { GameGrid } from "./GameGrid";
import { GameNode } from "./GameNode";
import { render_nodes, game_loop_move_by_button, render_nodes_door_access_visible, toggle_doors_byuit_labytynth } from "./render_game";

/**  
 *  @param {number} number_of_nodes 
 *  @param {number} number_of_colsed_doors 
 **/
function render_neighbour_grid_with_open_walls(number_of_nodes, number_of_colsed_doors, start_position, destination_position) {


	let game = new GameGrid(number_of_nodes, start_position, destination_position);
	game.make_neighbour_grid_with_open_walls();
	render_nodes_door_access_visible(game, "body");

	toggle_doors_byuit_labytynth(game);

	// game_loop_move_by_button(game);
}


/** @param {string} render_into 
 **/
function render_labyrinth_builder(render_into = "body") {

	let labyrinth_builder = document.createElement("div");
	labyrinth_builder.classList.add("labyrinth_builder");
	let random_labyrinth_button = document.createElement("button");
	random_labyrinth_button.innerText = "Random labyrynth";

	random_labyrinth_button.addEventListener("click", () => render_neighbour_grid_with_open_walls(6));
	labyrinth_builder.appendChild(random_labyrinth_button);
	document.querySelector(render_into).appendChild(labyrinth_builder);
}


let generate_labyrinth_button = document.querySelector("#generate_labyrinth");
generate_labyrinth_button.addEventListener("click", (ev) => {

	let number_of_nodes = document.querySelector("#number_of_nodes").value;

	let start_position = parseInt(document.querySelector("#start_position").value);
	let destination_position = parseInt(document.querySelector("#destination_position").value);

	try {
		render_neighbour_grid_with_open_walls(number_of_nodes, 1, start_position, destination_position)
	} catch (er) {

		alert(er)
	}
});

