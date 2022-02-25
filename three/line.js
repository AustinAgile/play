import * as _3js from '../../three/build/three.module.js';

function line(points, color) {
  const material = new _3js.LineBasicMaterial( { color: color } );
  var vec = [];
  vec.push( new _3js.Vector3(points[0][0],points[0][1],points[0][2]) );
  vec.push( new _3js.Vector3(points[1][0],points[1][1],points[1][2]) );
  var geometry = new _3js.BufferGeometry().setFromPoints( vec );
  return new _3js.Line( geometry, material )
}

export {line};
