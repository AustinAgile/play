import * as _3js from '../../three/build/three.module.js';
import * as doug from "./test.js";

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
    if (direction[1] == -1) {//Face -Y
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,0],
        geoAngle: angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    } else if (direction[0] == -1) {//Face -X
      this.planeTransforms = {
        geoRotate: [0,-Math.PI/2,0],
        geoAngle: angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    } else if (direction[1] == 1) {//Face Y
      this.planeTransforms = {
        geoRotate: [Math.PI/2,0,0],
        geoAngle: angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    } else if (direction[0] == 1) {//Face X
      this.planeTransforms = {
        geoRotate: [0,-Math.PI/2,0],
        geoAngle: angle,
        geoTranslate: translate,
        shapeOriginTranslate: [1,1,1],
        shapeRotateTranslate: [1,1,1],
        YisX: false
      };
    // } else if (direction[1] == -1) {//front
    //   this.planeTransforms = {
    //     geoRotate: [Math.PI/2,0,0],
    //     geoAngle: -angle,
    //     geoTranslate: translate,
    //     shapeOriginTranslate: [1,-1,1],
    //     shapeRotateTranslate: [1,1,1],
    //     YisX: false
    //   };
    // } else if (direction[1] == 1) {//back
    //   this.planeTransforms = {
    //     geoRotate: [-Math.PI/2,Math.PI,0],
    //     geoAngle: -angle,
    //     geoTranslate: translate,
    //     shapeOriginTranslate: [-1,1,1],
    //     shapeRotateTranslate: [-1,1,1],
    //     YisX: false
    //   };
    // } else if (direction[0] == -1) {//left
    //   this.planeTransforms = {
    //     geoRotate: [Math.PI/2,0,-Math.PI/2],
    //     geoAngle: angle,
    //     geoTranslate: translate,
    //     // shapeOriginTranslate: [1,-1,1],
    //     shapeOriginTranslate: [-1,-1,1],
    //     shapeRotateTranslate: [1,-1,1],
    //     YisX: true
    //   };
    // } else if (direction[0] == 1) {//right
    //   this.planeTransforms = {
    //     geoRotate: [Math.PI/2,0,Math.PI/2],
    //     geoAngle: -angle,
    //     geoTranslate: translate,
    //     shapeOriginTranslate: [1,1,1],
    //     shapeRotateTranslate: [1,1,1],
    //     YisX: true
    //   };
    // } else if (direction[2] == 1) {//up
    //   this.planeTransforms = {
    //     geoRotate: [0,0,0],
    //     geoAngle: -angle,
    //     geoTranslate: translate,
    //     shapeOriginTranslate: [1,-1,1],
    //     shapeRotateTranslate: [1,1,1],
    //     YisX: false
    //   };
    }
  }

  this.bevelWall = function(points, origin, rotate, color, mirror) {
    var geoRotate = this.planeTransforms.geoRotate;
    var geoTranslate = this.planeTransforms.geoTranslate;
    if (points.length == 3) {
      points = _.concat([[0,0]], points);
      // console.log(fuck);
      // throw new Error("fuck");
    } else {
      console.log(points);
    }
    this.main3(geoRotate, geoTranslate, points, origin, rotate, color, mirror);
  };

  // this.frontWall = function(points, origin, rotate, color) {
  //   var geoRotate = [Math.PI/2,0,0];
  //   var geoTranslate = [0, 0, 0];
  //   return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  // }
  // this.backWall = function(points, origin, rotate, color) {
  //   var geoRotate = [-Math.PI/2,Math.PI,0];
  //   // var geoTranslate = [points[0][0], 0, 0];
  //   var geoTranslate = [0, 0, 0];
  //   origin[1] = -origin[1];
  //   return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  // }
  // this.leftWall = function(points, origin, rotate, color) {
  //   var geoRotate = [Math.PI/2,0,-Math.PI/2];
  //   var geoTranslate = [0, points[0][0], 0];
  //   return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  // }
  // this.rightWall = function(points, origin, rotate, color) {
  //   var geoRotate = [Math.PI/2,0,Math.PI/2];
  //   var geoTranslate = [0, 0, 0];
  //   return this.main3(geoRotate, geoTranslate, points, origin, rotate, color);
  // }

  this.test = function() {
    // var a = new _3js.Vector3(500,-560,166.25);
    // var b = new _3js.Vector3(1530,-280,166.25);
    // var c = new _3js.Vector3(1505.73,0,0);
    var a = new _3js.Vector3(0,-100,0);
    var b = new _3js.Vector3(100,0,100);
    var c = new _3js.Vector3(100,0,0);
    var plane = new _3js.Plane().setFromCoplanarPoints(a,b,c);
    console.log(plane);
    // var q = new _3js.Quaternion().set(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant );
    var q = new _3js.Quaternion().set(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant );
    console.log(q.length());
    var anglea = plane.normal.angleTo(new _3js.Vector3(1,0,0));
    var angleb = plane.normal.angleTo(new _3js.Vector3(0,1,0));
    var anglec = plane.normal.angleTo(new _3js.Vector3(0,0,1));
    console.log(anglea*180/Math.PI);
    console.log(angleb*180/Math.PI);
    console.log(anglec*180/Math.PI);
    var pos = new _3js.Vector3(0,0,0);
    var scale = new _3js.Vector3(1,1,1);
    var m = new _3js.Matrix4().compose(pos, q, scale);
    var m2 = new _3js.Matrix4().extractRotation(m);
    var q2 = new _3js.Quaternion().setFromRotationMatrix(m2);
    var m = new _3js.Matrix4().makeRotationFromQuaternion(q);
    var q2 = new _3js.Quaternion().setFromRotationMatrix(m2);
    console.log(q);
    console.log(q2);

    var shape = new _3js.Shape();
    shape.moveTo(0,0);
    shape.lineTo(1500,0);
    shape.lineTo(1550,-100);
    shape.lineTo(0,-450);

    var shapeGeometry = new _3js.ShapeGeometry( shape );
    // shapeGeometry.rotateX(17.4*Math.PI/180);
    // shapeGeometry.rotateY(72.6*Math.PI/180);
    // shapeGeometry.rotateZ(90.5*Math.PI/180);
    shapeGeometry.lookAt(plane.normal);

    // shapeGeometry.rotateZ(-Math.PI/2);
    // shapeGeometry.applyQuaternion(q);
    shapeGeometry.translate(0, 900, 1100);
    // scale = 1/q.length();
    // shapeGeometry.scale(scale,scale,scale);
    // console.log(shapeGeometry.vertices);

    var planeMat = new _3js.MeshStandardMaterial({
      color: 0xff00ff,
      opacity: 1.0,
      transparent: false,
      format: _3js.RGBAFormat,
      side: _3js.DoubleSide,
    });

    var mesh = new _3js.Mesh(shapeGeometry, planeMat);
    this.scene.add(mesh);

    // var shapeGeometry2 = new _3js.ShapeGeometry( shape );
    // shapeGeometry.rotateZ(-Math.PI/2);
    // shapeGeometry.translate(0, 900, 0);

    // this.scene.add(new _3js.Mesh(shapeGeometry2, planeMat));
    return plane;
  }

  this.main3 = function(geoRotate, geoTranslate, points, origin, rotate, color, mirror) {
    // console.log("main");
    // console.log(origin);
    // console.log(points);
    // console.log(this.holes);

    var shape = new _3js.Shape();
    // shape.moveTo(0,0);
    // shape.lineTo(points[0][0],points[0][1]);
    // shape.lineTo(points[1][0],points[1][1]);
    // shape.lineTo(points[2][0],points[2][1]);
    shape.moveTo(points[0][0],points[0][1]);
    shape.lineTo(points[1][0],points[1][1]);
    shape.lineTo(points[2][0],points[2][1]);
    shape.lineTo(points[3][0],points[3][1]);
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

    var planeMat = new _3js.MeshStandardMaterial({
      color: color.f.color,
      opacity: color.f.opacity,
      // opacity: 0.1,
      transparent: (color.f.opacity != 1),
      // transparent: false,
      format: _3js.RGBAFormat,
      // blending: _3js.AdditiveBlending,
      // blending: _3js.SubtractiveBlending,
      blending: (color.f.opacity == 1 ? _3js.NormalBlending : _3js.MultiplyBlending),
      depthFunc: (color.f.opacity == 1 ? _3js.LessDepth : _3js.LessDepth),
      side: (mirror ?_3js.BackSide : _3js.FrontSide),
      // side: _3js.DoubleSide,
    });
    var planeMatBack = new _3js.MeshStandardMaterial({
      color: color.b.color,
      // color: color.f.color,
      opacity: color.b.opacity,
      // opacity: 0.1,
      transparent: (color.b.opacity != 1),
      // transparent: false,
      format: _3js.RGBAFormat,
      // blending: _3js.AdditiveBlending,
      // blending: _3js.SubtractiveBlending,
      blending: (color.f.opacity == 1 ? _3js.NormalBlending : _3js.MultiplyBlending),
      depthFunc: (color.f.opacity == 1 ? _3js.LessDepth : _3js.LessDepth),
      side: (mirror ? _3js.FrontSide : _3js.BackSide)
    });
    // console.log(planeMat);
    // console.log(planeMatBack);
    // if (color.f.hasOwnProperty("blending")) {
    //   planeMat.blending = color.f.blending;
    // }
    // if (color.b.hasOwnProperty("blending")) {
    //   planeMatBack.blending = color.b.blending;
    // }
    // if (globalOpacity !== false) {
    //   console.log("global opacity");
    //   planeMat.opacity = .5;
    //   planeMatBack.opacity = .5;
    //   planeMat.blending = _3js.SubtractiveBlending;
    //   planeMatBack.blending = _3js.SubtractiveBlending;
    //   console.log(planeMat);
    // }

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

  this.addHole = function(origin, size) {
    // console.log("hole");
    // console.log(origin);
    // console.log(size);
    var hole = new _3js.Shape();
    hole.moveTo( origin[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1] );
    hole.lineTo( origin[0]+size[0], origin[1]+size[1] );
    hole.lineTo( origin[0], origin[1]+size[1] );
    // hole.lineTo( origin[0], origin[1] );
    this.holes.push(hole);
  };

  this.window = function(points, size, depth, color) {
    this.bevelWall([[depth,0,0],[depth, size[1],0],[0,size[1],0]],[ points[0], 0, points[1]], [ 0, 0, 90], color);
    this.bevelWall([[size[0],0,0],[size[0],depth,0],[0,depth,0]],[ points[0], 0, points[1]], [ -90, 0, 0], color);
    this.bevelWall([[depth,0,0],[depth,size[1],0],[0,size[1],0]],[ points[0]+size[0], -depth, points[1]], [ 0, 0, -90], color);
    this.bevelWall([[size[0],0,0],[size[0],depth,0],[0,depth,0]],[ points[0], -depth, points[1]+size[1]], [ 90, 0, 0], color);
  }


  // var globalOpacity = false;
  this.wallSystem = function(wallSystem) {
    if (!wallSystem.visible) {return;}
    // if (wallSystem.hasOwnProperty("opacity")) {globalOpacity = wallSystem.opacity;}
    Object.entries(wallSystem.surfaces).forEach(function(entry) {//Exterior walls
      var wall = entry[1];
      // console.log("wallSystem");
      // console.log(wall);
      this.setPlane(wall.plane.facingDirection, wall.plane.originOffset, wall.plane.rotationZ);

      this.wallRelativeSize(wallSystem.surfaces, wall);

      if (wall.hasOwnProperty("windows")) {
        wall.windows.names.forEach(function(windowName) {//The interior holes for windows
          this.addWindowHole(windowName, wall);//The hole
        }.bind(this));
        wall.windows.jambs.forEach(function(windowName) {//The interior holes and jambs for windows
          this.addWindowJamb(windowName, wall);//The jamb
        }.bind(this));
      }

      if (wall.hasOwnProperty("bevel")) {
        this.bevelWallNew(wall);//The interior wall surface
      } else {
        this.planeWall(wall);//The exterior wall surface
      }
    }.bind(this));
    // globalOpacity = false;
  }.bind(this);

  this.distanceBetweenPointsInSpace = function(a, b) {
    return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2), 0.5);
  };

  this.addWindowJamb = function(windowName, toWall) {
    var fromWall = toWall.windows.wall;
    var window = this.windowRelativeOffset(fromWall.parent.windows, windowName);

    if (toWall.plane.isFacingEastWest()) {//Facing in the Y direction
      // console.log("window.offset.x="+window.offset.x);
      // console.log("actual window.offset.x="+fromWall.plane.getHorizontal(window.offset.x));
      var offset = {
        // horizontal: toWall.plane.getHorizontal2(fromWall.plane.getHorizontal(window.offset.x) - (toWall.plane.originOffset[0] - fromWall.plane.originOffset[0])),
        horizontal: toWall.plane.getProjectionHorizontalFrom(window.offset.x, fromWall.plane),
        // vertical: window.offset.z - (toWall.plane.originOffset[2] - fromWall.plane.originOffset[2])old way
        vertical: window.offset.z + fromWall.offset.z +  fromWall.plane.originOffset[2] - (toWall.offset.z + toWall.plane.originOffset[2])
      };
      var depth = this.distanceBetweenPointsInSpace(toWall.plane.getPointInSpace(offset.horizontal), fromWall.plane.getPointInSpace(window.offset.x));
      var rotation = {horizontal: {horizontal: -90, vertical: 0}, vertical: {horizontal: 0, vertical: -90}};
      if (toWall.plane.isFacingWest()) {
        rotation.horizontal.horizontal =  -rotation.horizontal.horizontal;
        rotation.vertical.vertical =  -rotation.vertical.vertical;
        // depth = -depth;
      }
    } else {//Facing North-South
      var offset = {
        horizontal: window.offset.y - (toWall.plane.originOffset[1] - fromWall.plane.originOffset[1]),
        // vertical: window.offset.z - (toWall.plane.originOffset[2] - fromWall.plane.originOffset[2])old way
        vertical: window.offset.z + fromWall.offset.z +  fromWall.plane.originOffset[2] - (toWall.offset.z + toWall.plane.originOffset[2])
      };
      // console.log("toWall.offset.x="+toWall.offset.x);
      // console.log("toWall.plane.originOffset[0]="+toWall.plane.originOffset[0]);
      // console.log("fromWall.plane.originOffset[0]="+fromWall.plane.originOffset[0]);
      // var size = {horizontal: window.size.w, vertical: Math.min(window.size.h, toWall.size.h - offset.vertical};
      // var depth = -toWall.offset.x - (toWall.plane.originOffset[0]  - fromWall.plane.originOffset[0]);
      var depth = toWall.offset.x + (toWall.plane.originOffset[0]  - fromWall.plane.originOffset[0]);
      // console.log("depth="+depth);
      // var rotation = {horizontal: {horizontal: 90, vertical: 0}, vertical: {horizontal: 0, vertical: -90}};
      var rotation = {horizontal: {horizontal:90, vertical: 0}, vertical: {horizontal: 0, vertical: 90}};
      if (toWall.plane.isFacingNorth()) {
        rotation.horizontal.horizontal =  -rotation.horizontal.horizontal;
        rotation.vertical.vertical =  -rotation.vertical.vertical;
        depth = -depth;
      }
    }
    var size = {horizontal: window.size.w, vertical: window.size.h};

    var jambs = {left: true, right: true, top: true, bottom: true};
    if (size.vertical > toWall.size.h - offset.vertical) {
      size.vertical = toWall.size.h - offset.vertical;
      jambs.top = false;
    }
    if (offset.vertical < toWall.offset.z) {
      offset.vertical = toWall.offset.z;
      jambs.bottom = false;
    }

    offset.horizontal += 0;
    // depth = 75;//Depth is negative, should be positive for X diresction
    // size.vertical = 30;
    // console.log("test");
    // console.log(rotation.vertical);
    // console.log(_.update(rotation.vertical, "vertical", function(v) {return -v;}));
    // console.log(_.mapValues(rotation.vertical, function(v) {return -v;}));

    new doug.Surface("left").setPlane(toWall.plane)
      .setSize({w: depth, h: size.vertical})
      .setOffset(offset)
      .setRotation(rotation.vertical)
      .setMaterial(toWall.color)
      .setMirror(toWall.mirror)
      .call(this.planeWall)
    ;
    if (jambs.bottom) {
      new doug.Surface("bottom").setPlane(toWall.plane)
        .setSize({w: size.horizontal, h: -depth})
        .setOffset(offset)
        .setRotation(rotation.horizontal)
        .setMaterial(toWall.color)
        .call(this.planeWall)
      ;
    }
    new doug.Surface("right").setPlane(toWall.plane)
      .setSize({w: -depth, h: size.vertical})
      .setOffset({
        horizontal: offset.horizontal + window.size.w,
        vertical: offset.vertical
      })
      // .setRotation({horizontal: rotation.vertical.horizontal, vertical: -rotation.vertical.vertical})
      .setRotation(_.update(rotation.vertical, "vertical", function(v) {return -v;}))
      .setMaterial(toWall.color)
      .flip()
      .call(this.planeWall)
    ;
    if (jambs.top) {
      new doug.Surface("top").setPlane(toWall.plane)
        // .setSize({w: size.horizontal, h: depth})
        .setSize({w: size.horizontal, h: -depth})
        .setOffset({
          horizontal: offset.horizontal,
          vertical: offset.vertical + window.size.h
        })
        .setRotation(rotation.horizontal)
        .setMaterial(toWall.color)
        .flip()
        .call(this.planeWall)
      ;
    }
  };

  this.windowRelativeOffset = function(windows, windowName) {
    var window = windows[windowName];
    if (window.offset.hasOwnProperty("window")) {
      var relativeWindow = windows[window.offset.window];
      if (window.offset.hasOwnProperty("dx") && !relativeWindow.offset.hasOwnProperty("x")) {
        this.windowRelativeOffset(windows, window.offset.window);
      }
      window.offset.x = window.offset.dx + relativeWindow.offset.x + relativeWindow.size.w;
    }
    return window;
  }

  this.wallRelativeSize = function(walls, wall) {
    // return;
    if (wall.hasOwnProperty("on")) {
      // console.log("on");
      // console.log(wall.size);
      // var relativeWall = walls[wall.on];
      var relativeWall = wall.on;
      // console.log("relative wall "+relativeWall.name);
      // console.log(relativeWall);
      // console.log(wall);
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
        // if (relativeWall.hasOwnProperty("bevel")) {wall.offset.y += relativeWall.bevel.y;}
        if (relativeWall.hasOwnProperty("bevel")) {
          if (wall.plane.isFacingEast()) {
            wall.offset.y -= relativeWall.bevel.y;
          } else if (wall.plane.isFacingSouth()) {
            wall.offset.y -= relativeWall.bevel.y;
          } else if (wall.plane.isFacingWest()) {
            wall.offset.y += relativeWall.bevel.y;
          } else if (wall.plane.isFacingNorth()) {
            wall.offset.y += relativeWall.bevel.y;
          }
        }
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

  this.addWindowHole = function(windowName, toWall) {
    var fromWall = toWall.windows.wall;
    var window = this.windowRelativeOffset(fromWall.parent.windows, windowName);

    if (toWall.plane.isFacingNorthSouth()) {//Wall faces the y direction
      var offset = [
        Math.max(window.offset.z + fromWall.offset.z +  fromWall.plane.originOffset[2] - (toWall.offset.z + toWall.plane.originOffset[2]), toWall.offset.z),
        window.offset.y + fromWall.offset.y +  fromWall.plane.originOffset[1] - (toWall.offset.y + toWall.plane.originOffset[1]),
      ];
      var size = [
        window.size.h,
        window.size.w
      ];
    } else {//Wall faces the Y direction
      var offset = [
        toWall.plane.getProjectionHorizontalFrom(window.offset.x, fromWall.plane),
        window.offset.z + fromWall.offset.z +  fromWall.plane.originOffset[2] - (toWall.offset.z + toWall.plane.originOffset[2])
      ];
      var size = [
        Math.min(window.size.w, toWall.size.w - offset[0]),
        Math.min(window.size.h, toWall.size.h - offset[1])
      ];
      if (offset[1] < 0) {
        size[1] += offset[1];
        offset[1] = 0;
      }
      // console.log(offset);
      // console.log(size);
    }
    // this.addHole(offset, size);
    toWall.addHole({size: size, offset: offset});
  };

  this.planeWall = function(wall) {
    var offset = [wall.offset.x, wall.offset.y, wall.offset.z];
    var rotation = [wall.rotation.x, wall.rotation.y, wall.rotation.z];

    if (wall.pointsInSpace.length == 4) {
      return this.bevelWall(wall.pointsInSpace, offset, rotation, wall.color, wall.mirror);
    }

    if (wall.plane.isFacingNorthSouth()) {//Wall faces the X direction
      var points = [[wall.size.h,0,0],[wall.size.h,wall.size.w,0],[0,wall.size.w,0]];
      if (wall.offset.hasOwnProperty("horizontal")) {offset = [0, wall.offset.horizontal, wall.offset.vertical];}
      if (wall.rotation.hasOwnProperty("horizontal")) {rotation = [0, wall.rotation.horizontal, wall.rotation.vertical];}
    } else {//Wall faces the Y direction
      var points = [[wall.size.w,0,0],[wall.size.w,wall.size.h,0],[0,wall.size.h,0]];
      if (wall.offset.hasOwnProperty("horizontal")) {offset = [wall.offset.horizontal, 0, wall.offset.vertical];}
      if (wall.rotation.hasOwnProperty("horizontal")) {rotation = [wall.rotation.horizontal, 0, wall.rotation.vertical];}
    }
    // console.log(points);
    // console.log(rotation);
    wall.holes.forEach(function(hole) {
      this.addHole(hole.offset, hole.size);
    }.bind(this));
    return this.bevelWall(points, offset, rotation, wall.color, wall.mirror);
  }.bind(this);

  this.bevelWidth = function(wall) {
    if (wall.hasOwnProperty("bevel")) {
      if (wall.bevel.hasOwnProperty("miters")) {
        if (wall.bevel.miters.hasOwnProperty("angle")) {
          return {
            left: Math.tan(wall.bevel.miters.angle.left*Math.PI/180) * wall.bevel.y,
            right: Math.tan(wall.bevel.miters.angle.right*Math.PI/180) * wall.bevel.y
          };
        } else if (wall.bevel.miters.hasOwnProperty("points")) {
          if (wall.bevel.miters.points.hasOwnProperty("middle")) {
            if (wall.bevel.miters.points.hasOwnProperty("right")) {
              return {
                right: -wall.bevel.miters.points.right,
                left: wall.size.w - (wall.bevel.miters.points.right + wall.bevel.miters.points.middle)
              };
            } else {
              return {
                left: wall.bevel.miters.points.left,
                right: -(wall.size.w - (wall.bevel.miters.points.left + wall.bevel.miters.points.middle))
              };
            }
          } else {
            return {
              left: wall.bevel.miters.points.left,
              right: -wall.bevel.miters.points.right
            };
          }
        } else {
          throw new Error("Bad bevel spec");
        }
      }
    }
    return {left: 0, right: 0};
  }

  this.bevelWallNew = function(wall) {
    // console.log("bevel "+wall.parent.name+" "+wall.name);
    // console.log(wall);
    this.beveledHeight(wall);
    var extraWidth = this.bevelWidth(wall);

    var points = [[wall.size.w,0,0],[wall.size.w+extraWidth.right,wall.size.xy,wall.bevel.y],[extraWidth.left,wall.size.xy,wall.bevel.y]];
    var rotate = [wall.rotation.x, wall.rotation.y, wall.rotation.z];
    var offset = [wall.offset.x, wall.offset.y, wall.offset.z];

    if (wall.plane.isFacingNorthSouth()) {
      points[0] = [points[0][1], points[0][0], points[0][2]];
      points[1] = [points[1][1], points[1][0], points[1][2]];
      points[2] = [points[2][1], points[2][0], points[2][2]];
    }
    wall.holes.forEach(function(hole) {
      this.addHole(hole.offset, hole.size);
    }.bind(this));
    return this.bevelWall(points, offset, rotate, wall.color, wall.mirror);
  };

  this.beveledHeight = function(wall) {
    var angle = 90;
    // var angle = 0;
    wall.size.xy = wall.bevel.y;
    // if (wall.size.h != 0) {
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
      if (wall.bevel.hasOwnProperty("points")) {
        console.log(wall.bevel);
        var plane = new _3js.Plane().setFromCoplanarPoints(new _3js.Vector3(5,15,4), new _3js.Vector3(55,10,4), new _3js.Vector3(50,0,0));//Effect
        console.log(plane);
//        New Three.Plane (). setfromcoplanarpoints (New Three.Vector3 (1, 2, 3), New Three.Vector3 (2, 2, 3), New Three.Vector3 (3, 2, 3)); // If three Will return to the default plane
      }
    // }
    // if (this.planeTransforms.YisX) {
    if (wall.plane.isFacingSouth()) {
      wall.rotation.y -= angle;
    } else if (wall.plane.isFacingEast()) {
      wall.rotation.x += angle;
    } else if (wall.plane.isFacingWest()) {
      wall.rotation.x -= angle;
    } else if (wall.plane.isFacingNorth()) {
      wall.rotation.x += angle;
    }
    // console.log(angle);
    // console.log(wall.size.xy);
  }

  function ArraySum(a,b) {
    return b.map( (val, i) => val + a[i] );
  }

}

export {shaper};
