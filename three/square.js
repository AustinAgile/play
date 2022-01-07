import * as _3js from '../../three/build/three.module.js';
function main() {
  const geometry = new _3js.BufferGeometry();

  function face(points, a,b,c,d) {
    return points.concat(a,b,c,c,d,a);
  }
  var points = [];
  points = face(points, [  0, 0,   0], [1500, 0,   0], [1500, 0,1033], [  0, 0,1033]);
  points = face(points, [ -5, 0,1033], [1505, 0,1033], [1505, -15,1033], [ -5, -15,1033]);
  points = face(points, [ -5, -15,1033], [1505, -15,1033], [1505, -15,1063], [ -5, -15,1063]);
  points = face(points, [-10, -15,1063], [1510, -15,1063], [1510,-30,1063], [-10,-30,1063]);
  points = face(points, [-10,-30,1063], [1510,-30,1063], [1510,-30,1093], [-10,-30,1093]);
  console.log(points);
  const vertices = new Float32Array(points);
  console.log(vertices);

  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.setAttribute( 'position', new _3js.BufferAttribute( vertices, 3 ) );
  geometry.computeVertexNormals();
  const material = new _3js.MeshLambertMaterial({
    color: 0xfcd690,
    // color: 0xffffff,
    opacity: 0.4,
    // transparent: true,
    side: _3js.DoubleSide,
  });
  const mesh = new _3js.Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function tetra() {
  const geometry = new _3js.BufferGeometry();
  const material = new _3js.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.4,
    transparent: true,
    side: _3js.DoubleSide,
  });

  const points = [];
  points.push(new _3js.Vector3(1, 1, 1));//a
  points.push(new _3js.Vector3(-1, -1, 1));//b
  points.push(new _3js.Vector3(-1, 1, -1));//c

  points.push(new _3js.Vector3(1, 1, 1));//a
  points.push(new _3js.Vector3(-1, 1, -1));//c
  points.push(new _3js.Vector3(1, -1, -1));//d

  points.push(new _3js.Vector3(1, 1, 1));//a
  points.push(new _3js.Vector3(-1, -1, 1));//b
  points.push(new _3js.Vector3(1, -1, -1));//d

  points.push(new _3js.Vector3(-1, -1, 1));//b
  points.push(new _3js.Vector3(-1, 1, -1));//c
  points.push(new _3js.Vector3(1, -1, -1));//d

  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.setFromPoints(points);
  // geometry.computeVertexNormals();
  const mesh = new _3js.Mesh( geometry, material );
  return mesh;
}

export {main, tetra};
