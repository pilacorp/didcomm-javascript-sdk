// encrypt.js - JavaScript implementation of DIDComm encryption
import { encryptAESGCM } from './crypto/aes.js';
import { buildJWE } from './jwe/jwe.js';

/**
 * Encrypt plaintext using shared key
 * @param {Uint8Array} key - The shared encryption key
 * @param {string} plaintext - The text to encrypt
 * @returns {Promise<string>} JWE JSON string
 */
export async function encrypt(key, plaintext) {
    try {
        const plaintextBytes = new TextEncoder().encode(plaintext);
        const { nonce, ciphertext } = await encryptAESGCM(key, plaintextBytes);
        
        const jweOutput = buildJWE(key, nonce, ciphertext);
        
        return jweOutput;
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
}
