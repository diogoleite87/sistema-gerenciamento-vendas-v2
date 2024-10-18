export function base64ToImage(base64String: string, altText: string) {
    const img = new Image();

    img.src = `data:image/png;base64,${base64String}`;

    img.alt = altText;

    return img;
}