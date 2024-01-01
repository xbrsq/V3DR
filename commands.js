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
	{ // set background color			BGSET
		name: "Background Set",
		comID: "BGSET",
		execute: function(data) {
			scene.background = new THREE.Color(data);
		}
	},
	{ // set camera pitch				PITCH
		name: "Pitch Set",
		comID: "PITCH",
		execute: function(data) {
			controls.pitch = parseFloat(data) * DEG_to_RAD;
		}
	},
	{ // set camera yaw					YAW
		name: "Yaw Set",
		comID: "YAW",
		execute: function(data) {
			controls.yaw = parseFloat(data) * DEG_to_RAD;
		}
	},
	{ // set camera zoom				ZOOM
		name: "Zoom Set",
		comID: "ZOOM",
		execute: function(data) {
			controls.zoom = parseFloat(data);
		}
	},
	{ // set rotation					SETROT
		name: "set rotation",
		comID: "SETROT",
		execute: function(data) {
			let dataAsStrings = data.trim().split(",")
			let dataAsNumbers = [];
			for(let i=0;i<dataAsNumbers.length;i++) {
				dataAsNumbers[i] = parseInt(dataAsStrings[i]);
			}

			let stackIndex;
			if(dataAsNumbers.length == 3){ // if 4 args, arg0 is objStack index
				offset = 0;
				stackIndex = 1;
			}
			else if(dataAsNumbers.length == 4){ // if 4 args, arg0 is objStack index
				offset = 1;
				stackIndex = dataAsNumbers[0];
			}
			else { // fail if not 3 or 4 arguments
				throw new ArgumentError(
					GenerationError.formatString
					.replace("%%number%%", dataAsNumbers.toString())
				);
			}

			objStack[objStack.length-stackIndex]	// latest object added
				.rotation.set(
					dataAsNumbers[offset+0]*DEG_to_RAD, 
					dataAsNumbers[offset+1]*DEG_to_RAD, 
					dataAsNumbers[offset+2]*DEG_to_RAD
				);
		}
	},
	{ // set position					SETPOS
		name: "set position",
		comID: "SETPOS",
		execute: function(data) {
			let dataAsStrings = data.trim().split(",")
			let dataAsNumbers = [];
			for(let i=0;i<dataAsNumbers.length;i++) {
				dataAsNumbers[i] = parseInt(dataAsStrings[i]);
			}

			let stackIndex;
			if(dataAsNumbers.length == 3){ // if 4 args, arg0 is objStack index
				offset = 0;
				stackIndex = 1;
			}
			else if(dataAsNumbers.length == 4){ // if 4 args, arg0 is objStack index
				offset = 1;
				stackIndex = dataAsNumbers[0];
			}
			else { // fail if not 3 or 4 arguments
				throw new ArgumentError(
					GenerationError.formatString
					.replace("%%number%%", dataAsNumbers.toString())
				);
			}

			objStack[objStack.length-stackIndex]	// latest object added
				.position.set(
					dataAsNumbers[offset+0]*DEG_to_RAD, 
					dataAsNumbers[offset+1]*DEG_to_RAD, 
					dataAsNumbers[offset+2]*DEG_to_RAD
				);
		}
	},
	{ // set scale						SETSCL
		name: "set scale",
		comID: "SETSCL",
		execute: function(data) {
			let dataAsStrings = data.trim().split(",")
			let dataAsNumbers = [];
			for(let i=0;i<dataAsNumbers.length;i++) {
				dataAsNumbers[i] = parseInt(dataAsStrings[i]);
			}

			let stackIndex;
			if(dataAsNumbers.length == 3){ // if 4 args, arg0 is objStack index
				offset = 0;
				stackIndex = 1;
			}
			else if(dataAsNumbers.length == 4){ // if 4 args, arg0 is objStack index
				offset = 1;
				stackIndex = dataAsNumbers[0];
			}
			else { // fail if not 3 or 4 arguments
				throw new ArgumentError(
					GenerationError.formatString
					.replace("%%number%%", dataAsNumbers.toString())
				);
			}

			objStack[objStack.length-stackIndex]	// latest object added
				.scale.set(
					dataAsNumbers[offset+0]*DEG_to_RAD, 
					dataAsNumbers[offset+1]*DEG_to_RAD, 
					dataAsNumbers[offset+2]*DEG_to_RAD
				);
		}
	},
	{
		name: "",
		comID: "",
		execute: function(data) {
			
		}
	},
	{
		name: "",
		comID: "",
		execute: function(data) {
			
		}
	}
]