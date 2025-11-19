import type { TDevice, TPreset } from "../../types";
import Device from "../Device/Device";

const Sidebar = ({
  devices,
  presets,
}: {
  devices: TDevice[];
  presets: TPreset[];
}) => {
  return (
    <div className="w-56 bg-[#101828] pt-4 px-4  flex flex-col gap-8 border-r border-[#1E2939]">
      <div className="">
        <h2 className="text-base text-gray-100 ml-3">Devices</h2>
        <div className="flex flex-col gap-3 mt-4">
          {(devices ?? []).map((device) =>
            device ? <Device key={device.id} device={device} /> : null
          )}
        </div>
      </div>

      <div>
        <h2 className="text-base text-gray-100 mb-4 ml-3">Saved Presets</h2>

        {!presets || presets.length === 0 ? (
          <div className="p-3 border border-[#364153] rounded-[10px]">
            <p className="text-base text-gray-500">Nothing added yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {(presets ?? []).map((preset) =>
              preset ? <Device key={preset.id} preset={preset} /> : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
