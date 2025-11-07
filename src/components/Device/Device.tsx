import { Fan, LightbulbIcon } from "lucide-react";
import type { TDevice } from "../../types";
import { Tooltip } from "react-tooltip";

const Device = ({ device }: { device: TDevice }) => {
  //TODO: Add drag functionality & add the icon white color for active
  const { name, icon } = device;
  return (
    <>
      <div 
      className="flex items-center gap-3 px-3 h-[46px] bg-[#1E2939] border border-[#364153] rounded-[10px] text-gray-200 cursor-grab hover:bg-[#646F7F] active:cursor-grabbing"
     {...(name === "Fan" && { "data-tooltip-id": "tooltip" })}
      >
        {icon === "light" ? (
          <LightbulbIcon size={20} className="shrink-0 text-gray-400 " />
        ) : (
          <Fan size={20} className="shrink-0 text-gray-400 " />
        )}
        <span className="text-base">{name}</span>
      </div>
      <Tooltip
        id="tooltip"
        content="Drag items from here"
        place="right"
        isOpen
        style={{background: "#2B7FFF", width: "227px", padding: "24px", borderRadius: "8px"}}
      />
    </>
  );
};

export default Device;
