export type TControlConfig = {
    power: {
        value: boolean;
        onChange: (value: boolean) => void;
    };
    slider?: {
        label: string;
        value: number;
        onChange: (value: number) => void;
        min?: number;
        max?: number;
    };
    colorPalette?: {
        colors: string[];
        selectedColor: string;
        onChange: (color: string) => void;
        label?: string;
    };
}