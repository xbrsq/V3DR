const commands = [
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
		name: "Background Set",
		comID: "PITCH",
		execute: function(data) {
			controls.pitch = parseFloat(data);
		}
	},
	{ // set yaw
		name: "Background Set",
		comID: "YAW",
		execute: function(data) {
			controls.yaw = parseFloat(data);
		}
	},
	{ // set zoom
		name: "Background Set",
		comID: "ZOOM",
		execute: function(data) {
			controls.zoom = parseFloat(data);
		}
	},
	
]