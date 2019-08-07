const fs = require("fs");
const crypto = require("crypto");

// let username = process.argv[2];
let privKey = fs.readFileSync(process.argv[2], "utf-8");
let message = fs.readFileSync(process.argv[3], "utf-8");
let signedMsgFileName = process.argv[4];
const signer = crypto.createSign("sha256");
signer.update(message);
signer.end();

const signature = signer.sign(privKey);
const signature_hex = signature.toString("hex");

// console.log(signature_hex);
fs.writeFile(`signedMessages/${signedMsgFileName}.txt`, signature_hex, err => {
  if (err) throw err;
  console.log(`The file has been saved!`);
});
