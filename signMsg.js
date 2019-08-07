// IMPORTS
const fs = require("fs");
const crypto = require("crypto");

//VARIABLES
let privKey = fs.readFileSync(process.argv[2], "utf-8");
let message = fs.readFileSync(process.argv[3], "utf-8");
let signedMsgFileName = process.argv[4];

const signer = crypto.createSign("sha256");
signer.update(message);
signer.end();
const signature = signer.sign(privKey);

//TODO: replace with Promise
fs.writeFile(`signedMessages/${signedMsgFileName}`, signature, err => {
  if (err) throw err;
  console.log(`The file has been saved!`);
});
