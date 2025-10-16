// ecdh.js - JavaScript implementation of ECDH key exchange
import secp256k1 from 'secp256k1';

/**
 * Generate shared secret from sender's public key and receiver's private key
 * @param {string} senderPubHex - Sender's public key in hex format
 * @param {string} receiverPrivHex - Receiver's private key in hex format
 * @returns {Promise<Uint8Array>} Shared secret
 */
export async function getFromKeys(senderPubHex, receiverPrivHex) {
    try {
        // Decode hex strings to bytes
        const senderPubBytes = hexToBytes(senderPubHex);
        const receiverPrivBytes = hexToBytes(receiverPrivHex);

        // Parse public key - secp256k1 expects compressed format
        const senderPubKey = senderPubBytes;
        
        // Create private key object
        const receiverPrivKey = receiverPrivBytes;

        // Generate shared secret using ECDH
        const sharedSecret = secp256k1.ecdh(senderPubKey, receiverPrivKey);
        
        // Ensure we return a proper Uint8Array
        return new Uint8Array(sharedSecret);
    } catch (error) {
        throw new Error(`ECDH key exchange failed: ${error.message}`);
    }
}

/**
 * Convert hex string to Uint8Array
 * @param {string} hex - Hex string
 * @returns {Uint8Array} Byte array
 */
function hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

/**
 * Convert Uint8Array to hex string
 * @param {Uint8Array} bytes - Byte array
 * @returns {string} Hex string
 */
export function bytesToHex(bytes) {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
