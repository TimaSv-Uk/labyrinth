import { GameNode } from "./GameNode";
import { GameGrid } from "./GameGrid";
import { render_nodes, game_loop_move_by_button, make_labyrinth_from_code, render_incode_button } from "./render_game";
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


let generate_labyrinth_button = document.querySelector("#generate_labyrinth");
if (generate_labyrinth_button) {

  //NOTE: default render
  render_neighbour_grid_with_open_walls(9, 1, 1, 9)
  render_incode_button(new GameGrid(9, 1, 9), "body");
  
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
}
