import { GameNode } from "./GameNode";
import { GameGrid } from "./GameGrid";

/**
 * @param {GameGrid} game 
 * @param {string} element_to_append 
 * */
function render_nodes(game, element_to_append = "body") {
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

  nodes.sort((node1, node2) => node1.node_id - node2.node_id).forEach((nodeData) => {

    let html_node = document.createElement("div");

    html_node.classList.add("node");
    html_node.id = nodeData.node_id;
    html_node.innerText = `NodeId: ${nodeData.node_id};`;
    nodeData.neighbour_nodes.forEach((neighbour) => {
      let neighbour_path = document.createElement("button");
      neighbour_path.classList.add("neighbour_path");
      neighbour_path.id = `${neighbour.neighbour_node_id}`;
      // neighbour_path.innerText = `path to: ${neighbour.neighbour_node_id} -- ${neighbour.accessable}`;
      neighbour_path.innerText = `path to: ${neighbour.neighbour_node_id}`;


      let visited_from_to = game.player_path.find((path) => path[0] === nodeData.node_id && path[1] === neighbour.neighbour_node_id);
      if (visited_from_to && neighbour.accessable) {

        neighbour_path.classList.add("visited");
      } else if (visited_from_to && !neighbour.accessable) {

        // neighbour_path.classList.add("visited");
        neighbour_path.classList.add("path_closed");
      };

      html_node.appendChild(neighbour_path);
    })

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
function game_loop_move_by_button(game) {

  let move_buttons = document.querySelectorAll(".neighbour_path");
  move_buttons.forEach((move_button) => {
    move_button.addEventListener("click", (event) => {
      let selected_node = move_button.parentElement;
      let selected_node_id = parseInt(selected_node.id)
      if (parseInt(selected_node.id) !== game.current_node_id) {
        return
      }

      let next_node_id = parseInt(move_button.id);



      if (game.can_move_from_to(selected_node_id, next_node_id)) {

        game.current_node_id = next_node_id;

      };

      game.player_path = [...game.player_path, [selected_node_id, next_node_id]];

      // TODO: Win scenario
      if (game.current_node_id === game.destination_node_id) {
        console.log("you win");
        // Number of player moves:
        alert(`you win in ${game.player_path.length - 1} moves`);
      }

      //NOTE: render number of player moves 
      document.querySelector("#number_of_player_moves").innerText = `Побьеда за ходов: ${game.player_path.length - 1}`;
      console.log("Побьеда за ходов", game.player_path.length - 1);

      //NOTE: to rerender game board and attach EventListener
      render_nodes(game, "body");
      game_loop_move_by_button(game);
      // move_button.classList.add("path_closed");

    })
  })

}

let nodes = [
  new GameNode(1),
  new GameNode(2),
  new GameNode(3),
  new GameNode(4),
  new GameNode(5),
  new GameNode(6),
  new GameNode(7),
  new GameNode(8),
  new GameNode(9),
];
let start_position = 1;
let destination_position = 9;
let game = new GameGrid(nodes, start_position, destination_position);

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


if(!game.can_reach_destination()){
  alert("Ты дурачек, лабиринт без выхода");
  console.log(game.can_reach_destination());
}

render_nodes(game, "body");
game_loop_move_by_button(game);
