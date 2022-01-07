import * as _3js from '../../three/build/three.module.js';
function main() {
  const length = 2, width = 2;

  const shape = new _3js.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, width );
  shape.lineTo( length, width );
  shape.lineTo( length, 0 );
  shape.lineTo( 0, 0 );

  const extrudeSettings = {
  	steps: 1,
  	depth: 2,
  	bevelEnabled: false,
  	// bevelThickness: 1,
  	// bevelSize: 1,
  	// bevelOffset: 0,
  	// bevelSegments: 1
  };

  const geometry = new _3js.ExtrudeGeometry( shape, extrudeSettings );
  const material = new _3js.MeshBasicMaterial({
    color: 0x00ff00,
    opacity: 0.4,
    transparent: true,
    side: _3js.DoubleSide,
  });
  const wf = new _3js.WireframeGeometry(geometry);
  const line = new _3js.LineSegments(wf);
  line.material.depthTest = false;
  // line.material.opacity = 0.25;
  // line.material.transparent = true;
  return line;

  const mesh = new _3js.Mesh( geometry, material ) ;
  return mesh;
}

export {main};
