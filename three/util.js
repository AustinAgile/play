import * as _3js from '../../three/build/three.module.js';

function util() {

  this.constructor = function() {
  }

  function deg(angle) {
    return angle*180/Math.PI;
  }

  this.extraLength = function(bevel, angle) {
    // console.log("angle="+deg(angle));
    // console.log("angle2="+(90-deg(angle)));
    // console.log("angle3="+(90-deg(angle)-45));
    var angle4 = -(90-angle-45-45);
    // console.log("angle4="+deg(angle4));
    var angle5 = angle4/2;
    // console.log("angle5="+deg(angle5));
    var sin5 = Math.sin(angle5);
    // console.log("sin5="+(sin5));
    var hyp = Math.sqrt(Math.pow(bevel[0], 2)+Math.pow(bevel[1],2));
    // console.log("hyp="+hyp);
    var len5 = sin5*hyp;
    // console.log("len5="+len5);

    var ang6 = angle+Math.PI/2;
    var ang7 = ang6/2;
    // console.log("angle7="+deg(ang7));
    var sin7 = Math.sin(ang7);
    // console.log("sin7="+sin7);
    var hyp7 = len5/sin7;
    // console.log("hyp7="+hyp7);
    return -hyp7;

    var vec = new _3js.Vector3(bevel[0],bevel[1],bevel[2]);
    console.log(vec.getComponent(0));
    console.log(vec.getComponent(1));
    console.log(vec.getComponent(2));
    var axis = new _3js.Vector3(0,0,1);
    vec.applyAxisAngle( axis, angle );
    // console.log(vec.getComponent(0));
    // console.log(vec.getComponent(1));
    // console.log(vec.getComponent(2));
    var dist = Math.sqrt(Math.pow(50 - vec.getComponent(0), 2)+Math.pow(50-vec.getComponent(1),2))/2;
    // console.log("dist="+dist);
    var a2 = Math.PI/4 - angle/2
    // a2=20*Math.PI/180;
    // console.log("a1="+angle*180/Math.PI);
    // console.log("a2="+a2*180/Math.PI);
    var a2sin = Math.sin(a2);
    // console.log(a2sin);
    var extraLen = dist/a2sin;
    // console.log("new len = "+extraLen);
    // console.log("old len = "+xtraLen);
    return extraLen;
  };
}

export {util};
