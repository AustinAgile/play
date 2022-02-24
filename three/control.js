import * as _3js from '../../three/build/three.module.js';

class Control {
  camera;
  composer;
  theta = 0;
  phi = 0;
  onMouseDownTheta = 0;
  onMouseDownPhi = 0;
  onMouseDownPosition = {x: 0, y: 0};
  radious = -2000;

  constructor (camera, composer) {
    this.onMouseMove = function(event) {
      this.theta =  ( ( event.clientX - this.onMouseDownPosition.x ) * 0.5 ) + this.onMouseDownTheta;
      this.phi = -( ( event.clientY - this.onMouseDownPosition.y ) * 0.5 ) + this.onMouseDownPhi;
      // console.log("theta="+theta+", phi="+phi);
      this.positionCamera();
      this.composer.render();
    }.bind(this);

    this.onMouseDown = function(event) {
      this.onMouseDownTheta = this.theta;
      this.onMouseDownPhi = this.phi;
      this.onMouseDownPosition.x = event.clientX;
      this.onMouseDownPosition.y = event.clientY;
      // console.log("mouse down at x="+onMouseDownPosition.x+", y="+onMouseDownPosition.y);
      window.addEventListener( 'mousemove', this.onMouseMove, false );
    }.bind(this);

    this.onMouseUp = function(event) {
      // console.log("mouse up");
      window.removeEventListener( 'mousemove', this.onMouseMove, false );
    }.bind(this);

    this.onMouseWheel = function(event) {
      this.radious += event.wheelDeltaY/10;
      this.positionCamera();
      this.composer.render();
    }.bind(this);

    this.camera = camera;
    this.composer = composer;
    // this.onMouseDownPosition = {x: null, y: null};
    window.addEventListener( 'mousedown', this.onMouseDown, false );
    window.addEventListener( 'mouseup', this.onMouseUp, false );
    window.addEventListener( 'mousewheel', this.onMouseWheel, false );
  }

  positionCamera() {
    this.camera.position.x = 750 + this.radious * Math.sin( this.theta * Math.PI / 180 ) * Math.cos( this.phi * Math.PI / 180 );
    this.camera.position.z = 450 + this.radious * Math.sin( this.phi * Math.PI / 180 );
    this.camera.position.y = 500 + this.radious * Math.cos( this.theta * Math.PI / 180 ) * Math.cos( this.phi * Math.PI / 180 );
    this.camera.lookAt(750, 450, 500);
  }

}

export {Control};
