import * as _3js from '../../three/build/three.module.js';
// import * as _ from 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';


function shaper() {

  this.constructor = function() {
    // console.log("con");
    this.holes = [];
    this.planeTransforms = {
      geoRotate: [0,0,0],
      geoTranslate: [0,0,0],
      shapeOriginTranslate: [1,1,1],
      shapeRotateTranslate: [1,1,1]
    };
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  this.setScene = function(scene) {
    this.scene = scene;
  };

  function size2points(size) {
    return [[size[0],0],[size[0],size[1]],[0,size[1]]];
  }

  this.planeX = function(size, origin, color, more, xtraAngle) {
    if (size[2] == 0) {
      // this.main(size, origin, [0,0,0], color);
      this.main2(size2points(size), origin, [0,0,0], color);
    } else {
      var radians = Math.atan(size[2]/size[1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      size[1] = Math.sqrt(Math.pow(size[1],2)+Math.pow(size[2],2));
      // this.main(size, origin, [angle,0,0], color);
      var rotation = [angle,0,0];
      if (xtraAngle) {
        rotation[1] += xtraAngle;
        console.log(rotation);
      }
      this.main2(size2points(size), origin, rotation, color);
      this.h += size[2];
    }
  };
  this.planeY = function(size, origin, color, more) {
    if (size[2] == 0) {
      origin[1] += size[0];
      // this.main(size, origin, [0,0,270], color);
      this.main2(size2points(size), origin, [0,0,270], color);
    } else {
      var radians = Math.atan(size[2]/size[1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      size[1] = Math.sqrt(Math.pow(size[1],2)+Math.pow(size[2],2));
      origin[1] += size[0];
      // this.main(size, origin, [0,-angle,270], color);
      this.main2(size2points(size), origin, [0,-angle,270], color);
      this.h += size[2];
    }
  };
  this.trapX = function(points, origin, color, more) {
    if (points[1][2] == 0) {
      this.main2(points, origin, [0,0,0], color);
    } else {
      var radians = Math.atan(points[1][2]/points[1][1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      points[1][1] = Math.sqrt(Math.pow(points[1][1],2)+Math.pow(points[1][2],2));
      points[2][1] = points[1][1];
      this.main2(points, origin, [angle,0,0], color);
    }
  };
  this.trapY = function(points, origin, color, more) {
    if (points[1][2] == 0) {
      origin[1] += points[0][0];
      this.main2(points, origin, [0,0,270], color);
    } else {
      var radians = Math.atan(points[1][2]/points[1][1]);
      if (more) {
        radians = Math.PI - radians;
      };
      var angle = 180*radians/Math.PI;
      points[1][1] = Math.sqrt(Math.pow(points[1][1],2)+Math.pow(points[1][2],2));
      points[2][1] = points[1][1];
      origin[1] += points[0][0];
      this.main2(points, origin, [0,-angle,270], color);
    }
  };

  this.setPlane = function(direction, translate) {
    if (direction[1] == -1) {//front
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,0],
        geoTranslate: translate,
        shapeOriginTranslate: [1,-1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    } else if (direction[1] == 1) {//back
      this.planeTransforms = {
        geoRotate: [-Math.PI/2,Math.PI,0],
        geoTranslate: translate,
        shapeOriginTranslate: [-1,1,1],
        shapeRotateTranslate: [-1,1,1],
        YisX: false
      };
    } else if (direction[0] == -1) {//left
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,-Math.PI/2],
        geoTranslate: translate,
        // shapeOriginTranslate: [1,-1,1],
        shapeOriginTranslate: [-1,-1,1],
        shapeRotateTranslate: [1,-1,1],
        YisX: true
      };
    } else if (direction[0] == 1) {//right
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,Math.PI/2],
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: true
      };
    }
  }

  this.planeWall = function(points, origin, rotate, color) {
    var geoRotate = this.planeTransforms.geoRotate;
    var geoTranslate = this.planeTransforms.geoTranslate;
    if (points[1][2] == 0) {
      this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
    } else {
      var radians = Math.atan(points[1][2]/points[1][1]);
      var angle = 180*radians/Math.PI;
      points[1][1] = Math.sqrt(Math.pow(points[1][1],2)+Math.pow(points[1][2],2));
      points[2][1] = points[1][1];
      if (this.planeTransforms.YisX) {
        rotate[1] += angle;
      } else {
        rotate[0] += angle;
      }
      this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
    }
}

  this.frontWall = function(points, origin, rotate, color) {
    var geoRotate = [Math.PI/2,0,0];
    var geoTranslate = [0, 0, 0];
    return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  }
  this.backWall = function(points, origin, rotate, color) {
    var geoRotate = [-Math.PI/2,Math.PI,0];
    // var geoTranslate = [points[0][0], 0, 0];
    var geoTranslate = [0, 0, 0];
    origin[1] = -origin[1];
    return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  }
  this.leftWall = function(points, origin, rotate, color) {
    var geoRotate = [Math.PI/2,0,-Math.PI/2];
    var geoTranslate = [0, points[0][0], 0];
    return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  }
  this.rightWall = function(points, origin, rotate, color) {
    var geoRotate = [Math.PI/2,0,Math.PI/2];
    var geoTranslate = [0, 0, 0];
    return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  }

  this.main3 = function(geoRotate, geoTranslate, points, origin, rotate, color) {
    var shape = new _3js.Shape();
    shape.moveTo(0,0);
    shape.lineTo(points[0][0],points[0][1]);
    shape.lineTo(points[1][0],points[1][1]);
    shape.lineTo(points[2][0],points[2][1]);
    shape.holes = this.holes;
    this.holes = [];
//    console.log(shape.extractPoints());

    var shapeGeometry = new _3js.ShapeGeometry( shape );
    shapeGeometry.rotateX(geoRotate[0]);
    shapeGeometry.rotateY(geoRotate[1]);
    shapeGeometry.rotateZ(geoRotate[2]);
    // console.log(geoTranslate);
    // shapeGeometry.translate(geoTranslate[0], geoTranslate[1], geoTranslate[2]);

    var planeMat = new _3js.MeshLambertMaterial({
      color: color,
      opacity: 0.6,
      // transparent: true,
      side: _3js.DoubleSide
    });
    var planeMatBack = new _3js.MeshLambertMaterial({
      color: 0xff0000,
      opacity: 0.6,
      // transparent: true,
      side: _3js.BackSide
    });
    // var plane = new _3js.Mesh(shapeGeometry, planeMat);
    // plane.castShadow = true;
    // plane.receiveShadow = true;


    // plane.setRotationFromEuler(new _3js.Euler(rotate[0]*Math.PI/180,rotate[1]*Math.PI/180,rotate[2]*Math.PI/180));
    // plane.position.set(origin[0], origin[1], origin[2]);
    shapeGeometry.rotateX(this.planeTransforms.shapeRotateTranslate[0] * rotate[0]*Math.PI/180);
    shapeGeometry.rotateY(this.planeTransforms.shapeRotateTranslate[1] * rotate[1]*Math.PI/180);
    shapeGeometry.rotateZ(this.planeTransforms.shapeRotateTranslate[2] * rotate[2]*Math.PI/180);
    // console.log(origin);

    origin[0] = this.planeTransforms.shapeOriginTranslate[0] * origin[0];
    origin[1] = this.planeTransforms.shapeOriginTranslate[1] * origin[1];
    origin[2] = this.planeTransforms.shapeOriginTranslate[2] * origin[2];
    // console.log(origin);
    shapeGeometry.translate(geoTranslate[0], geoTranslate[1], geoTranslate[2]);//better here?

    if (this.planeTransforms.YisX) {
      shapeGeometry.translate(origin[1], origin[0], origin[2]);
    } else {
      shapeGeometry.translate(origin[0], origin[1], origin[2]);
    }

    var plane = new _3js.Mesh(shapeGeometry, planeMat);
    var group = new _3js.Group();
    group.add(plane);
    group.add(new _3js.Mesh(shapeGeometry, planeMatBack));
    plane.castShadow = true;
    plane.receiveShadow = true;
    this.scene.add(group);

    // this.scene.add(plane);

    return plane;
  }

  this.main2 = function(points, origin, rotate, color) {
    var shape = new _3js.Shape();
    shape.moveTo(0,0);
    shape.lineTo(points[0][0],points[0][1]);
    shape.lineTo(points[1][0],points[1][1]);
    shape.lineTo(points[2][0],points[2][1]);
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
    var planeMatBack = new _3js.MeshLambertMaterial({
      color: 0xff0000,
      opacity: 0.6,
      // transparent: true,
      side: _3js.BackSide
    });
    // var plane = new _3js.Mesh(shapeGeometry, planeMat);
    // plane.castShadow = true;
    // plane.receiveShadow = true;

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

    // plane.setRotationFromEuler(new _3js.Euler(rotate[0]*Math.PI/180,rotate[1]*Math.PI/180,rotate[2]*Math.PI/180));
    // plane.position.set(origin[0], origin[1], origin[2]);
    shapeGeometry.rotateX(rotate[0]*Math.PI/180);
    shapeGeometry.rotateY(rotate[1]*Math.PI/180);
    shapeGeometry.rotateZ(rotate[2]*Math.PI/180);
    shapeGeometry.translate(origin[0], origin[1], origin[2]);

    var plane = new _3js.Mesh(shapeGeometry, planeMat);
    var group = new _3js.Group();
    group.add(plane);
    group.add(new _3js.Mesh(shapeGeometry, planeMatBack));
    plane.castShadow = true;
    plane.receiveShadow = true;
    this.scene.add(group);

    // this.scene.add(plane);

    return plane;
  }

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
