import * as _3js from '../../three/build/three.module.js';


function view() {
  this.setScene = function(scene) {
    this.scene = scene;
  };

  this.lake = function() {
    // var img = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('./data/IMG_5793.png')});
    // // img.map.needsUpdate = true; //ADDED
    // var imgPlane = new THREE.PlaneGeometry(2*4032, 2*3024);
    // var imgMesh= new THREE.Mesh(imgPlane,img);
    // // imgMesh.overdraw = true;
    // imgMesh.rotateX(Math.PI/2);
    // imgMesh.rotateY(Math.PI);
    // imgMesh.position.set(2000,-5000,1500);
    // scene.add(imgMesh);

    var cylGeo = new _3js.CylinderGeometry(5000, 5000, 8000, 100)
    var cylMat = new _3js.MeshBasicMaterial({
      map:new _3js.TextureLoader().load('./data/IMG_5793.png'),
      side: _3js.DoubleSide
    });
    var cylMat2 = new _3js.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.4,
      transparent: true,
      side: _3js.DoubleSide
    });
    const cylMesh= new _3js.Mesh(cylGeo, [cylMat,cylMat2,cylMat2])
    cylMesh.rotateX(Math.PI/2);
    cylMesh.position.set(750,0,500);
    this.scene.add( cylMesh );
  };
}

export {view};
