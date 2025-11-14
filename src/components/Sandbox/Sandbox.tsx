import { useState } from "react";
import { useDrop } from "react-dnd";
import Fan from "../Fan/Fan";
import Light from "../Light/Light";
import type { TDevice, LightSettings, FanSettings } from "../../types";
import SavePresetModal from "../SavePresetModal/SavePresetModal";

const Sandbox = () => {
  const [device, setDevice] = useState<TDevice>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateDevice = (changes: Partial<TDevice>) => {
    if (device) {
      setDevice({ ...device, ...changes });
    }
  };

  const addDevice = (
    deviceType: "light" | "fan",
    settings: LightSettings | FanSettings
  ) => {
    const newDevice: TDevice = {
      id: `${deviceType}-${Date.now()}`,
      type: deviceType,
      settings,
    };
    setDevice(newDevice);
  };

  const removeDevice = () => {
    setDevice(undefined);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "DEVICE",
      drop: (item: {
        deviceType: "light" | "fan";
        settings: LightSettings | FanSettings;
      }) => {
        addDevice(item.deviceType, item.settings);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <div className="flex-1 flex flex-col m-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-100">Testing Canvas</h1>
          {device && (
            <div className="flex gap-1">
              <button
                onClick={removeDevice}
                className="px-3 py-2 bg-[#1E2939] border border-[#364153] text-gray-300 rounded-lg hover:bg-[#334155]/30 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 bg-[#2B7FFF] text-white rounded-lg hover:bg-[#2563eb] transition-colors cursor-pointer"
              >
                Save Preset
              </button>
            </div>
          )}
        </div>

        <div
          ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
          className="flex-1 bg-[#0A101D] border border-[#1E2939] rounded-[14px] min-h-[400px]"
          style={{
            backgroundColor: isOver ? "#0F1829" : "#0A101D",
            transition: "background-color 0.2s ease",
          }}
        >
          {!device ? (
            <div className="h-full flex justify-center items-center">
              <p className="text-base text-gray-200 opacity-30">
                Drag anything here
              </p>
            </div>
          ) : (
            <div className="h-full flex justify-center items-center p-8">
              {device.type === "light" ? (
                <Light
                  key={device.id}
                  device={device}
                  updateDevice={updateDevice}
                />
              ) : (
                <Fan
                  key={device.id}
                  device={device}
                  updateDevice={updateDevice}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <SavePresetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSaving={false}
      />
    </>
  );
};

export default Sandbox;
