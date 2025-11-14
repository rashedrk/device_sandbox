import { useState, useEffect } from "react";
import "./fan.css";
import { bladeConfigs } from "../../constants";
import { getFanAnimationDuration } from "../../utils/animation";
import ControlPanel from "../ControlPanel/ControlPanel";
import type { TDevice, FanSettings } from "../../types";

const Fan = ({
  device,
  updateDevice,
}: {
  device: TDevice;
  updateDevice: (changes: Partial<TDevice>) => void;
}) => {
  const settings = device.settings as FanSettings;

  const [isPowerOn, setIsPowerOn] = useState<boolean>(settings.power);
  const [speed, setSpeed] = useState<number>(settings.speed);

  useEffect(() => {
    updateDevice( { settings: { power: isPowerOn, speed } });
  }, [isPowerOn, speed, device.id, updateDevice]);

  return (
    <div className="flex flex-col items-center justify-between gap-30">
      {/* Fan */}
      <div className="relative w-64 h-64 flex items-center">
        {/* Fan blades */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: isPowerOn
              ? `spin ${getFanAnimationDuration(
                  isPowerOn,
                  speed
                )}s linear infinite`
              : "none",
          }}
        >
          {bladeConfigs.map((blade) => (
            <div
              className="absolute top-1/2 left-1/2 w-[134px] h-14 rounded-r-full opacity-90 origin-center-left shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.3)]"
              style={{
                background:
                  "linear-gradient(80deg, #4A5568 0%, #2D3748 40%, #1A202C 95%, #0F1419 100%)",
                transform: `translate(${blade.translateX}, ${blade.translateY}) rotate(${blade.angle}deg)`,
                transformOrigin: "center left",
              }}
            />
          ))}
        </div>

        {/* Fan Motor */}
        <div className="w-64 h-64 flex items-center justify-center">
          <div className="h-20 w-20 bg-linear-to-br to-[#4A5565] from-[#1E2939] rounded-full border-4 border-[#364153] absolute shadow-[insert_0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-3 rotate-90"></div>
          <div className="h-14 w-14 bg-linear-to-br to-[#364153] from-[#101828] rounded-full z-10 rotate-90"></div>
        </div>
      </div>

      {/* Controls */}
      <ControlPanel
        config={{
          power: {
            value: isPowerOn,
            onChange: setIsPowerOn,
          },
          slider: {
            label: "Speed",
            value: speed,
            onChange: setSpeed,
          },
        }}
      />
    </div>
  );
};

export default Fan;
