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

    pitch: 0,
    pitchSpeed: 0.01,

    yaw: 0,
    yawSpeed: 0.01,
    
    update: function(){
        if(window.keys.ArrowUp){
            pitch += pitchSpeed;
        }
        if(window.keys.ArrowDown){
            pitch -= pitchSpeed;
        }
        if(window.keys.ArrowRight){
            pitch += pitchSpeed;
        }
        if(window.keys.ArrowLeft){
            pitch -= pitchSpeed;
        }

        this.updateCamera()
    },

    updateCamera: function(){}

}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create cylinders and add them to the scene
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  cylinder1.position.x = -2;
  cylinder2.position.x = 2;

  scene.add(cylinder1);
  scene.add(cylinder2);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// init();