function add_command(command) {

}

var commands = [
	{
		name: "Example Command",	// name is the name of the command, used in error messages.
		comID: "EXAMPLE",			// comID is the string used to invoke the command.
									// 		CANNOT include spaces. Should be all caps.
		execute: function(data){},	// execute is the function run when the command is invoked. The rest of the line is passed
									//		in as an argument.
	},
	{ // set background color
		name: "Background Set",
		comID: "BGSET",
		execute: function(data) {
			scene.background = new THREE.Color(data);
		}
	},
	{ // set pitch
		name: "Pitch Set",
		comID: "PITCH",
		execute: function(data) {
			controls.pitch = parseFloat(data) * DEG_to_RAD;
		}
	},
	{ // set yaw
		name: "Yaw Set",
		comID: "YAW",
		execute: function(data) {
			controls.yaw = parseFloat(data) * DEG_to_RAD;
		}
	},
	{ // set zoom
		name: "Zoom Set",
		comID: "ZOOM",
		execute: function(data) {
			controls.zoom = parseFloat(data);
		}
	}
]