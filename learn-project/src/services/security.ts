function bytesToHex(bytes: Uint8Array) {
    return Array.from(bytes, byte =>
        byte.toString(16).padStart(2, '0')
    ).join('');
}

function hexToBytes(hexString: string) {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substring(i, 2), 16));
    }
    return bytes;
}


export async function hash(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ['deriveKey']
    );
    const key = await window.crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: "SHA-256"
    },
        keyMaterial,
        { name: "HMAC", hash: "SHA-256", length: 256 },
        false, ["sign"]
    );
    const exportedKey = await window.crypto.subtle.exportKey("raw", key)
    return `${bytesToHex(encoder.encode(salt))}:${exportedKey}`;
}

export async function validate(value: string, password: string) {
    const data = password.split(":")
    const salt = data[0]
    return (await hash(value, salt) == password)
}