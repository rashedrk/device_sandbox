import { useState } from "react";
import Fan from "../Fan/Fan";

type DeviceInstance = {
  id: string;
  type: "fan" | "light";
};

const Sandbox = () => {
  const [devices] = useState<DeviceInstance[]>([
    { id: "fan-1", type: "fan" }, // For demonstration, show fan by default
  ]);

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
            <Fan />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
