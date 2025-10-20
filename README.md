# DIDComm Package

## <a name="didcomm-features"></a>Features

- Key derivation from sender public and recipient private keys
- Encryption of messages using a shared secret
- Decryption of JWE messages

## <a name="didcomm-usage"></a>Usage Example

### Sender (Encrypt) - Người gửi

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

    // Sender lấy private key của mình
    const senderPrivateKey = "1234567890abcdef..."; // Sender's private key
    
    // Sender biết public key của receiver
    const receiverPublicKey = "02a1b2c3d4e5f6..."; // Receiver's public key

    // Sender tạo shared secret: dùng private key của mình + public key của receiver
    const sharedSecret = await getFromKeys(receiverPublicKey,senderPrivateKey);
    console.log("Shared secret derived:", createHash('sha256').update(sharedSecret).digest('hex'));

    // Sender mã hóa message
    const jweOutput = await encrypt(sharedSecret, message);
    console.log("JWE Output:", jweOutput);
    
    // Sender gửi jweOutput cho receiver
}

senderExample();
```

### Receiver (Decrypt) - Người nhận

```javascript
import { decryptJWE, getFromKeys } from './index.js';

async function receiverExample() {
    // Receiver nhận JWE từ sender
    const jweOutput = "eyJhbGciOiJFQ0RILUVTK0dDTSIsImVuYyI6IkdDTSIsImVwayI6eyJrdHkiOiJFQyIsImNydiI6InNlY3AyNTZrMSIsIngiOiI...";
    
    // Receiver lấy private key của mình
    const receiverPrivateKey = "abcdef1234567890..."; // Receiver's private key
    
    // Receiver biết public key của sender
    const senderPublicKey = "02a1b2c3d4e5f6..."; // Sender's public key

    // Receiver tạo shared secret: dùng private key của mình + public key của sender
    const sharedSecret = await getFromKeys(senderPublicKey, receiverPrivateKey);
    
    // Receiver giải mã message
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
