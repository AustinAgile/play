import * as _3js from '../../three/build/three.module.js';


function shaper() {

  this.constructor = function() {
    console.log("con");
    this.holes = [];
  }


  this.setScene = function(scene) {
    this.scene = scene;
  };

  this.plane = function(points, origin, color, more) {
    if (points[2] == 0) {
      this.main([points[0], points[1]], origin, [0,0,0], color);
    } else {
      var radians = Math.atan(points[2]/points[1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      this.main([points[0], Math.sqrt(Math.pow(points[1],2)+Math.pow(points[2],2))], origin, [angle,0,0], color);
      this.h += points[2];
    }
  };
  this.plane2 = function(points, origin, color, more) {
    if (points[2] == 0) {
      origin[1] = origin[1] + points[0];
      this.main([points[0], points[1]], origin, [0,0,270], color);
    } else {
      var radians = Math.atan(points[2]/points[1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      this.main([points[0], Math.sqrt(Math.pow(points[1],2)+Math.pow(points[2],2))], [origin[0],origin[1]+points[0],origin[2]], [0,-angle,270], color);
      this.h += points[2];
    }
  };

  this.main = function(size, origin, rotate, color) {
    var shape = new _3js.Shape();
    shape.moveTo( 0, 0);
    shape.lineTo(size[0], 0);
    shape.lineTo(size[0], size[1]);
    shape.lineTo(0, size[1]);
    shape.holes = this.holes;
    this.holes = [];
//    console.log(shape.extractPoints());

    var shapeGeometry = new _3js.ShapeGeometry( shape );

    var planeMat = new _3js.MeshLambertMaterial({
      color: color,
      opacity: 0.6,
      // transparent: true,
      side: _3js.DoubleSide
    });
    var plane = new _3js.Mesh(shapeGeometry, planeMat);
    plane.castShadow = true;
    plane.receiveShadow = true;

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

    plane.setRotationFromEuler(new _3js.Euler(rotate[0]*Math.PI/180,rotate[1]*Math.PI/180,rotate[2]*Math.PI/180));
    plane.position.set(origin[0], origin[1], origin[2]);
    this.scene.add(plane);

    return plane;
  }

  this.addHole = function(origin, size) {
    var hole = new _3js.Shape();
    hole.moveTo( origin[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1]+size[1] );
    hole.lineTo( origin[0], origin[1]+size[1] );
    this.holes.push(hole);
  }

  this.old = function(x, y) {
    const heartShape = new _3js.Shape();

    heartShape.moveTo( x + .5, y + .5 );
    heartShape.bezierCurveTo( x + .5, y + .5, x + .4, y, x, y );
    heartShape.bezierCurveTo( x - .6, y, x - .6, y + .7,x - .6, y + .7 );
    heartShape.bezierCurveTo( x - .6, y + 1.1, x - .3, y + 1.54, x + .5, y + 1.9 );
    heartShape.bezierCurveTo( x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + .7 );
    heartShape.bezierCurveTo( x + 1.6, y + .7, x + 1.6, y, x + 1.0, y );
    heartShape.bezierCurveTo( x + .7, y, x + .5, y + .5, x + .5, y + .5 );

    const holes = new _3js.Shape();
    holes.moveTo( x+.5, y + .75 );
    holes.lineTo( x + .75, y + 1);
    holes.lineTo( x + .5, y + 1.25);
    holes.lineTo( x + .25, y + 1);
    heartShape.holes.push(holes);

    console.log(heartShape.extractPoints());

    const geometry = new _3js.ShapeGeometry( heartShape );
    console.log(geometry);
    // const material = new _3js.MeshBasicMaterial({
    const material = new _3js.MeshPhysicalMaterial({
      color: 0xff0000,
      opacity: 0.4,
      transparent: true,
      side: _3js.DoubleSide,
      // metalness: .5,
      roughness: 0,
      reflectivity: 1
  });
    const mesh = new _3js.Mesh( geometry, material ) ;
    return mesh;
  }
}

export {shaper};
