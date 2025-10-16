# DIDComm Package

## <a name="didcomm-features"></a>Features

- Key derivation from sender public and recipient private keys
- Encryption of messages using a shared secret
- Decryption of JWE messages

## <a name="didcomm-usage"></a>Usage Example

```javascript
import { encrypt, decryptJWE, getFromKeys } from './index.js';
import { createHash } from 'crypto';

async function main() {
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

    const senderPublicKey = "02a1b2c3d4e5f6...";
    const senderPrivateKey = "1234567890abcdef...";
    const receiverPublicKey = "02a1b2c3d4e5f6...";
    const receiverPrivateKey = "1234567890abcdef...";

    const sharedSecret = await getFromKeys(senderPublicKey, receiverPrivateKey);
    console.log("Recipient derived:", createHash('sha256').update(sharedSecret).digest('hex'));

    const jweOutput = await encrypt(message, receiverPublicKey, senderPrivateKey);
    console.log("JWE Output:", jweOutput);

    const plaintext = await decryptJWE(jweOutput, senderPrivateKey, receiverPublicKey);
    console.log("Plaintext:", plaintext);
}

main();
```

## <a name="didcomm-api"></a>API

- `getFromKeys(senderPub, receiverPriv) Promise<Uint8Array>`: Derives a shared secret from the sender's public and recipient's private keys.
- `encrypt(message, receiverPublicKey, senderPrivateKey) Promise<string>`: Encrypts a message using the keys and returns a JWE string.
- `decryptJWE(jwe, senderPrivateKey, receiverPublicKey) Promise<string>`: Decrypts a JWE string using the keys and returns the plaintext message.

**Notes:**

- Replace `senderPublicKey`, `senderPrivateKey`, `receiverPublicKey`, and `receiverPrivateKey` with your actual key variables.
- The package assumes you are familiar with DIDComm and JWE standards.
- All functions are async and return Promises.

---
