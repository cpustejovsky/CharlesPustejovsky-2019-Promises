# Developer Assessment 2019

## Set Up
1. Clone repository
2. Run npm install to get dependencies (this was built with v10.15.3 of NodeJS and v.6.10.1 of NPM)
3. Have MongoDB running locally
4. If you are running into issues, having running `mongo` or something like RoboMongo could help

## Authentication
1. Once set up, `run node signUp.js <username> <password>`
   1. Upon success you'll receive the message 
   > ```bash 
      Huzzah! <username> was authenticated. 
      Make sure to keep that password in a secure place.
    ```