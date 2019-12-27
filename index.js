const program = require('commander')
const process = require('process');
const crypto = require('./crypto_core/crypto.js')
const debug = true;
let cmdValue = ''
program.command('encrypt')
    .alias('e')
    .option('-k, --key <type>')
    .option('-o, --object <type>')
    .action(function(){
        cmdValue = 'encrypt'
    })

program.command('decrypt')
    .alias('d')
    .option('-k, --key <type>')
    .option('-o, --object <type>')
    .action(function(){
        cmdValue = 'decrypt'
    })

program.parse(process.argv);

if(cmdValue == 'encrypt'){
    console.log("In encryption mode");
    var pair = crypto.generateKey(128,program.commands[0].key);
    var payload = encrypt(pair.iv,program.commands[0].key,program.commands[0].object);
    console.log(`This is the encrypted payload: ${payload.toHex()}`);
    var plainText = decrypt(pair.iv,program.commands[0].key,payload);
    console.log(`This is the decrypted plaintext: ${plainText.toString('utf-8')}`);
}else if(cmdValue == 'decrypt'){
    console.log("In decryption mode");
}else{
    console.log("err")
}

function encrypt(iv,key,obj){
    var cipher = crypto.encryptAES(iv,key,obj);
    return cipher;
}

function decrypt(iv,key,obj){
    var cipher = crypto.decryptAES(iv,key,obj);
    return cipher;
}