import type { TControlConfig } from "../../types";

const ControlPanel = ({ config }: { config: TControlConfig}) => {
  const { power, slider, colorPalette } = config;

  return (
    <div className="bg-[#1E293980]/50 border border-[#364153] rounded-[14px] p-[25px] w-md text-[#E5E7EB] text-sm text-left mb-8">
      {/* Power Control */}
      <div className="flex justify-between items-center mb-4">
        <label>Power</label>
        <div
          className={`w-[42px] h-[22px] rounded-full p-0.5 cursor-pointer transition-all duration-300 flex items-center ${
            power.value
              ? "bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              : "bg-[#334155]"
          }`}
          onClick={() => power.onChange(!power.value)}
        >
          <div
            className={`w-[18px] h-[18px] rounded-full transition-all duration-300 ${
              power.value
                ? "bg-white translate-x-5"
                : "bg-[#94a3b8] translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Color Palette (for Light) */}
      {colorPalette && (
        <>
          <div className="flex justify-between items-center mb-4">
            <label>{colorPalette.label || "Color Temperature"}</label>
          </div>

          <div className="flex gap-2 mb-6 ">
            {colorPalette.colors.map((color) => {
              const bg = power.value ? color : `${color}66`;
              const border =
                colorPalette.selectedColor === color
                  ? "2px solid #2B7FFF"
                  : "2px solid #4A5565";
              return (
                <button
                  key={color}
                  className="w-full h-12 rounded-[10px] cursor-pointer outline-none transition-all duration-250 hover:scale-105 "
                  style={{
                    background: bg,
                    border,
                  }}
                  onClick={() => colorPalette.onChange(color)}
                  disabled={!power.value}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Slider Control (for Brightness/Speed) */}
      {slider && (
        <>
          <div className="flex justify-between items-center mb-4 ">
            <label>{slider.label}</label>
            <span className="text-[#99A1AF]">
              {slider.value}
              {"%"}
            </span>
          </div>

          <input
            type="range"
            min={slider.min || 0}
            max={slider.max || 100}
            value={slider.value}
            onChange={(e) => slider.onChange(Number(e.target.value))}
            disabled={!power.value}
            className="w-full h-4 rounded-2xl outline-none appearance-none overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-runnable-track]:h-4 [&::-webkit-slider-runnable-track]:rounded-2xl [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0"
            style={{
              background: power.value
                ? `linear-gradient(90deg, rgba(43, 127, 255, 1) ${slider.value}%, rgba(54, 65, 83, 1) ${slider.value}%)`
                : "rgba(54, 65, 83, 1)",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ControlPanel;
