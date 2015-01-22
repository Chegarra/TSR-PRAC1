var net = require('net');
//158.42.214.6
//158.42.179.245
var port = 8000;
var ip = 'tsr1.dsic.upv.es';

var client = net.connect( port, function () {
	// Comprueba que se le ha pasado un argumento (en este caso la IP)
	if(process.argv.length == 3) {;
		client.write(process.argv[2]);
	}
	else {
		console.log('Debe introduir su IP como argumento');
		process.exit();
	}
});

client.on('data', function (data) {
	console.log(data.toString()),
	client.end();
});

client.on('end', function() {
	console.log('Client desconectat');
	process.exit();
});

