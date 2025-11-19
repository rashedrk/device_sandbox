import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import Fan from "../Fan/Fan";
import Light from "../Light/Light";
import Toast from "../Toast/Toast";
import type { TDevice, LightSettings, FanSettings } from "../../types";
import SavePresetModal from "../SavePresetModal/SavePresetModal";
import {
  useCreatePresetMutation,
  useUpdatePresetMutation,
} from "../../redux/features/preset/presetApi";
import { useAppDispatch } from "../../redux/hooks";
import { setActiveSidebarItem } from "../../redux/features/ui/uiSlice";

const Sandbox = () => {
    const dispatch = useAppDispatch();
  const [device, setDevice] = useState<TDevice>();
  const [currentPresetId, setCurrentPresetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [createPreset, { isLoading: isCreating }] = useCreatePresetMutation();
  const [updatePreset, { isLoading: isUpdating }] = useUpdatePresetMutation();
  const isSaving = isCreating || isUpdating;

  const updateDevice = useCallback(
    (changes: Partial<TDevice>) => {
      if (device) {
        setDevice({ ...device, ...changes });
      }
    },
    [device]
  );

  const addDevice = (
    deviceType: "light" | "fan",
    settings: LightSettings | FanSettings,
    deviceName?: string,
    presetId?: string,
    deviceId?: string,
  ) => {
    const newDevice: TDevice = {
      id: deviceId || `device-${Date.now()}`,
      name: deviceName || (deviceType === "light" ? "Light" : "Fan"),
      type: deviceType,
      settings,
    };
    console.log(deviceId);
    
    setDevice(newDevice);
    setCurrentPresetId(presetId || null);
    dispatch(setActiveSidebarItem(presetId || deviceId));
  };

  const removeDevice = () => {
    setDevice(undefined);
    setCurrentPresetId(null);
  };

  const handleSave = async () => {
    if (currentPresetId) {
      await handlePresetSave();
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePresetSave = async (presetName?: string) => {
    if (!device) return;
    try {
      if (currentPresetId) {
        // Update existing preset, keep name unchanged
        await updatePreset({
          id: currentPresetId,
          data: {
            devices: {
              name: device.name,
              type: device.type,
              settings: device.settings,
            },
          },
        }).unwrap();
        setShowToast(true);
      } else if (presetName) {
        // Create new preset, use modal name
        await createPreset({
          name: presetName,
          devices: {
            name: device.name,
            type: device.type,
            settings: device.settings,
          },
        }).unwrap();
        setShowToast(true);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to save preset:", error);
    }
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ["DEVICE", "PRESET"],
      drop: (item: {
        deviceType: "light" | "fan";
        settings: LightSettings | FanSettings;
        presetName?: string;
        presetId?: string;
        deviceId?: string;
      }) => {
        addDevice(
          item.deviceType,
          item.settings,
          item.presetName,
          item.presetId,
          item.deviceId,
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <div className="flex-1 flex flex-col m-6 ">
        <div className="flex justify-between items-center mb-4 h-10">
          <h1 className="text-gray-100">Testing Canvas</h1>
          <div className="flex gap-1">
            {device && (
              <>
                <button
                  onClick={removeDevice}
                  className="px-3 py-2 bg-[#1E2939] border border-[#364153] text-gray-300 rounded-lg hover:bg-[#334155]/30 transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => handleSave()}
                  className="px-3 py-2 bg-[#2B7FFF] text-white rounded-lg hover:bg-[#2563eb] transition-colors cursor-pointer"
                >
                  {currentPresetId ? "Update Preset" : "Save Preset"}
                </button>
              </>
            )}
          </div>
        </div>

        <div
          ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
          className="flex-1 bg-[#0A101D] border border-[#1E2939] rounded-[14px] min-h-[400px] relative"
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
          <Toast
            isVisible={showToast}
            message="Preset saved"
            onClose={() => setShowToast(false)}
          />
        </div>
      </div>

      <SavePresetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handlePresetSave}
        isSaving={isSaving}
      />
    </>
  );
};

export default Sandbox;
