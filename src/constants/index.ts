import type { TDeviceTemplate } from "../types";

// Blade configurations for Fan component
export const bladeConfigs = [
    { angle: 0, translateX: "20%", translateY: "-50%" },
    { angle: 90, translateX: "0%", translateY: "0%" },
    { angle: 180, translateX: "-20%", translateY: "-50%" },
    { angle: 270, translateX: "0%", translateY: "-100%" },
];

export const paletteColors = ["#FFE5B4", "#F0F8FF", "#87CEEB", "#FFB6C1"];

// Device templates for drag and drop
export const devices: TDeviceTemplate[] = [
    {
        name: "Light",
        type: "light",
        icon: "light",
        settings: {
            power: false,
            brightness: 70,
            color: "#FFE5B4",
        },
    },
    {
        name: "Fan",
        type: "fan",
        icon: "fan",
        settings: {
            power: false,
            speed: 64,
        },
    },
];