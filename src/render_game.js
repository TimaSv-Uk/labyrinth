import { GameGrid } from "./GameGrid";
import { incode, decode } from "./decode_oblject";

/**
 * @param {GameGrid} game
 * @param {string} element_to_append
 * */

export function render_nodes(game, element_to_append = "#main_body") {
	let nodes = game.nodes;
	const parentElement = document.querySelector(element_to_append);
	if (!parentElement) {
		return;
	}
	// Check if the grid already exists
	let existingGrid = document.querySelector("#grid");
	if (existingGrid) {
		// Remove the existing grid
		parentElement.removeChild(existingGrid);
	}

	const grid = document.createElement("div");
	grid.id = "grid";

	// Calculate the number of columns
	let cols = Math.floor(Math.sqrt(nodes.length));

	grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

	nodes.sort((node1, node2) => node1.node_id - node2.node_id)
		.forEach((nodeData) => {
			let html_node = document.createElement("div");

			html_node.classList.add("node");
			html_node.id = nodeData.node_id;
			let node_inner_text = document.createElement("div");
			node_inner_text.innerText = `Номер клетки: ${nodeData.node_id};`;
			node_inner_text.classList.add("node_inner_text");
			html_node.appendChild(node_inner_text);

			let neighbour_nodes_div_wraper = document.createElement("div");

			neighbour_nodes_div_wraper.classList.add("neighbour_nodes_div_wraper");
			nodeData.neighbour_nodes.forEach((neighbour) => {
				let neighbour_path = document.createElement("button");
				neighbour_path.classList.add("neighbour_path");
				neighbour_path.id = `${neighbour.neighbour_node_id}`;
				neighbour_path.innerText = `Дверь к: ${neighbour.neighbour_node_id}`;

				let visited_from_to = game.player_path.find(
					(path) =>
						path[0] === nodeData.node_id &&
						path[1] === neighbour.neighbour_node_id
				);
				if (visited_from_to && neighbour.accessable) {
					neighbour_path.classList.add("visited");
				} else if (visited_from_to && !neighbour.accessable) {
					neighbour_path.classList.add("path_closed");
				}


				html_node.appendChild(neighbour_path);
			});


			if (nodeData.node_id === game.start_node_id) {
				html_node.classList.add("start");

				// html_node.innerText = "Start";
			}

			if (nodeData.node_id === game.current_node_id) {
				html_node.classList.add("current");

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
 * @param {GameGrid} game
 * @param {string} element_to_append
 * */

export function render_nodes_door_access_visible(game, element_to_append = "body") {
	let nodes = game.nodes;
	const parentElement = document.querySelector(element_to_append);

	// Check if the grid already exists
	let existingGrid = document.querySelector("#grid");
	if (existingGrid) {
		// Remove the existing grid
		parentElement.removeChild(existingGrid);
	}

	const grid = document.createElement("div");
	grid.id = "grid";

	// Calculate the number of columns
	let cols = Math.floor(Math.sqrt(nodes.length));

	grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

	nodes.sort((node1, node2) => node1.node_id - node2.node_id)
		.forEach((nodeData) => {
			let html_node = document.createElement("div");

			html_node.classList.add("node");
			html_node.id = nodeData.node_id;
			let node_inner_text = document.createElement("div");
			node_inner_text.innerText = `Номер клетки: ${nodeData.node_id};`;
			node_inner_text.classList.add("node_inner_text");
			html_node.appendChild(node_inner_text);

			let neighbour_nodes_div_wraper = document.createElement("div");

			neighbour_nodes_div_wraper.classList.add("neighbour_nodes_div_wraper");
			nodeData.neighbour_nodes.forEach((neighbour) => {
				let neighbour_path = document.createElement("button");
				neighbour_path.classList.add("neighbour_path");
				neighbour_path.id = `${neighbour.neighbour_node_id}`;
				neighbour_path.innerText = `Дверь к: ${neighbour.neighbour_node_id}`;

				let visited_from_to = game.player_path.find(
					(path) =>
						path[0] === nodeData.node_id &&
						path[1] === neighbour.neighbour_node_id
				);
				if (neighbour.accessable) {
					neighbour_path.classList.add("visited");
				} else if (!neighbour.accessable) {
					neighbour_path.classList.add("path_closed");
				}


				html_node.appendChild(neighbour_path);
			});


			if (nodeData.node_id === game.start_node_id) {
				html_node.classList.add("start");

				// html_node.innerText = "Start";
			}

			if (nodeData.node_id === game.current_node_id) {
				html_node.classList.add("current");

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
 * @param {GameGrid} game
 */
export function game_loop_move_by_button(game) {

	let move_buttons = document.querySelectorAll(".neighbour_path");
	move_buttons.forEach((move_button) => {
		move_button.addEventListener("click", (event) => {
			let selected_node = move_button.parentElement;
			let selected_node_id = parseInt(selected_node.id);
			if (parseInt(selected_node.id) !== game.current_node_id) {
				return;
			}

			let next_node_id = parseInt(move_button.id);
			console.log(game.find_node(1));
			if (game.can_move_from_to(selected_node_id, next_node_id)) {
				game.current_node_id = next_node_id;
			}

			game.player_path = [
				...game.player_path,
				[selected_node_id, next_node_id],
			];


			document.querySelector(
				"#number_of_player_moves"
			).innerText = `Количесво ходов: ${game.player_path.length - 1}`;
			//NOTE: to rerender game board and attach EventListener
			// TODO: Win scenario
			if (game.current_node_id === game.destination_node_id) {

				console.log("you win");
				// Number of player moves:
				alert(`you win in ${game.player_path.length - 1} moves`);
				render_nodes_door_access_visible(game);
				return;
			}


			render_nodes(game);
			game_loop_move_by_button(game);
			// move_button.classList.add("path_closed");
		});
	});
}

/**
 * @param {GameGrid} game
 * @param {string} parentElement
 */
export function render_incode_button(game, parentElement) {
	// Виберіть батьківський елемент
	let parent_element = document.querySelector(parentElement);

	// Видаліть будь-яку існуючу форму з тим самим ID
	let existingForm = document.querySelector(".copy_labyrynth_form");
	if (existingForm) {
		existingForm.remove();
	}

	let formHTML = `
        <div id="generate_labyrinth_form" class="copy_labyrynth_form">
            <br/>
            <button id="copy_labyrynth_code" value="none">Cкопіювати код лабіринту</button>
        </div>
	    `;
	parent_element.insertAdjacentHTML('afterend', formHTML);
	// Виберіть кнопку копіювання та встановіть її значення на закодований об'єкт гри
	let copy_labyrynth_code = document.querySelector("#copy_labyrynth_code");
	copy_labyrynth_code.value = incode(game);
	copy_labyrynth_code.innerText = "Скопіювати код лабіринту";

	// Додайте обробник події кліку для копіювання коду лабіринту
	copy_labyrynth_code.addEventListener("click", () => {
		navigator.clipboard.writeText(copy_labyrynth_code.value);
	});
}
/**
 * @param {GameGrid} game
 */
export function toggle_doors_byuit_labytynth(game,element_to_append = "body") {

	let move_buttons = document.querySelectorAll(".neighbour_path");
	move_buttons.forEach((move_button) => {
		move_button.addEventListener("click", (event) => {
			let selected_node_id = parseInt(move_button.parentElement.id);
			let next_node_id = parseInt(move_button.id);

			let toggle_door = game.toggle_door(selected_node_id, next_node_id);
			//succesfuly toogle door
			if (!toggle_door) {
				alert("Неможливо створити непроходимий лабіринт");
			}


			//NOTE: to rerender game board and attach EventListener
			render_nodes_door_access_visible(game, element_to_append);
			toggle_doors_byuit_labytynth(game);
			render_incode_button(game, element_to_append);
			// move_button.classList.add("path_closed");
		});
	});
}
/**
    *@param {string} incoded_labyrinth 
    *@returns {GameGrid}
*/
export function make_labyrinth_from_code(incoded_labyrinth) {

	let game = decode(incoded_labyrinth);

	// render_nodes_door_access_visible(game, "body");
	//
	// toggle_doors_byuit_labytynth(game);
	return game;
}
