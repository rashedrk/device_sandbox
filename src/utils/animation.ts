// Calculate fan rotation speed based on speed value
export const getFanAnimationDuration = (isPowerOn: boolean, speed: number) => {
    if (!isPowerOn) return 0;
    if (speed <= 0) return Infinity;
    // Map speed 0-100 to animation duration 3s-0.5s (faster = shorter duration)
    const minDuration = 0.5;
    const maxDuration = 3;
    return maxDuration - (speed / 100) * (maxDuration - minDuration);
};