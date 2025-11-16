// Outer glow of bulb
export const getLightStyle = (power: boolean, glowLevel: number, color: string) => {
    if (!power) {
        return {
            background:
                "radial-gradient(112.05% 89.64% at 30% 30%, #4A5568 0%, #2D3748 50%, #1A202C 100%)",
            boxShadow: "inset 0 0 10px 2px #1f2937",
            opacity: 0.7,
        };
    }

    const glow = Math.max(20, glowLevel * 3.84);

    return {
        background: color,
        boxShadow: `
        0 0 ${glow}px ${glow / 3}px ${color}, 
        0 0 ${glow * 1.5}px ${glow / 2}px ${color}40,
        inset 0 0 ${glow / 2}px ${glow / 4}px ${color}80
      `,
        opacity: 1,
        transition: "box-shadow 0.4s ease, background 0.3s ease",
    };
};

