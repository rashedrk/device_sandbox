import type { FanSettings, LightSettings } from "./device.type";


export type TPreset = {
    id: string;
    name: string;
    devices: {
        name: string;
        type: "light" | "fan";
        settings: LightSettings | FanSettings;
    };
}


export type TCreatePresetPayload = {
    name: string;
    devices: {
        name: string;
        type: "light" | "fan";
        settings: LightSettings | FanSettings;
    };
};

export type TUpdatePresetPayload = {
    id: string;
    data: Partial<TCreatePresetPayload>;
};
