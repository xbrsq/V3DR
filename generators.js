generators = [
    {
        name: "Example Object",     // name is the internal name, used for errors, etc.
        genID: "exm",               // genID is the string in the input used to generate the object.
                                    //      LENGTH MUST BE EXACTLY 3
                                    //      caps sensitive.
        
        generate: function() {},    // generate is the function to generate the object. It should NOT add to the scene,
                                    //      that will be handled elsewhere. You should, however, set the position & rotation.


    },
    {
        name: "Cylinder",
        genID: "cyl",
        generate: function(x, y, z, rx, ry, rz, radius, height, color=0xff0000) {
            let geometry = new THREE.CylinderGeometry(radius, radius, height);
            let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

            let obj = new THREE.Mesh(geometry, material);
            
            obj.position = new THREE.Vector3(x, y, z);            
            obj.rotation = new THREE.Euler(rx, ry, rz);

            return obj
        }
    },


];