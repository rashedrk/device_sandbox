import { useState } from "react";
import Fan from "../Fan/Fan";
import Light from "../Light/Light";
import type { TDevice } from "../../types";

const Sandbox = () => {
  const [devices, setDevices] = useState<TDevice[]>([
    {
      id: "light-1",
      type: "light",
      settings: {
        power: false,
        brightness: 70,
        color: "#FFE5B4",
      },
    },
  ]);

  const updateDevice = (id: string, changes: Partial<TDevice>) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, ...changes } : device
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col m-6">
      <h1 className="text-gray-100 mb-4">Testing Canvas</h1>

      <div className="flex-1 bg-[#0A101D] border border-[#1E2939] rounded-[14px] min-h-[400px]">
        {devices.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <p className="text-base text-gray-200 opacity-30">
              Drag anything here
            </p>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            {devices.map((device) =>
              device.type === "light" ? (
                <Light
                  key={device.id}
                  device={device}
                  updateDevice={updateDevice}
                />
              ) : (
                <Fan key={device.id} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
