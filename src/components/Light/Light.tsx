import React, { useState, useEffect } from "react";
import type { TDevice, LightSettings } from "../../types";
import ControlPanel from "../ControlPanel/ControlPanel";
import { paletteColors } from "../../constants";

const Light = ({
  device,
  updateDevice,
}: {
  device: TDevice;
  updateDevice: (changes: Partial<TDevice>) => void;
}) => {
  const settings = device.settings as LightSettings;

  const [power, setPower] = useState<boolean>(settings.power);
  const [brightness, setBrightness] = useState<number>(settings.brightness);
  const [color, setColor] = useState<string>(settings.color);
  const [glowLevel, setGlowLevel] = useState<number>(0);

  useEffect(() => {
    updateDevice({ settings: { power, brightness, color } });
  }, [power, brightness, color, device.id, updateDevice]);

  useEffect(() => {
    if (power) {
      setGlowLevel(0);
      const interval = setInterval(() => {
        setGlowLevel((prev) => {
          if (prev >= brightness) {
            clearInterval(interval);
            return brightness;
          }
          return prev + 5;
        });
      }, 20);
      return () => clearInterval(interval);
    } else {
      setGlowLevel(0);
    }
  }, [power, brightness]);

  // Outer glow of bulb
  const getLightStyle = (): React.CSSProperties => {
    if (!power) {
      return {
        background:
          "radial-gradient(112.05% 89.64% at 30% 30%, #4A5568 0%, #2D3748 50%, #1A202C 100%)",
        boxShadow: "inset 0 0 10px 2px #1f2937",
        opacity: 0.7,
      };
    }

    const glow = Math.max(20, glowLevel * 3.84);

    return {
      background: color,
      boxShadow: `
        0 0 ${glow}px ${glow / 3}px ${color}, 
        0 0 ${glow * 1.5}px ${glow / 2}px ${color}40,
        inset 0 0 ${glow / 2}px ${glow / 4}px ${color}80
      `,
      opacity: 1,
      transition: "box-shadow 0.4s ease, background 0.3s ease",
    };
  };



  return (
    <div className="h-[90vh] w-full flex flex-col items-center justify-between p-8 pb-4 box-border overflow-hidden">
      {/* Light Section */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        {/* Light Holder */}
        <div className="flex flex-col items-center">
          {/* Holder Top */}
          <div className="w-16 h-3 bg-linear-to-b from-[#4A5565] to-[#364153] rounded-t-md" />
          {/* Holder Bottom */}
          <div className="w-20 h-4">
            <div className="bg-[#364153] h-1 border-b border-[#4A5565]"></div>
            <div className="bg-[#364153] h-1 border-b border-[#4A5565]"></div>
            <div className="bg-[#364153] h-1 border-b border-[#4A5565]"></div>
            <div className="bg-[#364153] h-1 border-b border-[#4A5565]"></div>
          </div>
        </div>

        {/* Bulb Body */}
        <div
          className="relative w-32 h-40 rounded-full transition-all duration-400 ease-in-out bg-radial-gradient(112.05% 89.64% at 30% 30%, #4A5568 0%, #2D3748 50%, #1A202C 100%);
"
          style={{
            ...getLightStyle(),
            boxShadow: !power
              ? "0 0 20px rgba(0, 0, 0, 0.5), inset 0 -2px 10px rgba(0, 0, 0, 0.5)"
              : getLightStyle().boxShadow,
          }}
        >
          {/* Filament Glow Line */}
          {power && (
            <div
              className={`absolute top-1/2 left-1/2 w-1 h-16 rounded-full bg-linear-to-b from-[${color}] to-[#FFFFFF] -translate-x-1/2 -translate-y-1/2`}
            />
          )}

          {/* Light shiny Effect in power off*/}
          {!power && (
            <div className="absolute w-12 h-16 top-1/2 left-1/2 -translate-x-2/3 -translate-y-2/3 bg-linear-to-r from-[#FFFFFFCC]/80 to-[#00000000]/0 blur-lg opacity-40" />
          )}
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel
        config={{
          power: {
            value: power,
            onChange: setPower,
          },
          colorPalette: {
            colors: paletteColors,
            selectedColor: color,
            onChange: setColor,
            label: "Color Temperature",
          },
          slider: {
            label: "Brightness",
            value: brightness,
            onChange: setBrightness,
          },
        }}
      />
    </div>
  );
};

export default Light;
