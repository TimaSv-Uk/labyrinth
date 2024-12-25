import { memo } from "react";
import { NodeProps } from "./Graph";

const areEqual = (prevProps: NodeProps, nextProps: NodeProps) => {
  return (
    prevProps.doorTopVisible === nextProps.doorTopVisible &&
      prevProps.doorBottomVisible === nextProps.doorBottomVisible &&
      prevProps.doorRightVisible === nextProps.doorRightVisible &&
      prevProps.doorLeftVisible === nextProps.doorLeftVisible &&
    prevProps.isCurrentNode === nextProps.isCurrentNode
  );
};
export const Node = memo(function Node(borders: NodeProps) {
  console.log(borders.id);
  return (
    <div>
      <div
        className={
          "bg-gray-950  ml-4 h-4 w-24 " +
          (!borders.doorTopVisible && "bg-transparent")
        }
        id="doorTopVisible"
        onClick={(e) => borders.toggleBorder(e, borders)}
      ></div>
      <div className="flex items-center content-center">
        <div
          className={
            "bg-gray-950  h-24 w-4 " +
            (!borders.doorLeftVisible && "bg-transparent")
          }
          id="doorLeftVisible"
          onClick={(e) => borders.toggleBorder(e, borders)}
        ></div>
        <div
          className={
            (borders.isCurrentNode ? "bg-red-50" : "bg-slate-500") + " size-24"
          }
          id="cell"
        ></div>
        <div
          className={
            "bg-gray-950  h-24 w-4 " +
            (!borders.doorRightVisible && "bg-transparent")
          }
          id="doorRightVisible"
          onClick={(e) => borders.toggleBorder(e, borders)}
        ></div>
      </div>
      <div
        className={
          "bg-gray-950 ml-4 h-4 w-24 " +
          (!borders.doorBottomVisible && "bg-transparent")
        }
        id="doorBottomVisible"
        onClick={(e) => borders.toggleBorder(e, borders)}
      ></div>
    </div>
  );
}, areEqual);
export default { Node };
