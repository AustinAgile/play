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

    // var something = function() {
    //   this.obj = function() {
    //     return {
    //       data: function(getter) {
    //         console.log(getter);
    //         console.log(this.obj.getter());
    //         // var data = getter();
    //         // return {a:1, b:data.a}
    //       },
    //       getter: function() {return this.data;}
    //     }
    //   };
    // };
    //
    // var test = new something();
    // var obj = test.obj();
    // // console.log(obj);
    // // console.log(obj.getter());
    // obj.data(obj.getter);
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


  this.setPlane = function(direction, translate, angle) {
    if (direction[1] == -1) {//front
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,0],
        geoAngle: -angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,-1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    } else if (direction[1] == 1) {//back
      this.planeTransforms = {
        geoRotate: [-Math.PI/2,Math.PI,0],
        geoAngle: -angle,
        geoTranslate: translate,
        shapeOriginTranslate: [-1,1,1],
        shapeRotateTranslate: [-1,1,1],
        YisX: false
      };
    } else if (direction[0] == -1) {//left
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,-Math.PI/2],
        geoAngle: angle,
        geoTranslate: translate,
        // shapeOriginTranslate: [1,-1,1],
        shapeOriginTranslate: [-1,-1,1],
        shapeRotateTranslate: [1,-1,1],
        YisX: true
      };
    } else if (direction[0] == 1) {//right
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,Math.PI/2],
        geoAngle: -angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: true
      };
    }
  }

  this.planeWall = function(size, origin, rotate, color, mirror) {
    var points = [[size[0],0,0],[size[0],size[1],0],[0,size[1],0]];
    return this.bevelWall(points, origin, rotate, color, mirror);
  }

  this.bevelWall = function(points, origin, rotate, color, mirror) {
    var geoRotate = this.planeTransforms.geoRotate;
    var geoTranslate = this.planeTransforms.geoTranslate;
    if (points[1][2] == 0) {
      // this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
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
      // this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
    }
    this.main3(geoRotate, geoTranslate, points, origin, rotate, color, mirror);
  };

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

  this.main3 = function(geoRotate, geoTranslate, points, origin, rotate, color, mirror) {
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
      color: color.f,
      opacity: 0.5,
      // transparent: true,
      // side: _3js.BackSide
      side: (mirror ?_3js.BackSide : _3js.FrontSide)
    });
    var planeMatBack = new _3js.MeshLambertMaterial({
      color: color.b,
      opacity: 0.5,
      // transparent: true,
      // side: _3js.FrontSide
      side: (mirror ? _3js.FrontSide : _3js.BackSide)
    });
    // if (mirror) {console.log(planeMatBack);}
    // var planeMat = getMaterial(mirror, color, 0xff0000);
    // var plane = new _3js.Mesh(shapeGeometry, planeMat);
    // plane.castShadow = true;
    // plane.receiveShadow = true;


    shapeGeometry.rotateX(this.planeTransforms.shapeRotateTranslate[0] * rotate[0]*Math.PI/180);
    shapeGeometry.rotateY(this.planeTransforms.shapeRotateTranslate[1] * rotate[1]*Math.PI/180);
    shapeGeometry.rotateZ(this.planeTransforms.shapeRotateTranslate[2] * rotate[2]*Math.PI/180);
    // console.log(origin);

    // shapeGeometry.rotateZ(-Math.PI/4);
    shapeGeometry.translate(geoTranslate[0], geoTranslate[1], geoTranslate[2]);//better here?
    // shapeGeometry.rotateZ(-Math.PI/4);

    origin[0] = this.planeTransforms.shapeOriginTranslate[0] * origin[0];
    origin[1] = this.planeTransforms.shapeOriginTranslate[1] * origin[1];
    origin[2] = this.planeTransforms.shapeOriginTranslate[2] * origin[2];
    if (this.planeTransforms.YisX) {
      shapeGeometry.translate(origin[1], origin[0], origin[2]);
    } else {
      shapeGeometry.translate(origin[0], origin[1], origin[2]);
    }

    if (this.planeTransforms.geoAngle !=0) {
      shapeGeometry.translate(-geoTranslate[0], -geoTranslate[1], -geoTranslate[2]);//better here?
      shapeGeometry.rotateZ(this.planeTransforms.geoAngle*Math.PI/180);
      shapeGeometry.translate(geoTranslate[0], geoTranslate[1], geoTranslate[2]);//better here?
    }

    var plane = new _3js.Mesh(shapeGeometry, planeMat);
    // plane.castShadow = true;
    // plane.receiveShadow = true;
    var group = new _3js.Group();
    group.add(plane);
    group.add(new _3js.Mesh(shapeGeometry, planeMatBack));
    this.scene.add(group);

    // this.scene.add(plane);

    return plane;
  };

  this.addWindowHole = function(window) {
    this.addHole([window.offset.x, window.offset.y], [window.size.w, window.size.h]);
  };
  this.planeWallx = function(wall) {
    var size = [wall.size.w, wall.size.h];
    var offset = [wall.offset.x, wall.offset.z, wall.offset.y];
    var rotate = [wall.rotation.x, wall.rotation.y, wall.rotation.z];
    return this.planeWall(size, offset, rotate, wall.color, wall.mirror);
  }
  this.addWindowHolex = function(window, wall) {
    this.addHole([window.offset.x-wall.offset.x, window.offset.y-wall.offset.y], [window.size.w, window.size.h]);
  };
  this.addHole = function(origin, size) {
    var hole = new _3js.Shape();
    hole.moveTo( origin[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1]+size[1] );
    hole.lineTo( origin[0], origin[1]+size[1] );
    this.holes.push(hole);
  };

  this.window = function(points, size, depth, color) {
    this.bevelWall([[depth,0,0],[depth, size[1],0],[0,size[1],0]],[ points[0], 0, points[1]], [ 0, 0, 90], color);
    this.bevelWall([[size[0],0,0],[size[0],depth,0],[0,depth,0]],[ points[0], 0, points[1]], [ -90, 0, 0], color);
    this.bevelWall([[depth,0,0],[depth,size[1],0],[0,size[1],0]],[ points[0]+size[0], -depth, points[1]], [ 0, 0, -90], color);
    this.bevelWall([[size[0],0,0],[size[0],depth,0],[0,depth,0]],[ points[0], -depth, points[1]+size[1]], [ 90, 0, 0], color);
  }



  this.wallSystem = function(wallSystem) {
    this.setPlane(wallSystem.plane.facingDirection, wallSystem.plane.originOffset, wallSystem.plane.rotationZ);

    Object.entries(wallSystem.exterior.surfaces).forEach(function(entry) {//Exterior walls
      var wall = entry[1];

      wall.windows.forEach(function(windowName) {//The exterior holes for windows
        if (!wallSystem.windows.hasOwnProperty(windowName)) {throw new Error;}
        this.addWindowHoleNew(wallSystem.windows[windowName], wall);
      }.bind(this));

      this.planeWallNew(wall);//The exterior wall surface
    }.bind(this));

    Object.entries(wallSystem.interior.surfaces).forEach(function(entry) {//Interior walls
      var wall = entry[1];

      wall.windows.forEach(function(windowName) {//The interior holes and jambs for windows
        this.addWindowJamb(wallSystem.windows[windowName], wall);//The jamb
      }.bind(this));

      wall.windows.forEach(function(windowName) {//The interior holes for windows
        this.addWindowHoleNew(wallSystem.windows[windowName], wall);//The hole
      }.bind(this));

      this.planeWallNew(wall);//The interior wall surface
    }.bind(this));
  };

  this.addWindowJamb = function(window, wall) {
    console.log(window);
    // var depth = -wall.offset.z;//Fix this
    var depth = -wall.offset.y;
    // this.bevelWall([[depth,0,0],[depth,window.size.h,0],[0,window.size.h,0]],[window.offset.x,0,window.offset.y], [ 0, 0, 90], wall.color);
    // this.bevelWall([[window.size.w,0,0],[window.size.w,depth,0],[0,depth,0]],[ window.offset.x,0,window.offset.y], [ -90, 0, 0], wall.color);
    // this.bevelWall([[depth,0,0],[depth,window.size.h,0],[0,window.size.h,0]],[ window.offset.x+window.size.w,-depth,window.offset.y], [ 0, 0, -90], wall.color);
    // this.bevelWall([[window.size.w,0,0],[window.size.w,depth,0],[0,depth,0]],[ window.offset.x,-depth,window.offset.y+window.size.h], [ 90, 0, 0], wall.color);

    this.bevelWall([[depth,0,0],[depth,window.size.h,0],[0,window.size.h,0]],[window.offset.x,0,window.offset.z], [ 0, 0, 90], wall.color);
    this.bevelWall([[window.size.w,0,0],[window.size.w,depth,0],[0,depth,0]],[ window.offset.x,0,window.offset.z], [ -90, 0, 0], wall.color);
    this.bevelWall([[depth,0,0],[depth,window.size.h,0],[0,window.size.h,0]],[ window.offset.x+window.size.w,-depth,window.offset.z], [ 0, 0, -90], wall.color);
    this.bevelWall([[window.size.w,0,0],[window.size.w,depth,0],[0,depth,0]],[ window.offset.x,-depth,window.offset.z+window.size.h], [ 90, 0, 0], wall.color);
  };

  this.addWindowHoleNew = function(window, wall) {
    // this.addHole([window.offset.x-wall.offset.x, window.offset.y-wall.offset.y], [window.size.w, window.size.h]);
    // this.addHole([window.offset.x-wall.offset.x, window.offset.y-wall.offset.z], [window.size.w, window.size.h]);
    this.addHole([window.offset.x-wall.offset.x, window.offset.z-wall.offset.z], [window.size.w, window.size.h]);
  };
  this.planeWallNew = function(wall) {
    var size = [wall.size.w, wall.size.h];
    // var offset = [wall.offset.x, wall.offset.z, wall.offset.y];
    var offset = [wall.offset.x, wall.offset.y, wall.offset.z];
    var rotate = [wall.rotation.x, wall.rotation.y, wall.rotation.z];
    return this.planeWall(size, offset, rotate, wall.color, wall.mirror);
  };

}

export {shaper};
