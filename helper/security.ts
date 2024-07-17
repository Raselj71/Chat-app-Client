import * as crypto from 'crypto';

const encrypt = (text:any, key:String) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

    let encrypted:any = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (encrypted:String, key:String) => {
    const textParts = encrypted.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = Buffer.from(textParts[1], 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

module.exports = { encrypt, decrypt };
