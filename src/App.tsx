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
    rightNode: 2,
    bottomNode: 3,
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
    leftNode: 1,
    bottomNode: 4,
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
    topNode: 1,
    rightNode: 4,
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
    topNode: 2,
    leftNode: 3,
  };

  const nodes = [node1, node2, node3, node4];
  let currentNode = node1;
  const destinationNode = node4;
  const [graph, setGraph] = useState<Graph>({
    nodes,
    currentNodeId: currentNode.id,
    destinationNodeId: destinationNode.id,
  });

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
    if (moveDirection.includes("top") && !node.doorTopLocked) {
      nextCurrentNodeId = node.topNode;
    } else if (moveDirection.includes("left") && !node.doorLeftLocked) {
      nextCurrentNodeId = node.leftNode;
    } else if (moveDirection.includes("right") && !node.doorRightLocked) {
      nextCurrentNodeId = node.rightNode;
    } else if (moveDirection.includes("bottom") && !node.doorBottomLocked) {
      nextCurrentNodeId = node.bottomNode;
    } else {
      console.log(border, currentNode);
      return;
    }
    const updatedNode = {
      ...node,
      [border]: !node[border],
    };

    const updatedNodes = graph.nodes.map((n) =>
      n.id === node.id ? updatedNode : n,
    );
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: updatedNodes,
      currentNodeId: nextCurrentNodeId ?? prevGraph.currentNodeId,
    }));
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
