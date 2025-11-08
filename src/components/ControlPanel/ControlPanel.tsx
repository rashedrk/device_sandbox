const ControlPanel = ({
  isPowerOn,
  setIsPowerOn,
  speed,
  setSpeed,
}: {
  isPowerOn: boolean;
  setIsPowerOn: (value: boolean) => void;
  speed: number;
  setSpeed: (value: number) => void;
}) => {
  return (
    <div className="bg-[#1E293980]/50 border border-[#364153] rounded-lg p-[25px] w-md h-[134.5px] space-y-5">
      {/* Power Control */}
      <div className="flex items-center justify-between">
        <span className="text-gray-200 text-base">Power</span>
        <button
          onClick={() => setIsPowerOn(!isPowerOn)}
          className={`flex items-center w-8 h-[18.4px] rounded-full transition-colors duration-300 cursor-pointer ${
            isPowerOn ? "bg-blue-500" : "bg-[#CBCED4]"
          }`}
        >
          <div
            className={` w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
              isPowerOn ? "translate-x-3.5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 text-sm font-medium">Speed</span>
          <span className="text-gray-200 text-sm font-medium">{speed}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={!isPowerOn}
          className="w-full h-4 bg-[#364153] rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed slider"
          style={{
            background: isPowerOn
              ? `linear-gradient(to right, #2B7FFF 0%, #2B7FFF ${speed}%, #4B5563 ${speed}%, #4B5563 100%)`
              : "#4B5563",
          }}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
