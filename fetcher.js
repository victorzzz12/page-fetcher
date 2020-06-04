let userInput = process.argv.slice(2);
const request = require('request');
const fs = require("fs");
const readline = require('readline');


request(`${userInput[0]}`, (error, response, body) => {

  if (getFilesizeInBytes('./fetcher') > 0) {
    
    rl.question('Would like to overwrite? Y/N: ', (answer) => {
      if (answer === 'Y' || answer === 'y') {
        fs.writeFile("./fetcher.xt", body, (error) => {
          if (error) {
            // Handle error
            console.log("Failed to write to file");
            return;
          }

          console.log(`Downloaded and saved ${getFilesizeInBytes('./fetcher.txt')} bytes to ./fetcher.txt.`);
            
        });
        console.log(`Overwritten`);
      }
      if (answer === 'N' || answer === 'n') {
        console.log("File was not overwritten.");
      }
      rl.close();
    });

  } else {
    fs.writeFile("./fetcher.txt", body, (error) => {
      if (error) {
        // Handle error
        console.log("Failed to write to file");
        return;
      }

      console.log(`Downloaded and saved ${getFilesizeInBytes('./fetcher.txt')} bytes to ./fetcher.txt.`);
        
    });
  }


});


function getFilesizeInBytes(filename) {
  let stats = fs.statSync(filename)
  let fileSizeInBytes = stats["size"]
  return fileSizeInBytes;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

