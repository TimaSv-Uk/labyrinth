import { GameNode } from "./GameNode";
import { GameGrid } from "./GameGrid";
import { render_nodes, game_loop_move_by_button, make_labyrinth_from_code } from "./render_game";

// let start_position = 1;
// let destination_position = 9;
// let game = new GameGrid(9, start_position, destination_position);


// if (!game.can_reach_destination()) {
//   alert("Ты дурачек, лабиринт без выхода");
//   console.log(game.can_reach_destination());
// }

let decode_object = document.querySelector("#decode_object");
decode_object.addEventListener("click", (ev) => {
  let incoded_object = document.querySelector("#incoded_object");
  try {
    let game = make_labyrinth_from_code(incoded_object.value);
    render_nodes(game);
    game_loop_move_by_button(game);
  } catch (er) {
    incoded_object.value = "";
    alert(er);
    // alert("Invalid code")
  }
});

