import { memo } from "react";
import { NodeProps } from "./Graph";

const areEqual = (prevProps: NodeProps, nextProps: NodeProps) => {
  return (
    prevProps.doorTopLocked === nextProps.doorTopLocked &&
      prevProps.doorBottomLoked === nextProps.doorBottomLoked &&
      prevProps.doorRightLoked === nextProps.doorRightLoked &&
      prevProps.doorLeftLoked === nextProps.doorLeftLoked &&
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
          (!borders.doorTopLocked && "bg-transparent")
        }
        id="doorTopLocked"
        onClick={(e) => borders.toggleBorder(e, borders)}
      ></div>
      <div className="flex items-center content-center">
        <div
          className={
            "bg-gray-950  h-24 w-4 " +
            (!borders.doorLeftLoked && "bg-transparent")
          }
          id="doorLeftLoked"
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
            (!borders.doorRightLoked && "bg-transparent")
          }
          id="doorRightLoked"
          onClick={(e) => borders.toggleBorder(e, borders)}
        ></div>
      </div>
      <div
        className={
          "bg-gray-950 ml-4 h-4 w-24 " +
          (!borders.doorBottomLoked && "bg-transparent")
        }
        id="doorBottomLoked"
        onClick={(e) => borders.toggleBorder(e, borders)}
      ></div>
    </div>
  );
}, areEqual);
export default { Node };
