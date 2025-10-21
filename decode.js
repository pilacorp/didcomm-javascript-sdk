import { decryptJWE, getFromKeys,  } from './index.js';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

import event from './sample_webhook.json' with { type: 'json' };
console.log({ event })

const dataWebhook = event.attachments[0].data.json;

(async () => {
    let jweOutput = JSON.stringify(dataWebhook, null, 2);
    console.log({ jweOutput });

    const privateKey = "0x0fc5abedcb46e4b63d2febc13cb308f0bbdcff7bc27e9621d18977cc6fa1713d";
    const onehubAcc = new ethers.Wallet(privateKey)

    const receiverPrivateKey = privateKey.replace("0x", "");

    console.log({ address: onehubAcc.address, receiverPrivateKey });

    // Fetch Sender public key
    const senderDid = event.from;
    const resp = await fetch(`https://api-dev.ndakey.vn/sdk/api/v1/dids/${senderDid}`);
    const respData = await resp.json();
    let senderPublicKey = respData.data.publicKey;
    senderPublicKey = senderPublicKey.replace("0x", "");
    console.log({ senderPublicKey });

    const sharedSecret = await getFromKeys(senderPublicKey, receiverPrivateKey);

    // Receiver giải mã message
    const plaintext = await decryptJWE(jweOutput, sharedSecret);
    console.log("Decrypted message:", plaintext);
})()
