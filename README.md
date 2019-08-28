# Developer Assessment V2

I didn't understand the instructions and made a command line app when I should've made a client/server. Here's attempt #2 with some gained knowledge of async/await thrown in!

## Set Up
1. Clone repository
2. Run npm install to get dependencies (this was built with v10.15.3 of NodeJS and v.6.10.1 of NPM)
3. Have MongoDB running locally
4. If you are running into issues, run `mongo` in a separate terminal tabe or use something like RoboMongo.
5. Run `npm run start` and go to `localhost:3000` on your browser

## Authentication
1. Click **Register** in the navbar and create an account with a username and password. It will take a few seconds to set up your account.
2. Next login with your username and password 

## Working with Public and Private Keys
* Click **Choose File** and upload your public key
* Enter your password again and press **Submit**
* To sign a message with your private key, run `node signMsg.js <path/to/private_key> <message file> <names-of-signed-message-file>`; The signed message will be located in the `signatures` directory.
* Now you can go use the homepage. Upload the signed message and the username of who signed the message. The app will tell you if that file was in fact signed with a private key corresponding to the public key associated with the username you submitted.