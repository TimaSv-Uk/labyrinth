import { useState } from "react";
import { Graph, GameNode } from "./Graph";
import { Node } from "./Node";
function App() {
  const node1: GameNode = {
    id: 1,
    doorTopLocked: false,
    doorBottomLoked: true,
    doorRightLoked: true,
    doorLeftLoked: false,
    rightNode: 2,
    bottomNode: 3,
  };

  const node2: GameNode = {
    id: 2,
    doorTopLocked: false,
    doorBottomLoked: true,
    doorRightLoked: false,
    doorLeftLoked: true,
    leftNode: 1,
    bottomNode: 4,
  };

  const node3: GameNode = {
    id: 3,
    doorTopLocked: true,
    doorBottomLoked: false,
    doorRightLoked: true,
    doorLeftLoked: false,
    topNode: 1,
    rightNode: 4,
  };

  const node4: GameNode = {
    id: 4,
    doorTopLocked: true,
    doorBottomLoked: false,
    doorRightLoked: false,
    doorLeftLoked: true,
    topNode: 2,
    leftNode: 3,
  };

  const nodes = [node1, node2, node3, node4];
  const currentNode = node1;
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

    if (node.id !== graph.currentNodeId) {
      return;
    }

    const border = event.currentTarget.id as keyof GameNode;
    const updatedNode = {
      ...node,
      [border]: !node[border],
    };

    const updatedNodes = graph.nodes.map((n) =>
      n.id === node.id ? updatedNode : n,
    );
    const moveDirection = border.toLowerCase();
    let nextCurrentNode: number | undefined = undefined;

    if (moveDirection.includes("top")) {
      currentNode
      nextCurrentNode = node.topNode;
    } else if (moveDirection.includes("left")) {
      nextCurrentNode = node.leftNode;
    } else if (moveDirection.includes("right")) {
      nextCurrentNode = node.rightNode;
    } else if (moveDirection.includes("bottom")) {
      nextCurrentNode = node.bottomNode;
    }
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: updatedNodes,
      currentNodeId: nextCurrentNode ?? prevGraph.currentNodeId,
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
