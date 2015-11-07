/**
 * minecraft-pi-promise tests.
 *
 * @package minecraft-pi-promise
 * @author Lars Gregori <lars.gregori@gmail.com>
 */

/**
 * Dependencies
 */
var test = require('tap').test;
var Minecraft = require('./../lib/minecraft.js');

var minecraft_server_name = '192.168.2.110';
var minecraft_server_port = 4711;

var mc_connection;

test('connect', function(t) {
	new Minecraft(minecraft_server_name, minecraft_server_port, 'test is running...')
	.then(function(mc) {
		mc_connection = mc;
		t.type(mc_connection, 'object', 'The connection should be an object.');
		t.end();
	});
});

test('receive data', function(t) {
	mc_connection.getBlockWithData(99999, 99999, 99999)
	.then(function(receivedData) {
        	t.type(receivedData, 'string', 'A string of data should be returned.')
                t.equals(receivedData, '0,0\n', 'Expected result.')
                t.end();
		mc_connection.chat('done');
		mc_connection.end();
	});
});
