# Developer Assessment V2

I first created this [app to work entirely on the command line](https://github.com/cpustejovsky/CharlesPustejovsky-2019). Here is the app as an Express application.

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
* To sign a message with your private key, open a new tab on terminal and run `node signMsg.js <path/to/private_key> <message file> <path-and-name-for-signature>`
  * Since none of this needs to or should touch the server, I've left it out of the web app and as a script to be run on your local machine.
* Now you can use the homepage. Upload the message, signature, and the username of who signed the message. The app will tell you if that file was signed with a private key corresponding to the public key associated with the username you submitted.
