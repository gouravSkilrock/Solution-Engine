This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.


### `Installation Steps`

Pre-requisite: 
1. Node js 
2. React js
3. Mongo DB

# Installation of pre-requisite

1. Node js : As per your OS preference
  > https://nodejs.org/en/download/
2. Mongo DB : Install mongo based on your OS Preference
  > https://www.mongodb.com/try/download/community
3. React Js : This is automatically install while setup the frontend.

# Configuration: 

1. Mongo DB : only for linux 
   For linux : go to the conf file and set IP to "0.0.0.0" for connecting the mongo server from any other server.
   
2. Backend: 
   > Go to config.js file inside the Backend folder.
   > Set the Database, Client & PORT
3. Frontend:
   Customization:
   Go to 'config.js' file inside the Frontend folder. You can change the Project Title, Header's & Various function's name according to your preference.
   

# 'How to start a Application'
1. There are two folder 
 > Frontend : This contains all UI code of the project
 > Backend : This contains all server side implemenation which interact with mongoDB for all operations happened in the UI.
 
2. Lets One by one:

  # Backend:
  > Go inside Backend directory
  > run below command to install all npm's repository
    - npm install
  > Once sucessfully runs above command, we can run the backend by running below command:
    - node index.js
  # Frontend
  > Go inside Frontend directory
  > run below command to install all npm's repository
    - npm install
  > Once sucessfully runs above command, we can run the Frontend by running below command:
    - npm start
    
    
    
 
