import { X } from "lucide-react";
import { useState } from "react";

interface SavePresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (presetName: string) => void;
  isSaving?: boolean;
}

const SavePresetModal = ({ isOpen, onClose, onSave }: SavePresetModalProps) => {
  const [presetName, setPresetName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Saving preset:", presetName);
    onSave?.(presetName);
    setPresetName("");
    onClose();
  };

  const handleCancel = () => {
    console.log("cancel preset:", presetName);
    setPresetName("");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#141D2B] border border-[#364153] rounded-[14px] w-[530px]">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-lg text-gray-100 font-bold">Give me a name</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-200 text-xl leading-none cursor-pointer"
            >
              <X />
            </button>
          </div>
          <hr className="text-[#364153]" />
          <div className="p-6">
            <input
              type="text"
              placeholder="Name it"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full bg-[#364153] rounded-lg p-3 text-gray-100 placeholder-gray-400 focus:outline-none mb-2"
              autoFocus
            />
            <p className="text-sm text-gray-400 mb-6">
              By saving this effect as a preset you can reuse this anytime.
            </p>

            <div className="flex gap-1 justify-end mt-12">
              <button
                className="px-3 py-2 bg-[#1E2939] border border-[#364153] text-gray-300 rounded-lg hover:bg-[#334155]/30 transition-colors cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!presetName.trim()}
                className="px-3 py-2 bg-[#2B7FFF] text-white rounded-lg hover:bg-[#2563eb] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavePresetModal;
