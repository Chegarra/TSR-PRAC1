var net = require('net');

if (process.argv.length != 4) {
	console.log('Parametros no introducidos correctamente');
	console.log('Uso: node mytcpproxy.js Dirección_PROXY Puerto_PROXY\n');
		
	process.exit();	
}
var LOCAL_PORT = 8000;
var LOCAL_IP = '';

// CAPTURA DE DATOS POR PARAMETROS
var REMOTE_IP = process.argv[2];
var REMOTE_PORT	 = parseInt(process.argv[3]);


var server = net.createServer (function (socket) {
	
		socket.on('data', function (msg) {
			
			var ss = new net.Socket();
			ss.connect(parseInt(REMOTE_PORT), REMOTE_IP, function() {
				ss.write(msg);
			});
		
		ss.on('data', function(data) {
			socket.write(data);
		});
	});
		
}).listen(LOCAL_PORT, LOCAL_IP);
	
console.log('Servidor TCP aceptando conexiones por el puerto: ' + LOCAL_PORT);
