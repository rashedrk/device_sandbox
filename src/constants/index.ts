import type { TDevice } from "../types";

export const devices: TDevice[] = [
    { id: "light", name: "Light", icon: "light" },
    { id: "fan", name: "Fan", icon: "fan" },
];

// Blade configurations for Fan component
export const bladeConfigs = [
    { angle: 0, translateX: "20%", translateY: "-50%" },
    { angle: 90, translateX: "0%", translateY: "0%" },
    { angle: 180, translateX: "-20%", translateY: "-50%" },
    { angle: 270, translateX: "0%", translateY: "-100%" },
];