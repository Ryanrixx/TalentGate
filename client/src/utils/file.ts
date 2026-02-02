export async function fileToBase64(file: File): Promise<string> {
    const buff = await file.arrayBuffer();
    const bytes = new Uint8Array(buff);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return "data:" + file.type + ";base64," + btoa(binary);
}
