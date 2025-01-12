Before running the application - execute the following commands:
1. npm install
2. npm install -D tailwindcss
3. npx tailwindcss init

Run the application
1. npm start

Deploy the application:
Modify in package.json: 
1. "homepage": "https://sruthimandalapu.github.io/react_mini_application"; 
2. in scripts: add the following - "predeploy": "npm run build", "deploy": "gh-pages -d build"
Run the following:
1. npm install --save-dev gh-pages
2. npm run deploy

Deployed URL: https://sruthimandalapu.github.io/react_mini_application

