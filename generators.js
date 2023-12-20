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
        generate: function(pos, rot, radius, height, color=0xff0000) {
            let geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
            let material = new THREE.MeshBasicMaterial({ color: color });

            let obj = new THREE.Mesh(geometry, material);
            
            obj.position = new THREE.Vector3(...pos);            
            obj.rotation.set(...rot);

            return obj
        }
    },
    {
        name: "Line",
        genID: "lin",
        generate: function(start, end, color) {
            let points = [];
            points.push(new THREE.Vector3(...start));
            points.push(new THREE.Vector3(...end));

            let geometry = new THREE.BufferGeometry().setFromPoints(points);

            let material = new THREE.LineBasicMaterial({color: color});

            let line = new THREE.Line(geometry, material);
            return line;
        }
    }


];