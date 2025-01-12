import { GameNode } from "./GameNode";
import { GameGrid } from "./GameGrid";

import { render_nodes, game_loop_move_by_button } from "./render_game";
// let nodes = [
//   new GameNode(1),
//   new GameNode(2),
//   new GameNode(3),
//   new GameNode(4),
//   new GameNode(5),
//   new GameNode(6),
//   new GameNode(7),
//   new GameNode(8),
//   new GameNode(9),
// ];
let start_position = 1;
let destination_position = 9;
let game = new GameGrid(9, start_position, destination_position);
// NOTE: 2 on 2 path
// game.make_neighbour_nodes_same_accessablity(1, 2, true);
// game.make_neighbour_nodes_same_accessablity(1, 3, false);
// game.make_neighbour_nodes_same_accessablity(2, 4, true);
// game.make_neighbour_nodes_same_accessablity(3, 4, true);

// closed dors 6
game.make_neighbour_nodes_same_accessablity(1, 2, false);
game.make_neighbour_nodes_same_accessablity(1, 4, true);
game.make_neighbour_nodes_same_accessablity(2, 3, true);
game.make_neighbour_nodes_same_accessablity(2, 5, true);
game.make_neighbour_nodes_same_accessablity(3, 6, true);
game.make_neighbour_nodes_same_accessablity(4, 5, false);
game.make_neighbour_nodes_same_accessablity(4, 7, true);
game.make_neighbour_nodes_same_accessablity(5, 6, false);
game.make_neighbour_nodes_same_accessablity(5, 8, true);
game.make_neighbour_nodes_same_accessablity(6, 9, true);
game.make_neighbour_nodes_same_accessablity(7, 8, true);
game.make_neighbour_nodes_same_accessablity(8, 9, false);

if (!game.can_reach_destination()) {
  alert("Ты дурачек, лабиринт без выхода");
  console.log(game.can_reach_destination());
}

render_nodes(game, "body");
game_loop_move_by_button(game);
