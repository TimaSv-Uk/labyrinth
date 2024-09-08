import { useState } from "react";
import { Graph, GameNode } from "./Graph";
import { Node } from "./Node";
function App() {
  const node1: GameNode = {
    id: 1,
    doorTopVisible: false,
    doorBottomVisible: true,
    doorRightVisible: true,
    doorLeftVisible: false,
    doorTopLocked: false,
    doorBottomLocked: false,
    doorRightLocked: true,
    doorLeftLocked: false,
    rightNodeId: 2,
    bottomNodeId: 3,
  };

  const node2: GameNode = {
    id: 2,
    doorTopVisible: false,
    doorBottomVisible: true,
    doorRightVisible: false,
    doorLeftVisible: true,
    doorTopLocked: false,
    doorBottomLocked: false,
    doorRightLocked: false,
    doorLeftLocked: false,
    leftNodeId: 1,
    bottomNodeId: 4,
  };

  const node3: GameNode = {
    id: 3,
    doorTopVisible: true,
    doorBottomVisible: false,
    doorRightVisible: true,
    doorLeftVisible: false,

    doorTopLocked: false,
    doorBottomLocked: false,
    doorRightLocked: false,
    doorLeftLocked: false,
    topNodeId: 1,
    rightNodeId: 4,
  };

  const node4: GameNode = {
    id: 4,
    doorTopVisible: true,
    doorBottomVisible: false,
    doorRightVisible: false,
    doorLeftVisible: true,
    doorTopLocked: false,
    doorBottomLocked: false,
    doorRightLocked: false,
    doorLeftLocked: false,
    topNodeId: 2,
    leftNodeId: 3,
  };

  const nodes = [node1, node2, node3, node4];
  let currentNode = node1;
  const destinationNode = node4;
  const [graph, setGraph] = useState<Graph>(
    new Graph(nodes, currentNode.id, destinationNode.id),
  );
  console.log(graph.canReachDestination());
  const toggleBorder = (
    event: React.MouseEvent<HTMLDivElement>,
    node: GameNode,
  ) => {
    const border = event.currentTarget.id as keyof GameNode;
    const moveDirection = border.toLowerCase();
    let nextCurrentNodeId: number | undefined = undefined;

    if (node.id !== graph.currentNodeId) {
      return;
    }
    if (moveDirection.includes("top") && !node.doorTopLocked && node.topNodeId) {
      nextCurrentNodeId = node.topNodeId;
    } else if (
      moveDirection.includes("left") &&
      !node.doorLeftLocked &&
      node.leftNodeId
    ) {
      nextCurrentNodeId = node.leftNodeId;
    } else if (
      moveDirection.includes("right") &&
      !node.doorRightLocked &&
      node.rightNodeId
    ) {
      nextCurrentNodeId = node.rightNodeId;
    } else if (
      moveDirection.includes("bottom") &&
      !node.doorBottomLocked &&
      node.bottomNodeId
    ) {
      nextCurrentNodeId = node.bottomNodeId;
    } else {
      return;
    }
    const updatedNode = {
      ...node,
      // [border]: !node[border],
      [border]: false,
    };
    
    const updatedNodes = graph.nodes.map((n) =>
      n.id === node.id ? updatedNode : n,
    );
    setGraph(
      (prevGraph) =>
        new Graph(
          updatedNodes,
          nextCurrentNodeId ?? prevGraph.currentNodeId,
          prevGraph.destinationNodeId,
        ),
    );
  };
  return (
    <div className="grid grid-cols-2 grid-flow-row-dense">
      {graph.nodes.map((node) => {
        return (
          <Node
            {...node}
            toggleBorder={toggleBorder}
            isCurrentNode={node.id === graph.currentNodeId ? true : false}
            key={node.id}
          ></Node>
        );
      })}
    </div>
  );
}

export default App;
