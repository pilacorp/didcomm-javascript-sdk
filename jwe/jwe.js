// jwe/jwe.js - JavaScript implementation of JWE (JSON Web Encryption)
import { webcrypto } from 'crypto';

/**
 * JWE structure
 */
export class JWE {
    constructor(protected_header, iv, ciphertext, tag) {
        this.protected = protected_header;
        this.iv = iv;
        this.ciphertext = ciphertext;
        this.tag = tag;
    }
}

/**
 * Base64URL encode
 * @param {Uint8Array} data - Data to encode
 * @returns {string} Base64URL encoded string
 */
export function base64url(data) {
    return btoa(String.fromCharCode(...data))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Base64URL decode
 * @param {string} input - Base64URL encoded string
 * @returns {Uint8Array} Decoded data
 */
export function base64urlDecode(input) {
    // Add padding if needed
    const padded = input + '='.repeat((4 - input.length % 4) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = atob(base64);
    return new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
}

/**
 * Build JWE structure
 * @param {Uint8Array} sharedKey - The shared key (first 16 bytes used for tag)
 * @param {Uint8Array} iv - The initialization vector
 * @param {Uint8Array} ciphertext - The encrypted data
 * @returns {string} JSON string representation of JWE
 */
export function buildJWE(sharedKey, iv, ciphertext) {
    const header = {
        alg: "ECDH-ES",
        enc: "A256GCM",
        crv: "secp256k1",
        typ: "application/didcomm-encrypted+json"
    };

    const headerBytes = new TextEncoder().encode(JSON.stringify(header));
    
    const jwe = new JWE(
        base64url(headerBytes),
        base64url(iv),
        base64url(ciphertext),
        base64url(sharedKey.slice(0, 16)) // mock tag using first 16 bytes of shared key
    );

    return JSON.stringify(jwe, null, 2);
}
