import { useState } from "react";
import { useDrop } from "react-dnd";
import Fan from "../Fan/Fan";
import Light from "../Light/Light";
import type { TDevice, LightSettings, FanSettings } from "../../types";

const Sandbox = () => {
  const [devices, setDevices] = useState<TDevice[]>([]);

  const updateDevice = (id: string, changes: Partial<TDevice>) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, ...changes } : device
      )
    );
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
    setDevices((prevDevices) => [...prevDevices, newDevice]);
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
    <div className="flex-1 flex flex-col m-6">
      <h1 className="text-gray-100 mb-4">Testing Canvas</h1>

      <div
        ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
        className="flex-1 bg-[#0A101D] border border-[#1E2939] rounded-[14px] min-h-[400px]"
        style={{
          backgroundColor: isOver ? "#0F1829" : "#0A101D",
          transition: "background-color 0.2s ease",
        }}
      >
        {devices.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <p className="text-base text-gray-200 opacity-30">
              Drag anything here
            </p>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center gap-8 flex-wrap p-8">
            {devices.map((device) =>
              device.type === "light" ? (
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
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
