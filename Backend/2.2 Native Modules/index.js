const fs=require("fs")

  fs.readFile('talha.txt','utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 