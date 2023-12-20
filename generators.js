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
        generate: function(pos, rot, radius, height, color, opacity=1) {
            let geometry = new THREE.CylinderGeometry(radius, radius, height, 32);

            let material = new THREE.MeshBasicMaterial({color: color});
            if(opacity<1){
                material.opacity = opacity;
                material.transparent = true;
            }

            let obj = new THREE.Mesh(geometry, material);
            
            obj.position.set(...pos);            
            obj.rotation.set(...rot);
            console.log(obj);
            return obj;
        }
    },
    {
        name: "Line",
        genID: "lin",
        generate: function(start, end, color, opacity) {
            let points = [];
            points.push(new THREE.Vector3(...start));
            points.push(new THREE.Vector3(...end));

            let geometry = new THREE.BufferGeometry().setFromPoints(points);

            let material = new THREE.LineBasicMaterial({color: color});
            if(opacity<1){
                material.opacity = opacity;
                material.transparent = true;
            }

            let line = new THREE.Line(geometry, material);
            return line;
        }
    }


];

