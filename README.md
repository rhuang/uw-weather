Redesigned weather app for Univeristy of Waterloo students.
===========================================================

Installation
------------

1. Make sure you have [Node.js](http://nodejs.org/ "Node.js") at least 0.8.x.
2. Clone the project: `git clone https://github.com/rhuang/uw-weather.git`.  
3. Navigate to the project and install: `npm install -d`.  
4. Install [nodemon](https://github.com/remy/nodemon) dependency: `sudo npm install nodemon -g`.  
5. Install the JSHint dependency for the pre-commit hook: `sudo npm install jshint -g`.
6. Compile Redis: `cd redis*/` `make`
7. Run the Redis start script first: `./startredis`.
8. Run the Node.js start script: `./start`.  

