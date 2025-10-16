# DIDComm Package

## <a name="didcomm-features"></a>Features

- Key derivation from sender public and recipient private keys
- Encryption of messages using a shared secret
- Decryption of JWE messages

## <a name="didcomm-usage"></a>Usage Example

### Sender (Encrypt)

```javascript
import { encrypt, getFromKeys } from './index.js';
import { createHash } from 'crypto';

async function senderExample() {
    const message = `{
        "@context": [...],
        "id": "urn:uuid:...",
        "type": ["VerifiableCredential"],
        "issuer": "did:example:123456",
        "issuanceDate": "...",
        "credentialSubject": { ... },
        "proof": {
            "type": "Ed25519Signature2020",
            "created": "...",
            "verificationMethod": "did:example:123456#key-1",
            "proofPurpose": "assertionMethod",
            "jws": "..."
        }
    }`;

    // Sender's keys
    const senderPublicKey = "02a1b2c3d4e5f6...";
    const senderPrivateKey = "1234567890abcdef...";
    
    // Receiver's public key (known to sender)
    const receiverPublicKey = "02a1b2c3d4e5f6...";

    // Create shared secret using sender's private key and receiver's public key
    const sharedSecret = await getFromKeys(senderPrivateKey, receiverPublicKey);
    console.log("Shared secret derived:", createHash('sha256').update(sharedSecret).digest('hex'));

    // Encrypt message
    const jweOutput = await encrypt(sharedSecret, message);
    console.log("JWE Output:", jweOutput);
    
    // Send jweOutput to receiver
}

senderExample();
```

### Receiver (Decrypt)

```javascript
import { decryptJWE, getFromKeys } from './index.js';

async function receiverExample() {
    // Received JWE from sender
    const jweOutput = "eyJhbGciOiJFQ0RILUVTK0dDTSIsImVuYyI6IkdDTSIsImVwayI6eyJrdHkiOiJFQyIsImNydiI6InNlY3AyNTZrMSIsIngiOiI...";
    
    // Receiver's keys
    const receiverPrivateKey = "1234567890abcdef...";
    const receiverPublicKey = "02a1b2c3d4e5f6...";
    
    // Sender's public key (known to receiver)
    const senderPublicKey = "02a1b2c3d4e5f6...";

    // Create shared secret using receiver's private key and sender's public key
    const sharedSecret = await getFromKeys(receiverPrivateKey, senderPublicKey);
    
    // Decrypt message
    const plaintext = await decryptJWE(jweOutput, sharedSecret);
    console.log("Decrypted message:", plaintext);
}

receiverExample();
```

## <a name="didcomm-api"></a>API

- `getFromKeys(privateKey, publicKey) Promise<Uint8Array>`: Derives a shared secret from a private key and public key pair.
- `encrypt(sharedSecret, message) Promise<string>`: Encrypts a message using the shared secret and returns a JWE string.
- `decryptJWE(jwe, sharedSecret) Promise<string>`: Decrypts a JWE string using the shared secret and returns the plaintext message.

**Notes:**

- Replace `senderPublicKey`, `senderPrivateKey`, `receiverPublicKey`, and `receiverPrivateKey` with your actual key variables.
- The package assumes you are familiar with DIDComm and JWE standards.
- All functions are async and return Promises.

---
