import { decode, incode } from "./decode_oblject";
import { GameGrid } from "./GameGrid";
import { GameNode } from "./GameNode";
import { render_nodes, game_loop_move_by_button, render_nodes_door_access_visible } from "./render_game";

/**  
 *  @param {number} number_of_nodes 
 *  @param {number} number_of_colsed_doors 
 **/
function render_neighbour_grid_with_open_walls(number_of_nodes, number_of_colsed_doors, start_position, destination_position) {


	let game = new GameGrid(number_of_nodes, start_position, destination_position);
	game.make_neighbour_grid_with_open_walls();
	render_nodes_door_access_visible(game, "body");

	let copy_labyrynth_code = document.querySelector("#copy_labyrynth_code");
	copy_labyrynth_code.value = incode(game);
	copy_labyrynth_code.innerText = "Copy labyrynth code";

	copy_labyrynth_code.addEventListener("click", (ev) => {
		navigator.clipboard.writeText(copy_labyrynth_code.value)
	})
	
	// game_loop_move_by_button(game);
}
function make_labyrinth_from_code(incoded_labyrinth) {

	let game = decode(incoded_labyrinth);

	render_nodes_door_access_visible(game, "body");
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
// get_neigbors_from_labyrynth_dymentions(arr)
let generate_labyrinth_button = document.querySelector("#generate_labyrinth");
generate_labyrinth_button.addEventListener("click", (ev) => {
	// let number_of_closed_doors = document.querySelector("#number_of_closed_doors").value;
	let number_of_nodes = document.querySelector("#number_of_nodes").value;

	let start_position = parseInt(document.querySelector("#start_position").value);
	let destination_position = parseInt(document.querySelector("#destination_position").value);
	// if (number_of_nodes === "" || number_of_closed_doors === "") {
	// 	alert("Enter number ")
	// }

	try {
		render_neighbour_grid_with_open_walls(number_of_nodes, 1, start_position, destination_position)
	} catch (er) {
		alert(er)
	}
});

let decode_object = document.querySelector("#decode_object");
decode_object.addEventListener("click", (ev) => {
	let incoded_object = document.querySelector("#incoded_object").value;
	try {
		make_labyrinth_from_code(incoded_object)
	} catch (er) {
		alert("Invalid code")
	}
});

