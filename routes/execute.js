const express = require('express');
let router = express.Router();
const fs = require('fs');
const path  = require('path');
const { spawn } = require('child_process');
const { v1: uuidv1 } = require('uuid');


router.post('/', function(req, res, next) {
  	const reqObj = req.body;
  	console.log(reqObj);

  	const tempFileName = uuidv1() + '.du';

  	fs.writeFile(path.join(process.cwd(), `temp/${tempFileName}`), reqObj.code, (err) => {
    		if (err) { console.log(err); next(err); }

    		const child = spawn('dictu', [`temp/${tempFileName}`]);
        let output = [];

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
            output.push(`${data}`);

        });

    		child.on('exit', function (code, signal) {
  		  	   console.log('child process exited with ' +
  		              `code ${code} and signal ${signal}`);
  		  	  res.send(`File - ${tempFileName} code ${code} and signal ${signal} output ${JSON.stringify(output)}`);
		    });

		    child.on('error', function(cperr) {
            console.log(cperr); 
            next(cperr); 
        });
  		
  	});
  	
});

module.exports = router;
