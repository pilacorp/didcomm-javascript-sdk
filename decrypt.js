// decrypt.js - JavaScript implementation of DIDComm decryption
import { decryptAESGCM } from './crypto/aes.js';
import { base64urlDecode } from './jwe/jwe.js';

/**
 * JWE structure for parsing
 */
class JWE {
    constructor(protected_header, iv, ciphertext, tag) {
        this.protected = protected_header;
        this.iv = iv;
        this.ciphertext = ciphertext;
        this.tag = tag;
    }
}

/**
 * Decrypt JWE string using shared key
 * @param {string} jweStr - JWE JSON string
 * @param {Uint8Array} sharedKey - The shared decryption key
 * @returns {Promise<string>} Decrypted plaintext
 */
export async function decryptJWE(jweStr, sharedKey) {
    try {
        // Parse JWE JSON
        const jweData = JSON.parse(jweStr);
        const jwe = new JWE(jweData.protected, jweData.iv, jweData.ciphertext, jweData.tag);

        // Decode base64url encoded components
        const iv = base64urlDecode(jwe.iv);
        const ciphertext = base64urlDecode(jwe.ciphertext);

        // Decrypt using AES-GCM
        const plaintextBytes = await decryptAESGCM(sharedKey, iv, ciphertext);
        
        // Convert back to string
        const plaintext = new TextDecoder().decode(plaintextBytes);
        
        return plaintext;
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}
