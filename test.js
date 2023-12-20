if(IMPORT_SCRIPTS=true) {
    var keyscript = document.createElement('script');
    keyscript.src = 'keys.js';
    document.head.appendChild(keyscript);

    var genscript = document.createElement('script');
    genscript.src = 'generators.js';
    document.head.appendChild(genscript);

    var script = document.createElement('script');

    // Set the source to the Three.js CDN or local path
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';

    // Define a function to be executed after the script loads
    script.onload = function () {
    // Code to execute after Three.js is loaded
    init();
    console.log('Three.js has been loaded!');
    };

    // Append the script element to the head of the document
    document.head.appendChild(script);
}




class GenerationError extends Error {
    constructor(message) {
      super(message);
      this.name = "GenerationError"; 
    }
    static formatString = "Error generating %%name%%: %%other%%"
  }

let scene, camera, renderer, controls;

controls = {

    zoom: 4,

    pitch: (30/180) * Math.PI,
    pitchSpeed: 0.01,

    yaw: (90/180)*Math.PI,
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

        this.updateCamera()
    },

    updateCamera: function(){
        let x,y,z, ux,uy,uz; // u is for up
        ux = Math.cos(this.yaw) * Math.cos(this.pitch+90);
        uz = Math.sin(this.yaw) * Math.cos(this.pitch+90);
        uy = Math.sin(this.pitch+90);

        x = this.zoom * Math.cos(this.yaw) * Math.cos(this.pitch);
        z = this.zoom * Math.sin(this.yaw) * Math.cos(this.pitch);
        y = this.zoom * Math.sin(this.pitch);

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

    let obj;

    for(let i=1;i<generators.length;i++) { // start at 1 because Example Object is #0.
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
    scene.add(obj);

    return obj;
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
    document.body.appendChild(renderer.domElement);

    // Create cylinders and add them to the scene
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    cylinder1.position.x = -2;
    cylinder2.position.x = 2;
    cylinder2.position.y = 0.5;

    scene.add(cylinder1);
    scene.add(cylinder2);

    animate();

    gen_object("cyl", [
        [1, 2, 1], 
        [0, 45, 45], 
        0.2, 
        3, 
        0x00ff00
    ]);
    console.log(gen_object("lin", [
        [2, 2, 1], 
        [-4, 3, -1.5],
        0x00ff00
    ]));
}

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
}

window.addEventListener('resize', onWindowResize);

// init();