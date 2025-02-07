import { GameNode } from "./GameNode";
import { GameGrid } from "./GameGrid";
import { render_nodes, game_loop_move_by_button, make_labyrinth_from_code, toggle_doors_byuit_labytynth, render_nodes_door_access_visible } from "./render_game";
import { render_neighbour_grid_with_open_walls, } from "./labyrinth_builder";

let decode_object = document.querySelector("#decode_object");
if (decode_object) {
  decode_object.addEventListener("click", (ev) => {
    let incoded_object = document.querySelector("#incoded_object");
    try {
      let game = make_labyrinth_from_code(incoded_object.value);

      //NOTE: render number of player moves
      document.querySelector(
        "#number_of_player_moves"
      ).innerText = `Количесво ходов: ${game.player_path.length - 1}`;
      render_nodes(game);
      game_loop_move_by_button(game);
    } catch (er) {
      incoded_object.value = "";
      alert(er);
    }
  });
}



//NOTE: default render
// render_neighbour_grid_with_open_walls(9, 1, 1, 9)

let generate_labyrinth_button = document.querySelector("#generate_labyrinth");


function initialize_generate_labyrinth() {




  let number_of_nodes = parseInt(document.querySelector("#number_of_nodes").value);
  let start_position = parseInt(document.querySelector("#start_position").value);
  let destination_position = parseInt(document.querySelector("#destination_position").value);

  if (isNaN(number_of_nodes) || isNaN(start_position) || isNaN(destination_position)) {
    alert("Invalid inputs. Please ensure all values are filled in correctly.");
    return;
  }
  try {
    // render_neighbour_grid_with_open_walls(number_of_nodes, 1, start_position, destination_position);

    let game = new GameGrid(number_of_nodes, start_position, destination_position);
    game.make_neighbour_grid_with_open_walls();

    render_nodes_door_access_visible(game, ".container");
    toggle_doors_byuit_labytynth(game, ".container");


  } catch (er) {
    alert(er);
  }
}

if (generate_labyrinth_button) {
  generate_labyrinth_button.addEventListener("click", () => {

    // NOTE: .container clean up "copy object button"
    let existingForm = document.querySelector(".copy_labyrynth_form");
    if (existingForm) {
      existingForm.remove();
    }

    initialize_generate_labyrinth();
  });
  document.addEventListener("DOMContentLoaded", () => {
    initialize_generate_labyrinth();
  });

}
