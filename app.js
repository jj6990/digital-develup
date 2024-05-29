const http = require('http');


http.createServer((req,res) => { 
	res.write("develup tech node server");
	res.end();
}).listen(3000);

console.log(`started on 3000`);



