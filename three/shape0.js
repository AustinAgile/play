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
    } else if (direction[2] == 1) {//up
      this.planeTransforms = {
        geoRotate: [0,0,0],
        geoAngle: -angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,-1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
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
    // console.log(shape);
    // console.log(shape.extractPoints());

    var shapeGeometry = new _3js.ShapeGeometry( shape );
    shapeGeometry.rotateX(geoRotate[0]);
    shapeGeometry.rotateY(geoRotate[1]);
    shapeGeometry.rotateZ(geoRotate[2]);
    // console.log(geoTranslate);
    // shapeGeometry.translate(geoTranslate[0], geoTranslate[1], geoTranslate[2]);

    var planeMat = new _3js.MeshLambertMaterial({
      color: color.f.color,
      opacity: color.f.opacity,
      // transparent: true,
      side: (mirror ?_3js.BackSide : _3js.FrontSide)
    });
    var planeMatBack = new _3js.MeshLambertMaterial({
      color: color.b.color,
      opacity: color.b.opacity,
      // transparent: true,
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
      this.wallRelativeSize(wallSystem.exterior.surfaces, wall);

      wall.windows.forEach(function(windowName) {//The exterior holes for windows
        if (!wallSystem.windows.hasOwnProperty(windowName)) {
          // throw new Error("Undefined window: "+windowName);
          console.log("Undefined window: "+windowName);
        } else {
          this.addWindowHoleNew(wallSystem.windows, windowName, wall);
        }
      }.bind(this));
      if (wall.hasOwnProperty("bevel")) {
        this.bevelWallNew(wall);//The interior wall surface
      } else {
        this.planeWallNew(wall);//The exterior wall surface
      }
    }.bind(this));

    Object.entries(wallSystem.interior.surfaces).forEach(function(entry) {//Interior walls
      var wall = entry[1];

      wall.windows.forEach(function(windowName) {//The interior holes and jambs for windows
        this.addWindowJamb(wallSystem.windows[windowName], wall);//The jamb
      }.bind(this));

      wall.windows.forEach(function(windowName) {//The interior holes for windows
        // this.addWindowHoleNew(wallSystem.windows[windowName], wall);//The hole
        this.addWindowHoleNew(wallSystem.windows, windowName, wall);//The hole
      }.bind(this));

      if (wall.hasOwnProperty("bevel")) {
        this.bevelWallNew(wall);//The interior wall surface
      } else {
        this.planeWallNew(wall);//The interior wall surface
      }
    }.bind(this));
  };

  this.addWindowJamb = function(window, wall) {
    // console.log("Window jamb");
    // console.log(wall);
    var depth = -wall.offset.y;

    //Left from exterior
    this.planeWallNew({
      size: {w: depth, h: window.size.h},
      offset: {x: window.offset.x, y: 0, z: window.offset.z},
      rotation: {x: 0, y: 0, z: 90},
      color: wall.color,
      mirror: !wall.mirror
    });

    //Bottom
    this.planeWallNew({
      size: {w: window.size.w, h: depth},
      offset: {x: window.offset.x, y: 0, z: window.offset.z},
      rotation: {x: -90, y: 0, z: 0},
      color: wall.color,
      mirror: !wall.mirror
    });

    // Right from exterior
    this.planeWallNew({
      size: {w: depth, h: window.size.h},
      offset: {x: window.offset.x+window.size.w, y: 0, z: window.offset.z},
      rotation: {x: 0, y: 0, z: 90},
      color: wall.color,
      mirror: wall.mirror
    });

    //Top
    this.planeWallNew({
      size: {w: window.size.w, h: depth},
      offset: {x: window.offset.x, y: 0, z: window.offset.z+window.size.h},
      rotation: {x: -90, y: 0, z: 0},
      color: wall.color,
      mirror: wall.mirror
    });
  };

  this.windowRelativeOffset = function(windows, windowName) {
    var window = windows[windowName];
    if (window.offset.hasOwnProperty("window")) {
      var relativeWindow = windows[window.offset.window];
      if (window.offset.hasOwnProperty("dx") && !relativeWindow.offset.hasOwnProperty("x")) {
        this.windowRelativeOffset(relativeWindow);
      }
      window.offset.x = window.offset.dx + relativeWindow.offset.x + relativeWindow.size.w;
    }
    return window;
  }
  this.wallRelativeSize = function(walls, wall) {
    // return;
    if (wall.hasOwnProperty("on")) {
      // console.log(wall.size);
      var relativeWall = walls[wall.on];
      // console.log("relative wall "+relativeWall.name);
      // console.log(relativeWall);
      // console.log(relativeWall);
      // if (wall.size.hasOwnProperty("dw") && !relativeWall.size.hasOwnProperty("w")) {
      //   this.wallRelativeSize(relativeWall);
      // }
      // var extraWidth = this.bevelWidth(relativeWall);
      // wall.size.w = wall.size.dw + relativeWall.size.w + extraWidth.right - extraWidth.left;
      // console.log(wall.size);

      if (!relativeWall.size.hasOwnProperty("w")) {this.wallRelativeSize(walls, relativeWall);}
      if (wall.size.hasOwnProperty("dw")) {
        var extraWidth = this.bevelWidth(relativeWall);
        wall.size.w = wall.size.dw + relativeWall.size.w + extraWidth.right - extraWidth.left;
        // console.log(wall.size);
      }
      if (!relativeWall.offset.hasOwnProperty("x")) {console.log("??");this.wallRelativeSize(walls, relativeWall);}
      if (!relativeWall.offset.hasOwnProperty("y")) {console.log("??");this.wallRelativeSize(walls, relativeWall);}
      if (!relativeWall.offset.hasOwnProperty("z")) {console.log("??");this.wallRelativeSize(walls, relativeWall);}
      // console.log("wall "+wall.name+" here");
      if (wall.offset.hasOwnProperty("dx")) {
        var extraWidth = this.bevelWidth(relativeWall);
        wall.offset.x = wall.offset.dx + relativeWall.offset.x + extraWidth.left;
        // console.log("wall "+wall.name+" has dx, relative x="+relativeWall.offset.x);
        // console.log("offset.x = "+(wall.offset.dx + relativeWall.offset.x + extraWidth.left));
      }
      if (wall.offset.hasOwnProperty("dy")) {
        // console.log("wall "+wall.name+" has dy, relative y="+relativeWall.offset.y);
//        console.log("offset.y = "+(wall.offset.dy + relativeWall.bevel.y));
        wall.offset.y = wall.offset.dy + relativeWall.offset.y;
        if (relativeWall.hasOwnProperty("bevel")) {wall.offset.y += relativeWall.bevel.y;}
      }
      if (wall.offset.hasOwnProperty("dz")) {
        // console.log("wall "+wall.name+" has dz, relative z="+relativeWall.offset.z+", relative h="+relativeWall.size.h);
        wall.offset.z = wall.offset.dz + relativeWall.offset.z + relativeWall.size.h;
        // console.log(wall.offset);
      }
    } else {
      // console.log("wall "+wall.name+" not on anything");
    }
    return wall;
  }

  this.addWindowHoleNew = function(windows, windowName, wall) {
    // this.addHole([window.offset.x-wall.offset.x, window.offset.y-wall.offset.y], [window.size.w, window.size.h]);
    // this.addHole([window.offset.x-wall.offset.x, window.offset.y-wall.offset.z], [window.size.w, window.size.h]);
    // console.log(windows[windowName]);
    // console.log(wall);
    var window = this.windowRelativeOffset(windows, windowName);
    // console.log(window);

    this.addHole([
      window.offset.x - wall.offset.x,
      window.offset.z - wall.offset.z
    ], [
      window.size.w,
      window.size.h
    ]);
  };

  this.planeWallNew = function(wall) {
    var size = [wall.size.w, wall.size.h];
    // var offset = [wall.offset.x, wall.offset.z, wall.offset.y];
    var offset = [wall.offset.x, wall.offset.y, wall.offset.z];
    var rotate = [wall.rotation.x, wall.rotation.y, wall.rotation.z];
    return this.planeWall(size, offset, rotate, wall.color, wall.mirror);
  };

  this.bevelWidth = function(wall) {
    var extraWidth = {left:0, right: 0};
    if (wall.hasOwnProperty("bevel")) {
      if (wall.bevel.miters.hasOwnProperty("angle")) {
        // console.log("here");
        extraWidth.left = Math.tan(wall.bevel.miters.angle.left*Math.PI/180) * wall.bevel.y;
        extraWidth.right = Math.tan(wall.bevel.miters.angle.right*Math.PI/180) * wall.bevel.y;
        // var points = [[wall.size.w,0,0],[wall.size.w+right,wall.size.h,wall.bevel.y],[left,wall.size.h,wall.bevel.y]];
      } else if (wall.bevel.miters.hasOwnProperty("in")) {
        extraWidth.left = wall.bevel.miters.in.left;
        extraWidth.right = wall.bevel.miters.in.right;
        // var points = [[wall.size.w,0,0],[wall.size.w+wall.bevel.miters.in.right,wall.size.h,wall.bevel.y],[wall.bevel.miters.in.left,wall.size.h,wall.bevel.y]];
      } else if (wall.bevel.miters.hasOwnProperty("out")) {
        extraWidth.left = -wall.bevel.miters.out.left;
        extraWidth.right = -wall.bevel.miters.out.right;
      } else {
        throw new Error("Bad bevel spec");
      }
    }
    // console.log(extraWidth);
    return extraWidth;
  }

  this.bevelWallNew = function(wall) {
    this.beveledHeight(wall);
    var extraWidth = this.bevelWidth(wall);

    var rotate = [wall.rotation.x, wall.rotation.y, wall.rotation.z];
    var offset = [wall.offset.x, wall.offset.y, wall.offset.z];
    // var points = [[wall.size.w,0,0],[wall.size.w,wall.size.h,0],[0,wall.size.h,0]];
    if (wall.bevel.miters.hasOwnProperty("angle")) {
      var left = Math.tan(wall.bevel.miters.angle.left*Math.PI/180) * wall.bevel.y;
      var right = Math.tan(wall.bevel.miters.angle.right*Math.PI/180) * wall.bevel.y;
      // console.log(left);
      // console.log(right);
      // var points = [[wall.size.w,0,0],[wall.size.w+right,wall.size.h,wall.bevel.y],[left,wall.size.h,wall.bevel.y]];
      var points = [[wall.size.w,0,0],[wall.size.w+right,wall.size.xy,wall.bevel.y],[left,wall.size.xy,wall.bevel.y]];
    } else if (wall.bevel.miters.hasOwnProperty("in")) {
      // var points = [[wall.size.w,0,0],[wall.size.w+wall.bevel.miters.in.right,wall.size.h,wall.bevel.y],[wall.bevel.miters.in.left,wall.size.h,wall.bevel.y]];
      var points = [[wall.size.w,0,0],[wall.size.w+wall.bevel.miters.in.right,wall.size.xy,wall.bevel.y],[wall.bevel.miters.in.left,wall.size.xy,wall.bevel.y]];
    } else {
      // shaper0.bevelWall([[1000,0,-50],[950,50,-50],[50,50,0]],[ -50, 50, 550], [ 0, 0, 0], colors.cornice);
      var len = wall.size.w + wall.bevel.miters.out.right - wall.bevel.miters.out.left;
      // var points = [[len,0,0],[len-wall.bevel.miters.out.right,wall.size.h,wall.bevel.y],[-wall.bevel.miters.out.left,wall.size.h,wall.bevel.y]];
      var points = [[len,0,0],[len-wall.bevel.miters.out.right,wall.size.xy,wall.bevel.y],[-wall.bevel.miters.out.left,wall.size.xy,wall.bevel.y]];
      offset = ArraySum(offset, [wall.bevel.miters.out.left, wall.bevel.y, 0]);
      rotate = ArraySum(rotate, [-90,0,0]);
    }
    // console.log(points);
    // console.log(points2);
    // console.log(offset);
    // console.log(rotate);
    // console.log(wall.color);
    // console.log(wall.mirror);
    // console.log(wall);
    return this.bevelWall(points, offset, rotate, wall.color, wall.mirror);
  };

  this.xbeveledHeight = function(wall) {
    var radians = Math.atan(wall.bevel.y/wall.size.h);
    // radians = Math.PI/4;
    var angle = 180*radians/Math.PI;
    console.log(angle);
    console.log(wall.size.h);
    console.log(Math.sqrt(Math.pow(wall.size.h,2)+Math.pow(wall.bevel.y,2)));
    // console.log(wall.bevel.y/Math.sin(radians));
    // console.log(wall.bevel.y/Math.tan(radians));
    // wall.size.h = Math.sqrt(Math.pow(wall.size.h,2)+Math.pow(wall.bevel.y,2));
    wall.size.h = Math.sqrt(Math.pow(wall.size.h,2)+Math.pow(wall.bevel.y,2));
    wall.size.xy = wall.bevel.y/Math.sin(radians);
    if (this.planeTransforms.YisX) {
      wall.rotation.y += angle;
    } else {
      wall.rotation.x += angle;
    }
  }
  this.beveledHeight = function(wall) {
    var angle = 90;
    wall.size.xy = wall.bevel.y;
    if (wall.size.h != 0) {
      var radians = Math.atan(wall.bevel.y/wall.size.h);
      // radians = Math.PI/4;
      var angle = 180*radians/Math.PI;
      // console.log(angle);
      // console.log(wall.size.h);
      // console.log(Math.sqrt(Math.pow(wall.size.h,2)+Math.pow(wall.bevel.y,2)));
      // console.log(wall.bevel.y/Math.sin(radians));
      // console.log(wall.bevel.y/Math.tan(radians));
      // wall.size.h = Math.sqrt(Math.pow(wall.size.h,2)+Math.pow(wall.bevel.y,2));
      // wall.size.h = wall.bevel.y/Math.sin(radians);
      wall.size.xy = wall.bevel.y/Math.sin(radians);
    }
    if (this.planeTransforms.YisX) {
      wall.rotation.y += angle;
    } else {
      wall.rotation.x += angle;
    }
    // console.log(angle);
    // console.log(wall.size.xy);
  }

  function ArraySum(a,b) {
    return b.map( (val, i) => val + a[i] );
  }

  // var in =  [[w,    0,0],[w+r, h, y],[ l, h, y]];
  // var out = [[w+r-l,0,0],[w-l, h, y],[-l, h, y]];

}

export {shaper};
