Keeping Spotify Client ID and Client Secret Safe.
1. Create a .env file to store API keys 
add something like this
example: CLIENT_ID=your_client_id
         CLIENT_SECRET=your_client_secret

2. Install dotenv. It loads the .env file so your Javascript
   app can access those keys.
   Command for Mac/Windows: 
   npm install dotenv
3. use the keys like this:
   const clientID = process.env.CLIENT_ID
   const clientSecret = process.env.CLIENT_SECRET
this avoids hardcoding your keys

4. import dotenv and have dotenv.config in file you will be importing fields from dotenv.
-------------------------------------------------------------








