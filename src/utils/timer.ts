export const startTimer = (): Promise<number> => {
    const randomDelay = Math.random() * (10000 - 300) + 300; // Random delay between 300ms and 10000ms
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomDelay);
        }, randomDelay);
    });
};