import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionHelper {

    key: string = CryptoJS.enc.Utf8.parse('1547858692658857');
    initializationVector: string = CryptoJS.enc.Utf8.parse('0214574599630244');

    encrypt(value: string) {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.key,
            {
                keySize: 128 / 8,
                iv: this.initializationVector,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted.toString();
    }

    decrypt(value: string) {
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(value)
        });

        var decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            this.key,
            { iv: this.initializationVector });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}