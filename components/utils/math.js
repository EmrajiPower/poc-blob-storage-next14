export const bytesToMegabytes = (bytes) => {
    const sizeInKb = bytes / 1024;

    if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
    } else {
    return `${sizeInKb.toFixed(2)} kb`;
    }
}