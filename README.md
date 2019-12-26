# password_encryption_core
Core encryption module responsible for :
Generation of keys
AES encryption
AES decryption

Using node-forge as encryption library

# how to use
To encrypt
1. node index encrypt --key "sample password" --object "sample object to be encrypted"

To decrypt
1. node index decrypt --key "sample password" --object "sample object to be decrypted"