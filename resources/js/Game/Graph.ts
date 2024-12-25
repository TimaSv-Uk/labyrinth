export type GameNode = {
  id: number;
  topNodeId?: number;
  bottomNodeId?: number;
  rightNodeId?: number;
  leftNodeId?: number;
  doorTopVisible: boolean;
  doorBottomVisible: boolean;
  doorRightVisible: boolean;
  doorLeftVisible: boolean;
  doorTopLocked: boolean;
  doorBottomLocked: boolean;
  doorRightLocked: boolean;
  doorLeftLocked: boolean;
};
type NeighborNode = {
  node?: GameNode;
  locked: boolean;
};
export class Graph {
  public nodes: GameNode[];
  public currentNodeId: number;
  public destinationNodeId: number;
  public constructor(
    nodes: GameNode[],
    currentNodeId: number,
    destinationNodeId: number,
  ) {
    if (!nodes.find((node) => node.id === currentNodeId)) {
      throw new Error("there is no node with currentNodeId in nodes");
    }
    if (!nodes.find((node) => node.id === destinationNodeId)) {
      throw new Error("there is no node with destinationNodeId in nodes");
    }
    this.nodes = nodes;
    this.currentNodeId = currentNodeId;
    this.destinationNodeId = destinationNodeId;
  }
  public canReachDestination(): boolean {
    const nodeMap = new Map<number, GameNode>(
      this.nodes.map((node) => [node.id, node]),
    );
    const visited = new Set<number>();

    const dfs = (currentNodeId: number): boolean => {
      if (currentNodeId === this.destinationNodeId) return true;
      if (visited.has(currentNodeId)) return false;

      visited.add(currentNodeId);

      const currentNode = nodeMap.get(currentNodeId);
      const topNeighborNode =
        currentNode?.topNodeId !== undefined
          ? nodeMap.get(currentNode.topNodeId)
          : undefined;

      const leftNeighborNode =
        currentNode?.leftNodeId !== undefined
          ? nodeMap.get(currentNode.leftNodeId)
          : undefined;

      const rightNeighborNode =
        currentNode?.rightNodeId !== undefined
          ? nodeMap.get(currentNode.rightNodeId)
          : undefined;

      const bottomNeighborNode =
        currentNode?.bottomNodeId !== undefined
          ? nodeMap.get(currentNode.bottomNodeId)
          : undefined;
      const isTopDoorLocked = currentNode?.doorTopLocked ?? false;
      const isLeftDoorLocked = currentNode?.doorLeftLocked ?? false;
      const isRightDoorLocked = currentNode?.doorRightLocked ?? false;
      const isBottomDoorLocked = currentNode?.doorBottomLocked ?? false;

      const neiborNodes: NeighborNode[] = [
        { node: topNeighborNode, locked: isTopDoorLocked },
        { node: leftNeighborNode, locked: isLeftDoorLocked },
        { node: rightNeighborNode, locked: isRightDoorLocked },
        { node: bottomNeighborNode, locked: isBottomDoorLocked },
      ];
      for (let index = 0; index < neiborNodes.length; index++) {
        const neiborNode = neiborNodes[index];
        if (neiborNode.node && !neiborNode.locked) {
          if (dfs(neiborNode.node.id)) {
            return true;
          }
        }
      }
      return false;
    };

    return dfs(this.currentNodeId);
  }
}

export type NodeProps = GameNode & {
  isCurrentNode: boolean;
  toggleBorder: (
    event: React.MouseEvent<HTMLDivElement>,
    node: GameNode,
  ) => void;
};
