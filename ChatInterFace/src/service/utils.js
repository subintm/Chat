export const getFormattedTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const THREAD_PALETTE = ['#24544A', '#8B4B3B', '#41507D', '#8A6B2E'];
export const threadColor = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    return THREAD_PALETTE[Math.abs(hash) % THREAD_PALETTE.length];
};
