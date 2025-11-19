import { Fan, LightbulbIcon } from "lucide-react";
import type { TDevice, TPreset } from "../../types";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { selectActiveSidebarItem } from "../../redux/features/ui/uiSlice";
import { useAppSelector } from "../../redux/hooks";

const Device = ({ device, preset }: { device?: TDevice; preset?: TPreset }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const activeSidebarItem = useAppSelector(selectActiveSidebarItem);
  const isActive = activeSidebarItem === (device?.id || preset?.id || null);
  console.log(device?.id);

  // Handle both device and preset data
  const itemData = preset ? preset.devices : device;
  const displayName = preset ? preset.name : device?.name;

  const { name, type, settings } = itemData || {};

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: preset ? "PRESET" : "DEVICE",
      item: preset
        ? {
            deviceType: type,
            settings,
            presetName: preset.name,
            presetId: preset.id,
          }
        : { deviceType: type, settings, deviceId: device?.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [type, settings, preset]
  );

  useEffect(() => {
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!itemData || !type || !settings) return null;

  return (
    <div className="flex flex-row-reverse items-center justify-end gap-[3.5px] w-full">
      <div
        ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
        className="flex items-center gap-3 px-3 h-[46px] w-full bg-[#1E2939] border border-[#364153] rounded-[10px] text-gray-200 cursor-grab hover:bg-[#646F7F] active:cursor-grabbing"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        {...(name === "Fan" && { "data-tooltip-id": "tooltip" })}
        {...(isActive && { style: { background: "#646F7F" } })}
      >
        {type === "light" ? (
          <LightbulbIcon size={20} className={`shrink-0 ${isActive ? "text-gray-200" : "text-gray-400"}`}/>
        ) : (
          <Fan size={20} className={`shrink-0 ${isActive ? "text-gray-200" : "text-gray-400"}`} />
        )}
        <span className="text-base">{displayName}</span>
      </div>
      <div className={`h-[5px] w-[5px] rounded-full ${isActive ? "bg-[#2B7FFF]" : "bg-transparent"}`}></div>
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
    </div>
  );
};

export default Device;
