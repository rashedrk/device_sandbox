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
    type: "light" | "fan";
    settings: LightSettings | FanSettings;
}
