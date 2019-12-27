const forge = require('node-forge')

function generateKey(byteSize,password){
    let numIteration = 12;
    let salt = forge.random.getBytesSync(byteSize);
    let key = forge.pkcs5.pbkdf2(password,salt,numIteration,byteSize/8);
    let iv = forge.random.getBytesSync(byteSize/8);
    return {key:key,iv:iv};
}

function encryptAES(iv,key,object){
    let md = forge.md.sha256.create();
    md.update(key)
    let processedKey = md.digest();
    let cipher = forge.cipher.createCipher('AES-CBC',processedKey);
    cipher.start({iv:iv});
    cipher.update(forge.util.createBuffer(object));
    let result = cipher.finish();
    if(result){
        console.log("encryption successful");
    }else{
        console.log("encryption failed");
    }
    let encrypted = cipher.output;
    return encrypted;
}

function decryptAES(iv,key,object){
    let md = forge.md.sha256.create();
    md.update(key)
    let processedKey = md.digest();
    let decipher = forge.cipher.createDecipher('AES-CBC',processedKey);
    decipher.start({iv:iv});
    decipher.update(object);
    let result = decipher.finish();
    if(result){
        console.log("decryption successful");
    }else{
        console.log("decryption failed");
    }
    let plainOutput = decipher.output;
    return plainOutput;
}

module.exports = {
    generateKey:generateKey,
    encryptAES:encryptAES,
    decryptAES:decryptAES
}