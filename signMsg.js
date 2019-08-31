// IMPORTS
const fs = require("fs");
const crypto = require("crypto");

//VARIABLES
let privKey = fs.readFileSync(process.argv[2], "utf-8");
let message = fs.readFileSync(process.argv[3], "utf-8");
let signedMsgFileNamePath = process.argv[4];

//https://nodejs.org/api/crypto.html#crypto_class_sign
const signer = crypto.createSign("sha256");
signer.update(message);
signer.end();
const signature = signer.sign(privKey);

fs.writeFile(`${signedMsgFileNamePath}`, signature, err => {
  if (err) throw err;
  console.log(
    `The file has been saved at the following path:\n${signedMsgFileNamePath}`
  );
});
