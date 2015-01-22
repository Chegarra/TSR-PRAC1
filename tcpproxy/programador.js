var net = require('net');

var port = 8000;

if (process.argv.length != 5) {
	console.log('Parametros no introducidos correctamente');
	console.log('Uso: node controlador.js Dirección_PROXY Direccion_Remota IP_Dir_Remota\n');
		
	process.exit();	
}	
// CAPTURA DE DATOS POR PARAMETROS
var IP_PROXY = process.argv[2];
var PORT_PROXY = parseInt(8001);
var IP_REMOTE = process.argv[4];
var PORT_REMOTE = parseInt(process.argv[5]);

// ENVIO DE CONFIGURACIÓN AL PROXY
var client = net.connect( port, IP_PROXY, function () {
	var envio = JSON.stringify ({'op':'set', 'inPort':PORT_PROXY, 'remote': {'ip':IP_REMOTE, 'port': PORT_REMOTE}});
	client.write(envio);
	client.end();
});

client.on('end', function() {
	console.log('Configuración realizada : ');
	console.log('\tIP del Proxy\t: '+ IP_PROXY);
	console.log('\tPuerto del Proxy: ' + PORT_PROXY);
	console.log('\tDireccion Remota: ' + IP_REMOTE);
	console.log('\tPuerto Remoto\t: ' + PORT_REMOTE);
	console.log('');
	process.exit();
});
