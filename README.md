

## 🚀 Tính năng

- **ECDH Key Exchange**: Tạo shared secret sử dụng secp256k1 elliptic curve
- **AES-GCM Encryption**: Mã hóa an toàn sử dụng Web Crypto API
- **JWE Support**: Định dạng JSON Web Encryption cho DIDComm messages
- **Cross-platform**: Hoạt động trên Node.js và trình duyệt hiện đại

## 📦 Cài đặt

# Cài đặt dependencies
npm install
```

## 🔧 Dependencies

- `secp256k1`: Elliptic curve cryptography cho ECDH
- `elliptic`: Hỗ trợ elliptic curve bổ sung
- Web Crypto API: Crypto functionality có sẵn trong browser/Node.js

## 📖 Hướng dẫn sử dụng

### 1. Import các function cần thiết

```javascript
import { encrypt, decryptJWE, getFromKeys } from './index.js';

```

## 📁 Cấu trúc project

```
├── index.js          # Main entry point - export tất cả functions
├── encrypt.js        # High-level encryption function
├── decrypt.js        # High-level decryption function  
├── ecdh.js          # ECDH key exchange implementation
├── crypto/
│   └── aes.js       # AES-GCM encryption/decryption với Web Crypto API
├── jwe/
│   └── jwe.js       # JWE structure handling và base64url encoding
├── example.js       # Usage example với demo flow
├── package.json     # Dependencies và scripts
└── README.md       # Documentation này
```

## 🔄 Luồng xử lý

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




