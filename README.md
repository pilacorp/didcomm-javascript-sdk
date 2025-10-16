

## Tính năng

- **ECDH Key Exchange**: Tạo shared secret sử dụng secp256k1 elliptic curve
- **AES-GCM Encryption**: Mã hóa an toàn sử dụng Web Crypto API
- **JWE Support**: Định dạng JSON Web Encryption cho DIDComm messages
- **Cross-platform**: Hoạt động trên Node.js và trình duyệt hiện đại

## Cài đặt

npm install
```

## Dependencies

- `secp256k1`: Elliptic curve cryptography cho ECDH
- `elliptic`: Hỗ trợ elliptic curve bổ sung
- Web Crypto API: Crypto functionality có sẵn trong browser/Node.js

## Hướng dẫn sử dụng

### 1. Import các function cần thiết

```javascript
import { encrypt, decryptJWE, getFromKeys } from './index.js';
```

### 2. Hàm test đơn giản

```javascript
async function testEncryption() {
  try {
    const plaintext = "Hello, DIDComm!";
    const receiverPublicKey = "02a1b2c3d4e5f6...";
    const senderPrivateKey = "1234567890abcdef...";
    
    console.log("Testing encryption...");
    
    const encrypted = await encrypt(plaintext, receiverPublicKey, senderPrivateKey);
    console.log("Encrypted:", encrypted);
    
    const decrypted = await decryptJWE(encrypted, senderPrivateKey, receiverPublicKey);
    console.log("Decrypted:", decrypted);
    
    if (plaintext === decrypted) {
      console.log("Test passed! Encryption/Decryption successful");
    } else {
      console.log("Test failed! Data mismatch");
    }
    
  } catch (error) {
    console.error("Test error:", error);
  }
}

testEncryption();
```

## Cấu trúc project

```
├── index.js
├── encrypt.js
├── decrypt.js  
├── ecdh.js
├── crypto/
│   └── aes.js
├── jwe/
│   └── jwe.js
├── example.js
├── package.json
└── README.md
```

## Luồng xử lý

```
1. Keys Input
   ├── ReceiverPublicKey (hex string)
   └── SenderPrivateKey (hex string)
   
2. ECDH Key Exchange
   └── Generate Shared Secret (32 bytes)
   
3. Encryption
   ├── Plaintext → AES-GCM Encrypt
   └── Build JWE Structure
   
4. Decryption
   ├── Parse JWE Structure
   ├── AES-GCM Decrypt
   └── Return Plaintext
   
5. Verification
   └── Compare Original vs Decrypted
```




