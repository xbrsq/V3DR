if(IMPORT_SCRIPTS=true) {
    var keyscript = document.createElement('script');

    // Set the source to the Three.js CDN or local path
    keyscript.src = 'keys.js';

    // Append the script element to the head of the document
    document.head.appendChild(keyscript);

    var script = document.createElement('script');

    // Set the source to the Three.js CDN or local path
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';

    // Define a function to be executed after the script loads
    script.onload = function () {
    // Code to execute after Three.js is loaded
    init();
    console.log('Three.js has been loaded!');
    // You can start using Three.js here
    // For example:
    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // ...
    };

    // Append the script element to the head of the document
    document.head.appendChild(script);
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

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
    document.body.appendChild(renderer.domElement);
    let ctx=renderer.domElement.getContext("2d");
    aftereffects.ctx = ctx;

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