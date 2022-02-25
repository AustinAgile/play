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
    return

    this.camera.position.set(750, 500+ 1*this.radious, 450);
    // this.camera.position.set(80+536/2, 70+510/2, 282+342/2);//In living room
    var target = new _3js.Vector3();
    console.log(this.camera.getWorldPosition(target));
    console.log(this.camera.getWorldQuaternion(new _3js.Quaternion()));
    console.log(this.camera.getWorldScale(new _3js.Vector3()));
    console.log(this.camera.getWorldDirection(new _3js.Vector3()));
    console.log(this.camera.worldToLocal(new _3js.Vector3(0,0,1)));
    // console.log(this.camera.localToWorld(new _3js.Vector3(0,1,0)));
    // console.log(target);
    // console.log(this.camera.position);
    // console.log(this.camera.position.clone().normalize());
    // var lookAt = new _3js.Vector3().addVectors(this.camera.position, this.camera.position.clone().normalize());
    var lookAt = new _3js.Vector3().addVectors(this.camera.position, new _3js.Vector3(0,1,0));
    this.camera.rotateX(90*Math.PI/180);
    this.camera.updateMatrixWorld();
    this.camera.lookAt(lookAt);
    // this.camera.rotateZ(30*Math.PI/180);
    // this.camera.translateX(500);
    // this.camera.translateY(500);
    // this.camera.translateZ(500);

    // this.camera.position.x = 750 ;
    // this.camera.position.y = 500+ 1.5*this.radious ;
    // this.camera.position.z = 450;
    // this.camera.lookAt(750, 501+ 1.5*this.radious, 450);

    // this.camera.lookAt(
    //   750 + this.radious * Math.sin( this.theta * Math.PI / 180 ) * Math.cos( this.phi * Math.PI / 180 ),
    //   450 + this.radious * Math.sin( this.phi * Math.PI / 180 ),
    //   500 + this.radious * Math.cos( this.theta * Math.PI / 180 ) * Math.cos( this.phi * Math.PI / 180 )
    // );
  }

}

export {Control};
