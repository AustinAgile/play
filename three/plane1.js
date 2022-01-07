import * as _3js from '../../three/build/three.module.js';

function builder() {

  this.h = 0;

  this.setScene = function(scene) {
    this.scene = scene;
  };

  this.plane = function(points, origin, color, more) {
    if (points[2] == 0) {
      this.main([points[0], points[1]], origin, [0,0,0], color);
    } else {
      var radians = Math.atan(points[2]/points[1]);
      if (more) {
        radians=Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      this.main([points[0], Math.sqrt(Math.pow(points[1],2)+Math.pow(points[2],2))], origin, [angle,0,0], color);
      this.h += points[2];
    }
  };

  this.main = function(size, origin, rotate, color) {
    var planeGeo = new _3js.PlaneBufferGeometry(size[0], size[1], 8, 8);
    var planeMat = new _3js.MeshLambertMaterial({
      color: color,
      opacity: 0.6,
      // transparent: true,
      side: _3js.DoubleSide
    });
    var plane = new _3js.Mesh(planeGeo, planeMat);

    var rot = {
      vector: [0,0,0],
      angle: [0,0,0]
    }
    if(rotate[0]>0) {
      rot.vector[0] = 1;
      rot.angle[0] = rotate[0]*Math.PI/180;
    }
    if(rotate[1]>0) {
      rot.vector[1] = 1;
      rot.angle[1] = rotate[1]*Math.PI/180;
    }
    if(rotate[2]>0) {
      rot.vector[2] = 1;
      rot.angle[2] = rotate[2]*Math.PI/180;
    }
    // console.log(rot);
    // plane.position.set(origin[0]+size[0]/2, origin[1]+size[1]/2, origin[2]);
    plane.position.set(origin[0]+size[0]/2, origin[1]+size[1]/2, origin[2]);
    // plane.setRotationFromAxisAngle(new _3js.Vector3(1,0,0), Math.PI/2);
    // rotateAboutPoint(plane, new _3js.Vector3(origin[0], origin[1], origin[2]), new _3js.Vector3(1,0,0), Math.PI/2);
    rotateAboutPoint(plane, new _3js.Vector3(origin[0], origin[1], origin[2]), new _3js.Vector3(rot.vector[0], rot.vector[1],rot.vector[2]), rot.angle[0]+rot.angle[1]+rot.angle[2]);
    // rotateAboutPoint(plane, new _3js.Vector3(origin[0], origin[1], origin[2]), [1,0,0], Math.PI/2);
    // scene.add(plane);
    this.scene.add(plane);

    return plane;
  }

  function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
      // pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

      // if(pointIsWorld){
      //     obj.parent.localToWorld(obj.position); // compensate for world coordinate
      // }

      obj.position.sub(point); // remove the offset
      obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
      obj.position.add(point); // re-add the offset

      // if(pointIsWorld){
      //     obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
      // }

      obj.rotateOnAxis(axis, theta); // rotate the OBJECT
  }
}

export {builder};
