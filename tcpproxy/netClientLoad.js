var net = require('net');
//158.42.214.6
//158.42.179.245

if (process.argv.length != 4) {
	console.log('Parametros no introducidos correctamente');
	console.log('Uso: node mytcpproxy.js Tu_Direccion_IP Direccion_Proxy\n');
		
	process.exit();	
}

var port = 8000;
var ip = process.argv[3];

var client = net.connect( port, function () {
	// Comprueba que se le ha pasado un argumento (en este caso la IP)
		client.write(process.argv[2]);
});

client.on('data', function (data) {
	console.log(data.toString()),
	client.end();
});

client.on('end', function() {
	console.log('Client desconectat');
	process.exit();
});

