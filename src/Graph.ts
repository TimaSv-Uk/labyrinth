export type GameNode = {
  id: number;
  topNode?: number;
  bottomNode?: number;
  rightNode?: number;
  leftNode?: number;
  doorTopVisible: boolean;
  doorBottomVisible: boolean;
  doorRightVisible: boolean;
  doorLeftVisible: boolean;
  doorTopLocked: boolean;
  doorBottomLocked: boolean;
  doorRightLocked: boolean;
  doorLeftLocked: boolean;
};

export type Graph = {
  nodes: GameNode[];
  currentNodeId: number;
  destinationNodeId: number;
};

export type NodeProps = GameNode & {
  isCurrentNode: boolean;
  toggleBorder: (
    event: React.MouseEvent<HTMLDivElement>,
    node: GameNode,
  ) => void;
};
