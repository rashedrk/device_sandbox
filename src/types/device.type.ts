export type LightSettings = {
    power: boolean;
    brightness: number;
    color: string;
}

export type FanSettings = {
    power: boolean;
    speed: number;
}

export type TDevice = {
    id: string;
    name: string
    type: "light" | "fan";
    settings: LightSettings | FanSettings;
}

export type TDeviceTemplate = Omit<TDevice, 'id'> & {
    name: string;
    icon: string;
}

export type TPreset = {
    id: string;
    name: string;
    devices: {
        name: string;
        type: "light" | "fan";
        settings: LightSettings | FanSettings;
    };
}
