var net = require('net');


var LOCAL_IP = '';
//  ESCUCHA EL PUERTO 8000 PARA CONFIGURAR
var server = net.createServer (function (socket) {
	
		socket.on('data', function (data) {
			// RECIBE LOS DATOS DEL 'Controlador'
			var datos = JSON.parse(data);
			// CREAR UN SERVER CON LOS DATOS FACILITADOS
			crearConexion(datos.inPort, datos.remote.ip, datos.remote.port);
			// INFO POR PANTALLA
			console.log('Regla introducida:\n\tPara el puerto: ' + datos.inPort);
			console.log('\tRedirecciona: ' + datos.remote.ip + ':' + datos.remote.port);

		});
}).listen(8000, LOCAL_IP);

console.log('PROXY ON');

function crearConexion (localPort, ipRemote, portRemote) {
	var server = net.createServer (function (socket) {	
		socket.on('data', function (data) {
			var ss = new net.Socket();
			ss.connect(parseInt(portRemote), ipRemote, function() {
				ss.write(data);
			});
			ss.on('data', function(data) {
				socket.write(data);
			});
		});
	}).listen(localPort, LOCAL_IP);
 }

