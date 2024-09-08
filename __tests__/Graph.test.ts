import { Graph, GameNode } from "../src/Graph"; // Adjust the import based on your file structure

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
const graph: Graph = new Graph(nodes, currentNode.id, destinationNode.id);

test("should return true when destination is reachable", () => {
  expect(graph.canReachDestination()).toBe(true);
});

test("should return false when destination is not reachable due to locked doors", () => {
  const nodesWithLockedDoor = [
    node1,
    node2,
    {
      ...node3,
      doorRightLocked: true,
    },
    node4,
  ];
  const graph = new Graph(nodesWithLockedDoor, node1.id, node4.id);
  expect(graph.canReachDestination()).toBe(false);
});

test("should throw an error when destination node is not present in the nodes list", () => {
  const nodesWithoutDestination = [node1, node2, node3];
  // Expect the constructor to throw an error
  expect(() => new Graph(nodesWithoutDestination, node1.id, node4.id)).toThrow(
    "there is no node with destinationNodeId in nodes",
  );
});

test("should throw an error when start node is not present in the nodes list", () => {
  const nodesWithoutDestination = [node1, node2, node3];
  // Expect the constructor to throw an error
  expect(() => new Graph(nodesWithoutDestination, node4.id, node1.id)).toThrow(
    "there is no node with currentNodeId in nodes",
  );
});
