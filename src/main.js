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
      neighbour_path.innerText = `path to: ${neighbour.neighbour_node_id} -- ${neighbour.accessable}`;
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
 * 
 * @param {Element} element 
 * @param {("Top"|"Right"|"Left"|"Bottom")} border_direction 
 */
function toggle_node_border(element, border_direction) {

  selectedBorder = "border" + border_direction + "Style";
  if (style[selectedBorder] === 'solid' && max_closed_walls > 0) {
    // element.style[selectedBorder] = 'hidden';
    element.style[selectedBorder] = 'dashed';
    max_closed_walls -= 1;
  }
  else if (style[selectedBorder] === 'dashed') {
    element.style[selectedBorder] = 'solid';
    max_closed_walls += 1;
  }
}
function select_walls_start(node_selector = ".node", max_closed_walls = 10) {

  let nodes = document.querySelectorAll(node_selector);
  nodes.forEach((node) => {
    node.addEventListener('click', (event) => {

      const element = event.target;
      const style = getComputedStyle(element);
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      const innerWidth = element.clientWidth;
      const innerHeight = element.clientHeight;
      let selectedBorder;
      let selectedDirection;

      if (offsetX <= 0) {
        console.log('Left border!');
        selectedDirection = "Left";
      }
      else if (offsetY <= 0) {
        console.log('Top border!');

        selectedDirection = "Top";
      }
      else if (offsetX > innerWidth) {
        console.log('Right border');

        selectedDirection = "Right";
      }
      else if (offsetY > innerHeight) {
        selectedDirection = "Bottom";
      }
      else {
        console.log('Clicked inside the element, not on the border.');
      }

      selectedBorder = "border" + selectedDirection + "Style";


      if (style[selectedBorder] === 'solid' && max_closed_walls > 0) {
        // element.style[selectedBorder] = 'hidden';
        element.style[selectedBorder] = 'dashed';
        max_closed_walls -= 1;
      }
      else if (style[selectedBorder] === 'dashed') {
        element.style[selectedBorder] = 'solid';
        max_closed_walls += 1;
      }

    });
  });
}

/**
 * @param {GameGrid} game
 * @param {number[]} player_path_with_node_ids
*/
function move_by_button(game, player_path_with_node_ids) {


  let move_buttons = document.querySelectorAll(".neighbour_path");
  move_buttons.forEach((move_button) => {
    move_button.addEventListener("click", (event) => {
      let selected_node = move_button.parentElement;

      if (parseInt(selected_node.id) !== game.current_node_id) {
        return
      }

      console.log(game.current_node_id);
      console.log(move_button);
      let next_node_id = parseInt(move_button.id);
      game.current_node_id = next_node_id;
      selected_node.classList.remove('current');

      render_nodes(game, "body");
      move_by_button(game, player_path_with_node_ids);
      // if(){
      //
      // }
    })
  })

}

let nodes = [
  new GameNode(1),
  new GameNode(2),
  new GameNode(3),
  new GameNode(4),
];
let start_position = 1;
let destination_position = 4;
let player_path_with_node_ids = [1];
let game = new GameGrid(nodes, start_position, destination_position);

game.make_neighbour_nodes_same_accessablity(1, 2, true);
game.make_neighbour_nodes_same_accessablity(1, 3, false);
game.make_neighbour_nodes_same_accessablity(2, 4, true);
game.make_neighbour_nodes_same_accessablity(3, 4, true);

console.log(game.can_reach_destination());

render_nodes(game, "body");
move_by_button(game, player_path_with_node_ids);


// select_walls_start(node_selector = ".node", max_closed_walls = 10);
