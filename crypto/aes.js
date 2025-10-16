// crypto/aes.js - JavaScript implementation of AES-GCM encryption
import { webcrypto } from 'crypto';

/**
 * Encrypts plaintext using AES-GCM
 * @param {Uint8Array} key - The encryption key
 * @param {Uint8Array} plaintext - The data to encrypt
 * @returns {Promise<{nonce: Uint8Array, ciphertext: Uint8Array}>}
 */
export async function encryptAESGCM(key, plaintext) {
    try {
        // Import the key - convert Uint8Array to ArrayBuffer
        const keyBuffer = key.buffer.slice(key.byteOffset, key.byteOffset + key.byteLength);
        const cryptoKey = await webcrypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );

        // Generate a random IV (nonce)
        const iv = webcrypto.getRandomValues(new Uint8Array(12)); // 12 bytes for GCM

        // Encrypt the data
        const plaintextBuffer = plaintext.buffer.slice(plaintext.byteOffset, plaintext.byteOffset + plaintext.byteLength);
        const ciphertext = await webcrypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            cryptoKey,
            plaintextBuffer
        );

        return {
            nonce: iv,
            ciphertext: new Uint8Array(ciphertext)
        };
    } catch (error) {
        throw new Error(`AES-GCM encryption failed: ${error.message}`);
    }
}

/**
 * Decrypts ciphertext using AES-GCM
 * @param {Uint8Array} key - The decryption key
 * @param {Uint8Array} nonce - The nonce used for encryption
 * @param {Uint8Array} ciphertext - The encrypted data
 * @returns {Promise<Uint8Array>} The decrypted plaintext
 */
export async function decryptAESGCM(key, nonce, ciphertext) {
    try {
        // Import the key - convert Uint8Array to ArrayBuffer
        const keyBuffer = key.buffer.slice(key.byteOffset, key.byteOffset + key.byteLength);
        const cryptoKey = await webcrypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        // Decrypt the data
        const ciphertextBuffer = ciphertext.buffer.slice(ciphertext.byteOffset, ciphertext.byteOffset + ciphertext.byteLength);
        const plaintext = await webcrypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: nonce
            },
            cryptoKey,
            ciphertextBuffer
        );

        return new Uint8Array(plaintext);
    } catch (error) {
        throw new Error(`AES-GCM decryption failed: ${error.message}`);
    }
}
