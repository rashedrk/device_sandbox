import { Fan, LightbulbIcon } from "lucide-react";
import type { TDevice} from "../../types";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

const Device = ({ device }: { device: TDevice }) => {
  const { name, type, settings } = device;
  const [showTooltip, setShowTooltip] = useState(true);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "DEVICE",
      item: { deviceType: type, settings },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [type, settings]
  );

  useEffect(() => {
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
        className="flex items-center gap-3 px-3 h-[46px] bg-[#1E2939] border border-[#364153] rounded-[10px] text-gray-200 cursor-grab hover:bg-[#646F7F] active:cursor-grabbing"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        {...(name === "Fan" && { "data-tooltip-id": "tooltip" })}
      >
        {type === "light" ? (
          <LightbulbIcon size={20} className="shrink-0 text-gray-400" />
        ) : (
          <Fan size={20} className="shrink-0 text-gray-400" />
        )}
        <span className="text-base">{name}</span>
      </div>
      <Tooltip
        id="tooltip"
        content="Drag items from here"
        place="right"
        isOpen={showTooltip}
        style={{
          background: "#2B7FFF",
          width: "227px",
          padding: "24px",
          borderRadius: "8px",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default Device;
