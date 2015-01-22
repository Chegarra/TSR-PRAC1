var fs  = require('fs');
var net = require('net');

var server = net.createServer( function(c) {
	
	c.on('end', function() {
		console.log('Servidor desconectado');
	});

	c.on('data', function(data) {
		
		data = fs.readFileSync('/proc/loadavg');
		var tokens = data.toString().split(' ');
		
		var min1 = parseFloat(tokens[0])+0.01;
		var min5 = parseFloat(tokens[1])+0.01;
		var min15 = parseFloat(tokens[2])+0.01;
		
		var servidor = { ip: c.localAddress, load: min1*10+min5*2+min15 };
		var cliente  = { ip: c.remoteAddress, data: data };
		var respuesta = { Servidor: servidor, Client: cliente};
		
		
		c.write(JSON.stringify(respuesta));

		//c.write('Hola\r\n');
		//c.write(c.localAdress);
		//c.write(c.remoteAdress);
		//c.pipe(c);
	}); 
});

server.listen(8001, function() {
	console.log('Servidor Escuchando');
});

