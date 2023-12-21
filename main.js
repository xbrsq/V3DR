if(IMPORT_SCRIPTS=true) {
    let keyscript = document.createElement('script');
    keyscript.src = 'keys.js';
    document.head.appendChild(keyscript);

    let genscript = document.createElement('script');
    genscript.src = 'generators.js';
    document.head.appendChild(genscript);

    let comscript = document.createElement('script');
    comscript.src = 'commands.js';
    document.head.appendChild(comscript);

    let script = document.createElement('script');

    // Set the source to the Three.js CDN or local path
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';

    // Define a function to be executed after the script loads
    script.onload = function () {
    // Code to execute after Three.js is loaded
    init();
    // console.log('Three.js has been loaded!');
    };

    // Append the script element to the head of the document
    document.head.appendChild(script);
}




class GenerationError extends Error {
    constructor(message) {
      super(message);
      this.name = "GenerationError"; 
    }
    static formatString = "Error generating %%name%%: Encountered %%other%%"
}

let scene, camera, renderer, controls;

controls = {

    zoom: 4,
    zoomSpeed: 0.01,

    pitch: 0,
    pitchSpeed: 0.01,

    yaw: 0,
    yawSpeed: 0.01,
    
    update: function(){
        if(window.keys.ArrowUp){
            this.pitch += this.pitchSpeed;
        }
        if(window.keys.ArrowDown){
            this.pitch -= this.pitchSpeed;
        }
        if(window.keys.ArrowRight){
            this.yaw += this.yawSpeed;
        }
        if(window.keys.ArrowLeft){
            this.yaw -= this.yawSpeed;
        }
        if(window.keys.PageUp){
            this.zoom /= this.zoomSpeed + 1;
        }
        if(window.keys.PageDown){
            this.zoom *= this.zoomSpeed + 1;
        }
        
        this.updateCamera()
    },

    updateCamera: function(){
        let x,y,z, ux,uy,uz; // u is for up
        x = this.zoom * Math.cos(this.yaw) * Math.cos(this.pitch);
        z = this.zoom * Math.sin(this.yaw) * Math.cos(this.pitch);
        y = this.zoom * Math.sin(this.pitch);

        ux = Math.cos(this.yaw) * Math.cos(this.pitch+1);
        uz = Math.sin(this.yaw) * Math.cos(this.pitch+1);
        uy = Math.sin(this.pitch+2);        // I have no idea why 1 works as a value ¯\_(ツ)_/¯
                                            // if you do what it should be (90*DEG_to_RAD), then
                                            // it has a slight bit of roll while pressing a yaw key

        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;

        camera.lookAt(0,0,0);
        camera.up = new THREE.Vector3(ux,uy,uz)
    }

}

function gen_object(type, argument_array) {
    if(argument_array.length==0) {
        return;
    }

    let obj,i;

    for(i=1;i<generators.length;i++) { // start at 1 because Example Object is #0.
        if(type==generators[i].genID) {
            try {
                obj = generators[i].generate(...argument_array)
                i=100000000; // break out of for loop, because I have had poor experiences with break and if interactions.
            }
            catch(err) {
                throw new GenerationError(
                    GenerationError.formatString
                    .replace("%%name%%", generators[i].name)
                    .replace("%%other%%", err.message));
            }
        }
    }
    if(i!=100000001){
        throw new GenerationError(
            GenerationError.formatString
            .replace("%%name%%", "object")
            .replace("%%other%%", "unknown type: "+type));
    }
    scene.add(obj);

    return obj;
}

function single_gen_from_string(input_string) {
    let input = input_string.split(";");
    let type = input[0];      // which generator to use
    let data= input.slice(1); // data fed to generator for arguments

    for(let i=0;i<data.length;i++) {
        if(data[i].search(",")){    // if the data includes a comma, split it into multiple subentries (for pos, rot, etc.)
            data[i] = data[i].split(",");
            for(let j=0;j<data[i].length;j++) {
                data[i][j] = parseFloat(data[i][j]); // all data should be in numerical format
            }
        }
        else {
            data[i] = parseFloat(data[i]); // all data should be in numerical format
        }
    }

    return gen_object(type, data);
}

function multi_from_string(input_string) {
    let lines = input_string.split("\n");
    let line;
    for(let n=0;n<lines.length;n++) {
        line=lines[n];
        if(line==""){
            continue;
        }
        switch(lines[n][0]) {
            case "+":                    // add object
                single_gen_from_string(line.slice(1));
                break;
            case ":":                   // command
                single_command_from_string(line.slice(1))
                break;
            default:    //unknown identifier
                console.log("Unknown identifier: "+lines[n][0]+" on line "+n);
        }
    }
}

function single_command_from_string(input_string) {
    let dist_to_space = input_string.search(" ");
    let comName = input_string.slice(0,dist_to_space);
    let data = input_string.slice(dist_to_space+1);
    
    for(let i=0;i<commands.length;i++){
        if(comName == commands[i].comID) {
            commands[i].execute(data);
        }
    }
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.98, window.innerHeight*0.98);
    document.body.appendChild(renderer.domElement);

    animate();


    // gen_object("cyl", [ // debug cyl1
    //     [-2, 0, 3],
    //     [0, 0, 0],
    //     1,
    //     1,
    //     0xff0000,
    //     0.9
    // ]);

    // gen_object("cyl", [ // debug cyl2
    //     [2, 0.5, 0],
    //     [0, 0, 0],
    //     1,
    //     1,
    //     0xff0000,
    //     0.9
    // ]);

    // gen_object("cyl", [
    //     [1, 2, 1], 
    //     [0, 45, 45], 
    //     0.2, 
    //     3, 
    //     0x00ff00,
    //     0.5
    // ]);
    // gen_object("lin", [
    //     [2, 2, 1], 
    //     [-4, 3, -1.5],
    //     0x00ff00,
    //     0.8
    // ]);

    multi_from_string(
        "+cyl;0,3,0;0,0,0;2;0.2;16711935;0.9\n" +
        "+cyl;0,-3,0;0,0,0;2;0.2;16711935;0.9\n" +
        "+cyl;3,0,0;0,0,90;2;0.2;16711935;0.9\n" +
        ":BGSET red\n:PITCH 0\n:YAW 90\n:ZOOM 10"
    )
}

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*0.98, window.innerHeight*0.98);
}

window.addEventListener('resize', onWindowResize);

// init();