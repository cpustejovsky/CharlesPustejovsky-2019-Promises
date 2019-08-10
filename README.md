# --Developer Assessment 2019-- Promise Practice Based On a Developer Assessment

## Set Up
1. Clone repository
2. Run npm install to get dependencies (this was built with v10.15.3 of NodeJS and v.6.10.1 of NPM)
3. Have MongoDB running locally
4. If you are running into issues, having running `mongo` or something like RoboMongo could help

## Authentication
1. Once set up, run `node signUp.js <username> <password>`
2. Upon success you'll receive the message: `Huzzah! <username> was authenticated. Make sure to keep that password in a secure place.`

## Working with Public and Private Keys

* To store a public key connected to your username, run `node storePubKey.js <username> <password> <path/to/publickey>`
* To sign a message with your private key, run `node signMsg.js <path/to/private_key> <message file> <names-of-signed-message-file>`; The signed message will be located in the `signatures` directory.
* To verify that a message was signed by the private key associated with a specific public key, run `node verifyMsg.js <username-attached-to-public-key> <signature-located-in-signatures-directory/> <message-you-are-cheecking-for-signature>`


